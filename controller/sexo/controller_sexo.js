/**************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e 
 *              manipulação de dados para o CRUD de sexo
 * Data: 13/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 **************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const sexoDAO = require('../../model/DAO/sexo/sexo.js')

const inserirNovoSexo = async function (sexo, contentType) {

    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                                a sua estrutura local sem modificar a estrutura original*/

    try {
            //Validação para o tipo de dados da requisição (somente JSON)                                                        
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
                let validar = await validarDados(sexo)
            
                //Se a função validar retornar um JSON de erro, iremos devolver ao APP o erro
                if(validar) {
                    return validar //400
            
                } else {
                    let result = await sexoDAO.insertSexo(sexo) //Encaminha os dados do sexo para o DAO
            
                    if(result) { //201 (Created)
                        sexo.id                             = result //Coloca o atributo ID no JSON do filme após ele ser gerado no insert do BD
                        message.defaultMessage.status       = message.SUCCESS_CREATED_ITEM.status 
                        message.defaultMessage.status_code  = message.SUCCESS_CREATED_ITEM.status_code 
                        message.defaultMessage.message      = message.SUCCESS_CREATED_ITEM.message
                        message.defaultMessage.response     = sexo

                    } else { //500 (Internal Server Error na model)
                        return message.ERROR_INTERNAL_SERVER_MODEL
                    }
            
                    return message.defaultMessage
                }

            } else {
                return message.ERROR_CONTENT_TYPE //415 (Unsupported Media Type)
            }

        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Internal Server Error na controller)
        }
}


const atualizarSexo = async function (sexo, id, contentType) {

        let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                                a sua estrutura local sem modificar a estrutura original*/
    
        try {
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') { //Validação do contentType para receber apenas JSON
    
                let resultBuscarId = await buscarSexo(id) //Validação para o ID incorreto

                if(resultBuscarId.status) {
                    let validar = await validarDados(sexo)
                    if(!validar) { //Validação de campos obrigátorios para a atualização (body)
                        sexo.id = id //Adiciona o atributo ID do filme no JSON paara ser enviado ao DAO
    
                        let result = await sexoDAO.updateSexo(sexo) //Chama a função do DAO para atualizar o filme (dados e ID)
    
                        if(result) {
                            message.defaultMessage.status       = message.SUCCESS_UPDATE_ITEM.status
                            message.defaultMessage.status_code  = message.SUCCESS_UPDATE_ITEM.status_code
                            message.defaultMessage.message      = message.SUCCESS_UPDATE_ITEM.message
                            message.defaultMessage.response     = sexo
    
                            return message.defaultMessage //200 (OK, atualizado)
    
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500 (Internal Server Error na model)
                        }
    
                    } else {
                        return validar //400 (Bad Request)
                    }
    
                } else {
                    return resultBuscarId // 400 ou 404 ou 500
                }
    
            } else {
                return message.ERROR_CONTENT_TYPE //415 (Unsupported Media Type)
            }
    
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Internal Server Error na controller)
        }
}


const listarSexo = async function () {

    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                                a sua estrutura local sem modificar a estrutura original*/
    
        try {
            let result = await sexoDAO.selectAllSexo()
    
            if(result) { //Valida se o DAO conseguiu processar os dados
    
                if(result.length > 0) { //Validação para verificar se existe conteúdo no ARRAY
                    message.defaultMessage.status           = message.SUCCESS_RESPONSE.status 
                    message.defaultMessage.status_code      = message.SUCCESS_RESPONSE.status_code
                    message.defaultMessage.response.count   = result.length
                    message.defaultMessage.response.sexo   = result
    
                    return message.defaultMessage // 200 (OK)
                } else {
                    return message.ERROR_NOT_FOUND // 404 (Not Found)
                }
    
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL // 500 (Internal Server Error na model)
            }
    
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Internal Server Error na controller)
        }
}


const buscarSexo = async function (id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == undefined || id == '' || id == null || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400

        } else {
            let result = await sexoDAO.selectByIdSexo(id)

            if(result) {

                if(result.length > 0) {
                    message.defaultMessage.status           = message.SUCCESS_RESPONSE.status
                    message.defaultMessage.status_code      = message.SUCCESS_RESPONSE.status_code
                    message.defaultMessage.response.sexo   = result

                    return message.defaultMessage //200
                    
                } else {
                    return message.ERROR_NOT_FOUND //404
                }

            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const excluirSexo = async function (id) {

    let message = JSON.parse(JSON.stringify(config_message))
    
        try {
                let resultBuscarId = await buscarSexo(id) //Validação para o ID incorreto
    
                if(resultBuscarId.status) {
    
                        let result = await sexoDAO.deleteSexo(id) //Chama a função do DAO para deletar o filme (dados e ID)
    
                        if(result) {
                            message.defaultMessage.status       = message.SUCCESS_DELETED_ITEM.status
                            message.defaultMessage.status_code  = message.SUCCESS_DELETED_ITEM.status_code
                            message.defaultMessage.message      = message.SUCCESS_DELETED_ITEM.message
    
                            return message.defaultMessage //200, mas o status code 204 (No Content) também poderia ser usado
    
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL // 500 (Internal Server Error na model)
                        }
    
                } else {
                    return resultBuscarId //400 e 404
                }
            
        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Internal Server Error na controller)
        }
}


const validarDados = async function(sexo) {
    let message = JSON.parse(JSON.stringify(config_message)) 

    if(sexo.sigla == undefined || sexo.sigla == '' || sexo.sigla == null || sexo.sigla.length > 3) {
        message.ERROR_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
    }
}

module.exports = {
    inserirNovoSexo,
    atualizarSexo,
    listarSexo,
    buscarSexo,
    excluirSexo
}
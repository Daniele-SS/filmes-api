/**************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e 
 *              manipulação de dados para o CRUD de filmes
 * Data: 17/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 **************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js')

//Import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//Função para inserir um novo filme
const inserirNovoFilme = async function(filme, contentType) {

    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                            a sua estrutura local sem modificar a estrutura original*/

    try {                                            
            //Validação para o tipo de dados da requisição (somente JSON)                                                        
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
                let validar = await validarDados(filme)
            
                //Se a função validar retornar um JSON de erro, iremos devolver ao APP o erro
                if(validar) {
                    return validar //400
            
                } else {
                    let result = await filmeDAO.insertFilme(filme) //Encaminha os dados do filme para o DAO
            
                    if(result) { //201 (Created)
                        message.defaultMessage.status       = message.SUCCESS_CREATED_ITEM.status //Adiciona o status da requisição sucedida
                        message.defaultMessage.status_code  = message.SUCCESS_CREATED_ITEM.status_code //Adiciona o status_code (201) em caso de criação de atributo bem sucedida
                        message.defaultMessage.message      = message.SUCCESS_CREATED_ITEM.message //Adiciona a mensagem que será mostrada após a requisição ser finalizada
            
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


//Função para atualizar um filme
const atualizarFilme = async function(filme, id, contentType) {

    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                            a sua estrutura local sem modificar a estrutura original*/

    try {
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') { //Validação do contentType para receber apenas JSON

            let resultBuscarId = await buscarFilme(id) //Validação para o ID incorreto

            /**Se a função buscar encontrar o filme, o atributo do JSON será verdadeiro
             * e isso significa que o filme existe na base, mas caso não retorne true, 
             * então o retorno da função poderá ser um 400, 404 ou até mesmo um 500.
             */
            if(resultBuscarId.status) {
                let validar = await validarDados(filme)
                if(!validar) { //Validação de campos obrigátorios para a atualização (body)
                    filme.id = id //Adiciona o atributo ID do filme no JSON paara ser enviado ao DAO

                    let result = await filmeDAO.updateFilme(filme) //Chama a função do DAO para atualizar o filme (dados e ID)

                    if(result) {
                        message.defaultMessage.status       = message.SUCCESS_UPDATE_ITEM.status
                        message.defaultMessage.status_code  = message.SUCCESS_UPDATE_ITEM.status_code
                        message.defaultMessage.message      = message.SUCCESS_UPDATE_ITEM.message

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


//Fução para retornar todos os filmes
const listarFilme = async function() {
    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                            a sua estrutura local sem modificar a estrutura original*/

    try {
        let result = await filmeDAO.selectAllFilme() //Chama a função do DAO para retornar a lista de todos os filmes

        if(result) { //Valida se o DAO conseguiu processar os dados

            if(result.length > 0) { //Validação para verificar se existe conteúdo no ARRAY
                message.defaultMessage.status           = message.SUCCESS_RESPONSE.status 
                message.defaultMessage.status_code      = message.SUCCESS_RESPONSE.status_code
                message.defaultMessage.response.count   = result.length //Retorna a quantidade de filmes cadastrados no BD para o front-end
                message.defaultMessage.response.filme   = result

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


//Função para buscar um filme pelo ID
const buscarFilme = async function(id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //Validação para garantir que o ID seja válido
        if(id == '' || id == null || id == undefined || isNaN(id)) {
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400

        } else {
            let result = await filmeDAO.selectByIdFilme(id)

            if(result) {

                if(result.length > 0) {
                    message.defaultMessage.status           = message.SUCCESS_RESPONSE.status
                    message.defaultMessage.status_code      = message.SUCCESS_RESPONSE.status_code
                    message.defaultMessage.response.filme   = result

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


//Função para excluir um filme
const excluirFilme = async function() {

}


//Função para validar todos os dados de filme (obrigatórios, qtde de caracteres, etc)
const validarDados = async function(filme) {
    let message = JSON.parse(JSON.stringify(config_message)) 
    console.log(filme.valor.split('.')[0].length > 3)

    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        message.ERROR_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        message.ERROR_BAD_REQUEST.field = '[DATA_LANÇAMENTO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        message.ERROR_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        message.ERROR_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        message.ERROR_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor)) {
        message.ERROR_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else if(filme.capa.length > 255) {
        message.ERROR_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400

    } else {
        return false
    }
}

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme,
    validarDados
}
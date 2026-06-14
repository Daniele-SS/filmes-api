/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD de 
 * Data: 08/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.1
****************************************************************/


const config_message = require('../modulo/configMessages.js') 


const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')


const inserirNovaNacionalidade = async function(nacionalidade, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(nacionalidade)

    if(validar){
        return validar // 400
    }
    else{

        let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

        if(result){ // 201
            nacionalidade.id = result
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = nacionalidade
        }else{ // 500
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }

        return message.DEFAULT_MESSAGE
        }
    }else{
        return message.ERROR_CONTENT_TYPE // 415    
    }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarNacionalidade = async function(nacionalidade, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let resultBuscarID = await buscarByIdNacionalidade(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(nacionalidade, contentType)
 
                if(!validar){

                    nacionalidade.id = id

                    let result = await nacionalidadeDAO.updateNacionalidade(nacionalidade)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = nacionalidade
                        return message.DEFAULT_MESSAGE //200 (Atualizado)
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validar //400
                }
            }else{
                return resultBuscarID // 400 ou 404 ou 500
            }
        }else{
            return message.ERROR_CONTENT_TYPE // 415
        }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Controller)

    }
    
}

const listarNacionalidade = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        if(result){
            
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.nacionalidade = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarByIdNacionalidade = async function(id){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.nacionalidade  = result

                    return message.DEFAULT_MESSAGE //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else result = message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
        }

        } catch (error) {
            return message.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}
const excluirByIdNacionalidade = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do erro 400 e do 404

        let resultBuscarID = await buscarByIdNacionalidade(id)

        if(resultBuscarID.status){
            
            let result = await nacionalidadeDAO.deleteByIdNacionalidade(id)

            if(result){
                return  message.SUCESS_DELETED_ITEM //200 (Registro excluido)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL//500 (model)
            }
        }else{
            return resultBuscarID // 400 ou 404
        }

    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

const validarDados = async function(nacionalidade){
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos (status 400)
    if(nacionalidade.nome_pais == undefined || nacionalidade.nome_pais == '' || nacionalidade.nome_pais == null || nacionalidade.nome_pais.length > 100){
        message.ERROR_BAD_REQUEST.field = '[NOME DO PAIS] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
    }else{
        return false
    }
}

module.exports = {
    inserirNovaNacionalidade,
    listarNacionalidade,
    buscarByIdNacionalidade,
    excluirByIdNacionalidade,
    atualizarNacionalidade
}
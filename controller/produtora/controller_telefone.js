/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD
 * Data: 06/06/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.2
****************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js') 

const telefoneDAO = require('../../model/DAO/telefone/telefone.js')

const inserirNovoTelefone = async function(telefone, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(telefone)

    if(validar){
        return validar // 400
    }
    else{

        let result = await telefoneDAO.insertTelefone(telefone)

        if(result){ // 201
            telefone.id = result
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = telefone
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

const atualizarTelefone = async function(telefone, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

            let resultBuscarID = await buscarTelefone(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(telefone)
 
                if(!validar){

                    telefone.id = id

                    let result = await telefoneDAO.updateTelefone(telefone)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = telefone
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
        }
        catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (Controller)

    }
    
}

const listarTelefone = async function(){

    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await telefoneDAO.selectAllTelefone()

        //Validação para verificar se DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.telefone = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarTelefone = async function(id){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(id == undefined || id == '' || id == null || isNaN(id)){
           message.ERROR_BAD_REQUEST.field = '[ID_TELEFONE] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await telefoneDAO.selectByIdTelefone(id)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.telefone = result

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

//Função para buscar os telefones pelo ID da produtora
const buscarTelefoneIdProdutora = async function(idProdutora){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idProdutora == undefined || idProdutora == '' || idProdutora == null || isNaN(idProdutora)){
           message.ERROR_BAD_REQUEST.field = '[ID_PRODUTORA] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           //CORREÇÃO: chama a query correta que filtra por id_produtora
           let result = await telefoneDAO.selectTelefonesByIdProdutora(idProdutora)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.telefone = result
                   return message.DEFAULT_MESSAGE //200
               }else{
                   return message.ERROR_NOT_FOUND //404
               }
           }else {
               return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
           }
       }

       } catch (error) {
           return message.ERROR_INTERNAL_SERVER_CONTROLLER
       }
}

//Função para excluir todos os telefones de uma produtora pelo ID da produtora
//Utilizada no Update e Delete da produtora
const excluirTelefoneProdutora = async function(idProdutora){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        if(idProdutora == undefined || idProdutora == '' || idProdutora == null || isNaN(idProdutora)){
            return false
        }
        //CORREÇÃO: chama deleteByIdProdutora (exclui todos os telefones da produtora)
        let result = await telefoneDAO.deleteByIdProdutora(idProdutora)
        if(result){
            return true 
        }else{
            return false
        }

    }catch (error){
        return false
    }
}

const validarDados = async function(produtora_telefone){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    if(produtora_telefone.numero == undefined || produtora_telefone.numero == '' || produtora_telefone.numero == null || produtora_telefone.numero.length > 20){
        message.ERROR_BAD_REQUEST.field = '[NUMERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
        
    }else if(produtora_telefone.id_produtora == undefined || produtora_telefone.id_produtora == '' || produtora_telefone.id_produtora == null || isNaN(produtora_telefone.id_produtora)){
            message.ERROR_BAD_REQUEST.field = '[ID_PRODUTORA] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
            
    }else if(produtora_telefone.id_tipo_telefone == undefined || produtora_telefone.id_tipo_telefone == '' || produtora_telefone.id_tipo_telefone == null || isNaN(produtora_telefone.id_tipo_telefone)){
            message.ERROR_BAD_REQUEST.field = '[ID_TIPO_TELEFONE] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
    }else{
            return false
    }
}

module.exports = {
    inserirNovoTelefone,
    atualizarTelefone,
    listarTelefone,
    buscarTelefone,
    buscarTelefoneIdProdutora,
    excluirTelefoneProdutora
}
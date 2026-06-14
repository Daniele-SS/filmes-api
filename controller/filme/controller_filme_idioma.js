/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD
 * Data: 08/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.1
****************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js') 

const filme_idiomaDAO = require('../../model/DAO/filme_idioma/filme_idioma.js')

const inserirNovoFilmeIdioma = async function(filmeIdioma, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(filmeIdioma)

    if(validar){
        return validar // 400
    }
    else{

        let result = await filme_idiomaDAO.insertFilmeIdioma(filmeIdioma)

        if(result){ // 201
            filmeIdioma.id = result
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = filmeIdioma
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

const atualizarFilmeIdioma = async function(filmeIdioma, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

            let resultBuscarID = await buscarFilmeIdioma(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(filmeIdioma)
 
                if(!validar){

                    filmeIdioma.id = id

                    let result = await filme_idiomaDAO.updateFilmeIdioma(filmeIdioma)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = filmeIdioma
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

const listarFilmeIdioma = async function(){

    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await filme_idiomaDAO.selectAllFilmeIdioma()

        //Validação para verificar se DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme_idioma = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarFilmeIdIdioma = async function(idIdioma){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idIdioma == undefined || idIdioma == '' || idIdioma == null || isNaN(idIdioma)){
           message.ERROR_BAD_REQUEST.field = '[ID_IDIOMA] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filme_idiomaDAO.selectFilmesByIdIdioma(idIdioma)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_idioma = result

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

const buscarIdiomaIdFilme = async function(idFilme){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)){
           message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filme_idiomaDAO.selectIdiomasByIdFilme(idFilme)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_idioma = result
                   return message.DEFAULT_MESSAGE //200
               }else{
                   return message.ERROR_NOT_FOUND //404
               }
           // CORREÇÃO DA LINHA ABAIXO (Adicionado o 'return'):
           }else {
               return message.ERROR_INTERNAL_SERVER_MODEL // 500 (model)
           }
       }

       } catch (error) {
           return message.ERROR_INTERNAL_SERVER_CONTROLLER
       }
}

const buscarFilmeIdioma = async function(idFilme){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await filme_idiomaDAO.selectAllFilmeIdioma()

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_idioma = result

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
const excluirFilmeIdioma = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        if(idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)){
            return false
        }
        let result = await filme_idiomaDAO.deleteIdiomasByIdFilme(idFilme)
        if(result){
            return true 
        }else{
            return false
        }

    }catch (error){
        return false
    }
}

const validarDados = async function(filme_idioma){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    if(filme_idioma.tipo == undefined || filme_idioma.tipo == '' || filme_idioma.tipo == null || filme_idioma.tipo.length > 100){
        message.ERROR_BAD_REQUEST.field = '[TIPO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
        
    }else if(filme_idioma.id_idioma == undefined || filme_idioma.id_idioma == '' || filme_idioma.id_idioma == null || isNaN(filme_idioma.id_idioma)){
            // CORREÇÃO: Alinhado o nome do campo com a validação real
            message.ERROR_BAD_REQUEST.field = '[ID_IDIOMA] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
            
    }else if(filme_idioma.id_filme == undefined || filme_idioma.id_filme == '' || filme_idioma.id_filme == null || isNaN(filme_idioma.id_filme)){
            // CORREÇÃO: Adicionada a validação do ID do Filme que faltava para a tabela intermediária
            message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
    }else{
            return false
    }
}

module.exports = {
    inserirNovoFilmeIdioma,
    listarFilmeIdioma,
    buscarFilmeIdioma,
    buscarIdiomaIdFilme,
    excluirFilmeIdioma,
    atualizarFilmeIdioma
}
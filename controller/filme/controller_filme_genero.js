/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD de filme e gêneros
 * Data: 22/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.9
****************************************************************/


const config_message = require('../modulo/configMessages.js') 


const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')


const inserirNovoFilmeGenero = async function(filmeGenero){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    let validar = await validarDados(filmeGenero)

    if(validar){
        return validar // 400
    }
    else{

        let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)

        if(result){ // 201
            filmeGenero.id = result
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = filmeGenero
        }else{ // 500
            return message.ERROR_INTERNAL_SERVER_MODEL // 500
        }

        return message.DEFAULT_MESSAGE
        }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500 (controller)
    }
}

const atualizarFilmeGenero = async function(filmeGenero, id){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

            let resultBuscarID = await busca(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(filmeGenero, contentType)
 
                if(!validar){

                    filmeGenero.id = id

                    let result = await filmeGeneroDAO.updateIdioma(filmeGenero)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = filmeGenero
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

const listarFilmeGenero = async function(){

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        if(result){
            
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filmeGenero = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarFilmeGenero = async function(id){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarFilmeIdGenero = async function(idGenero){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idGenero == undefined || idGenero == '' || idGenero == null || isNaN(idGenero)){
           message.ERROR_BAD_REQUEST.field = '[ID_GÊNERO] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_genero = result

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

const buscarGeneroIdFilme = async function(idFilme){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idFilme == undefined || idFilme == '' || idFilme == null || isNaN(idFilme)){
           message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filmeGeneroDAO.selectGenerosyIdFilme(idFilme)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_genero = result
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

const excluirFilmeGenero = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do erro 400 e do 404

        let resultBuscarID = await buscarFilmeGenero(id)

        if(resultBuscarID.status){
            
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

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

//Função para excluir os gêneros relacionados com o Filme
const excluirGenerosIdFilme = async function(idFilme){
    let message = JSON.parse(JSON.stringify(config_message))

    try{            
            let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

            if(result){
                return  message.SUCESS_DELETED_ITEM //200 (Registro excluido)
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL//500 (model)
            }
    }catch (error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (Controller)
    }
}

const validarDados = async function(filmeGenero){
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação de dados para os atributos (status 400)
    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == '' || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme)){
        message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
        
    }else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == '' || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero) ){
        message.ERROR_BAD_REQUEST.field = '[ID_GÊNERO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    excluirFilmeGenero,
    atualizarFilmeGenero,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirGenerosIdFilme
}
/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD
 * Data: 06/06/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.12.06.06
****************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js') 

const filmePessoaDAO = require('../../model/DAO/filme_pessoa/filme_pessoa.js')

const inserirNovoFilmePessoa = async function(filmePessoa, contentType){

    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(filmePessoa)

    if(validar){
        return validar // 400
    }
    else{

        let result = await filmePessoaDAO.insertFilmePessoa(filmePessoa)

        if(result){ // 201
            filmePessoa.id = result
            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = filmePessoa
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

const atualizarFilmePessoa = async function(filmePessoa, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{

            let resultBuscarID = await buscarFilmePessoa(id)
            
            if(resultBuscarID.status){
                let validar = await validarDados(filmePessoa)
 
                if(!validar){

                    filmePessoa.id = id

                    let result = await filmePessoaDAO.updateFilmePessoa(filmePessoa)

                    if(result){
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = filmePessoa
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

const listarFilmePessoa = async function(){

    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await filmePessoaDAO.selectAllFilmePessoa()

        //Validação para verificar se DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0 ){
                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.filme_pessoa = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

const buscarFilmesByIdPessoa = async function(idPessoa){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idPessoa == undefined || idPessoa == '' || idPessoa == null || isNaN(idPessoa)){
           message.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filmePessoaDAO.selectFilmesByIdPessoa(idPessoa)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_pessoa = result

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

const buscarPessoaByIdFilme = async function(idPessoa){
    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
   let message = JSON.parse(JSON.stringify(config_message))

       try {
           //Validação para garantir que o ID seja válido
           if(idPessoa == undefined || idPessoa == '' || idPessoa == null || isNaN(idPessoa)){
           message.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
           return message.ERROR_BAD_REQUEST // 400
       }else{
           let result = await filmePessoaDAO.selectPessoaByIdFilme(idPessoa)

           if(result){
               if(result.length > 0){
                   message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                   message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                   message.DEFAULT_MESSAGE.response.filme_pessoa = result
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

const buscarFilmePessoa = async function(idPessoa){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(idPessoa == undefined || idPessoa == '' || idPessoa == null || isNaN(idPessoa)){
            message.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await filmePessoaDAO.selectFilmesByIdPessoa(idPessoa)

            if(result){
                if(result.length > 0){
                    message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_pessoa = result

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
const excluirFilmePessoa = async function(idPessoa){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        if(idPessoa == undefined || idPessoa == '' || idPessoa == null || isNaN(idPessoa)){
            return false
        }
        let result = await filmePessoaDAO.deletePessoasByIdFilme(idPessoa)
        if(result){
            return true 
        }else{
            return false
        }

    }catch (error){
        return false
    }
}

const validarDados = async function(filme_pessoa){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    if(filme_pessoa.funcao == undefined || filme_pessoa.funcao == '' || filme_pessoa.funcao == null || filme_pessoa.funcao.length > 30){
        message.ERROR_BAD_REQUEST.field = '[FUNCAO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
        
    }else if(filme_pessoa.id_pessoa == undefined || filme_pessoa.id_pessoa == '' || filme_pessoa.id_pessoa == null || isNaN(filme_pessoa.id_pessoa)){
            // CORREÇÃO: Alinhado o nome do campo com a validação real
            message.ERROR_BAD_REQUEST.field = '[ID_PESSOA] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
            
    }else if(filme_pessoa.id_filme == undefined || filme_pessoa.id_filme == '' || filme_pessoa.id_filme == null || isNaN(filme_pessoa.id_filme)){
            // CORREÇÃO: Adicionada a validação do ID do Filme que faltava para a tabela intermediária
            message.ERROR_BAD_REQUEST.field = '[ID_FILME] INVÁLIDO'
            return message.ERROR_BAD_REQUEST
    }else{
            return false
    }
}

module.exports = {
    inserirNovoFilmePessoa,
    atualizarFilmePessoa,
    listarFilmePessoa,
    buscarFilmesByIdPessoa,
    buscarPessoaByIdFilme,
    buscarFilmePessoa,
    excluirFilmePessoa
}
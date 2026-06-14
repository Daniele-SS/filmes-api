/****************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e
 *          Manipulação de dados para o CRUD de filmes
 * Data: 04/06/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.2
****************************************************************/

//Import do arquivo de padronização de mensagens
const config_message = require('../modulo/configMessages.js') 

//Import do arquivo DAO para fazer o CRUD da produtora no banco de dados
const produtoraDAO = require('../../model/DAO/produtora/produtora.js')
const controller_telefone = require('./controller_telefone.js')

//Função para inserir uma nova produtora
const inserirNovaProdutora = async function(produtora, contentType){

    //Criando um clone do objeto JSON para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))
    
    try{
    //Validação para o tipo de dados da requisição (somente JSON)
    if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

    let validar = await validarDados(produtora)

    if(validar){
        return validar // 400
    }
    else{

        let result = await produtoraDAO.insertProdutora(produtora)

        if(result){ // 201
            //Criando o atributo id no Json da produtora e colocando o novo ID gerado após o insert
            produtora.id = result

            //TELEFONE
            //Manipulação de dados para inserir os Telefones da Produtora
            for (let telefone of produtora.telefone){
                //Cria o objeto JSON com os dados do telefone
                let produtoraTelefone = {
                    "id_tipo_telefone": telefone.id,
                    "id_produtora":     produtora.id,
                    "numero":           telefone.numero
                }

                //Chama a controller do telefone para inserir os dados
                let resultInsertTelefone = await controller_telefone.inserirNovoTelefone(produtoraTelefone, contentType)
                
                if(!resultInsertTelefone.status){
                    return message.SUCCESS_CREATED_WARNING // 201 com alerta de dados não inseridos
                }
            }

            //BUSCANDO TELEFONE PARA RETORNAR NA RESPONSE
            let resultTelefone = await controller_telefone.buscarTelefoneIdProdutora(produtora.id)
            if(resultTelefone.status){
                produtora.telefone = resultTelefone.response.telefone
            }

            message.DEFAULT_MESSAGE.status      = message.SUCCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCCESS_CREATED_ITEM.message
            message.DEFAULT_MESSAGE.response    = produtora
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

//Função para atualizar a produtora
const atualizarProdutora = async function(produtora, id, contentType){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do Content Type para receber apenas JSON
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Validação para o id incorreto
            let resultBuscarID = await buscarProdutora(id)

            if(resultBuscarID.status){
                let validar = await validarDados(produtora)

                //Validação de campos obrigatórios para atualização (Body)
                if(!validar){

                    produtora.id = id

                    let result = await produtoraDAO.updateProdutora(produtora)

                    if(result){

                        //TELEFONE
                        //Exclui todos os telefones relacionados com a produtora para reinserir
                        await controller_telefone.excluirTelefoneProdutora(produtora.id)

                        if (produtora.telefone && produtora.telefone.length > 0) {
                            for (let telefone of produtora.telefone) {
                                let produtoraTelefone = {
                                    "id_tipo_telefone": telefone.id,
                                    "id_produtora":     produtora.id,
                                    "numero":           telefone.numero
                                }
                                //CORREÇÃO: chama controller_telefone, não controller_filme_pessoa
                                let resultInsertTelefone = await controller_telefone.inserirNovoTelefone(produtoraTelefone, contentType)
                                console.log(resultInsertTelefone)
                                if(!resultInsertTelefone.status){
                                    return message.SUCCESS_CREATED_WARNING
                                }
                            }
                        }

                        //BUSCANDO TELEFONE PARA RETORNAR NA RESPONSE
                        let resultTelefone = await controller_telefone.buscarTelefoneIdProdutora(produtora.id)
                        if(resultTelefone.status){
                            produtora.telefone = resultTelefone.response.telefone
                        }

                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPDATED_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPDATED_ITEM.message
                        message.DEFAULT_MESSAGE.response    = produtora
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

//Função para retornar todas as produtoras
const listarProdutora = async function(){

    //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let result = await produtoraDAO.selectAllProdutora()

        //Validação para verificar se DAO conseguiu processar os dados
        if(result){
            //Validação para verificar se existe conteúdo no array
            if(result.length > 0 ){

                //CORREÇÃO: bloco de telefone dentro do loop, usando a variável correta (produtora)
                for(let produtora of result){
                    //TELEFONE
                    let resultTelefone = await controller_telefone.buscarTelefoneIdProdutora(produtora.id)
                    if(resultTelefone.status){
                        produtora.telefone = resultTelefone.response.telefone
                    }
                }

                message.DEFAULT_MESSAGE.status         = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code    = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length
                message.DEFAULT_MESSAGE.response.produtora = result

                return message.DEFAULT_MESSAGE //200 

            }else return message.ERROR_NOT_FOUND //404  

        }else return message.ERROR_INTERNAL_SERVER_MODEL //500 (model)

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller) 
    }
}

//Função para buscar uma produtora pelo id
const buscarProdutora = async function(id){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

        try {
            //Validação para garantir que o ID seja válido
            if(id == undefined || id == '' || id == null || isNaN(id)){
            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await produtoraDAO.selectByIdProdutora(id)

            if(result){
                if(result.length > 0){

                    //CORREÇÃO: usando 'id' (parâmetro da função) para buscar os telefones
                    let resultTelefone = await controller_telefone.buscarTelefoneIdProdutora(id)
                    if(resultTelefone.status){
                        result[0].telefone = resultTelefone.response.telefone
                    }

                    message.DEFAULT_MESSAGE.status          = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.produtora  = result

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

//Função para excluir uma produtora
const excluirProdutora = async function(id){
    let message = JSON.parse(JSON.stringify(config_message))

    try{
        //Validação do erro 400 e do 404
        let resultBuscarID = await buscarProdutora(id)

        if(resultBuscarID.status){

            //CORREÇÃO: nome correto da função exportada pelo controller_telefone
            await controller_telefone.excluirTelefoneProdutora(id)

            let result = await produtoraDAO.deleteByIdProdutora(id)

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

//Função para validar todos os dados da produtora
const validarDados = async function(produtora){
     //Criando clone do objeto JSON para manipular a estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    if(produtora.nome_fantasia == undefined || produtora.nome_fantasia == '' || produtora.nome_fantasia == null || produtora.nome_fantasia.length > 80){
        message.ERROR_BAD_REQUEST.field = '[NOME FANTASIA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST //400
    }else if(produtora.cnpj == undefined || produtora.cnpj == '' || produtora.cnpj == null || produtora.cnpj.length > 30){
        message.ERROR_BAD_REQUEST.field = '[CNPJ] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.razao_social == undefined || produtora.razao_social == '' || produtora.razao_social == null || produtora.razao_social.length > 100){
        message.ERROR_BAD_REQUEST.field = '[RAZÃO SOCIAL] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.website == undefined || produtora.website == '' || produtora.website.length > 255){
        message.ERROR_BAD_REQUEST.field = '[WEBSITE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.data_inicio == undefined || produtora.data_inicio == '' || produtora.data_inicio == null){
        message.ERROR_BAD_REQUEST.field = '[DATA DE INICIO] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.status_produtora == undefined || produtora.status_produtora == '' || produtora.status_produtora == null || produtora.status_produtora.length > 15){
        message.ERROR_BAD_REQUEST.field = '[STATUS DA PRODUTORA] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.email == undefined || produtora.email == '' || produtora.email == null || produtora.email.length > 255){
        message.ERROR_BAD_REQUEST.field = '[EMAIL] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else if(produtora.telefone == undefined || produtora.telefone == null || !Array.isArray(produtora.telefone)){
        message.ERROR_BAD_REQUEST.field = '[TELEFONE] INVÁLIDO'
        return message.ERROR_BAD_REQUEST
    }else{
        return false
    }
}

module.exports = {
    inserirNovaProdutora,
    listarProdutora,
    buscarProdutora,
    excluirProdutora,
    atualizarProdutora
}
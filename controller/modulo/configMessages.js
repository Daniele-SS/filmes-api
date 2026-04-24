/**************************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagens da API
 * Data: 17/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 **************************************************************************************/

//Padronização de cabeçalho para retorno dos endpoint da API
const defaultMessage = {
    api_description: 'API para gerenciar o controle de filmes',
    development: 'Daniele Silva Santos',
    version: '1.0.4.26',
    status: Boolean, 
    status_code: Number,
    response: {}
}

//Mensagens de erro da API 
const ERROR_BAD_REQUEST = {
    status: false, 
    status_code: 400, 
    message: 'Os dados enviados na requisição não estão corretos.'
}

const ERROR_CONTENT_TYPE = {
    status: false, 
    status_code: 415, 
    message: 'Não foi possível processar a requisição, pois o tipo de dados aceito pela API é somente JSON'
}

const ERROR_NOT_FOUND = {
    status: false, 
    status_code: 404, 
    message: 'Não foi encontrado nenhum dado para retorno.'
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false, 
    status_code: 500, 
    message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS]'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false, 
    status_code: 500, 
    message: 'Não foi possível processar a requisição por conta de erro na API [ERRO NA CONTROLLER]'
}


//Mensagens de sucesso da API
const SUCCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: 'Registro inserido com sucesso!'
}

const SUCCESS_RESPONSE = {
    status: true,
    status_code: 200,
}

module.exports = {
    defaultMessage,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_NOT_FOUND,
    SUCCESS_RESPONSE
}
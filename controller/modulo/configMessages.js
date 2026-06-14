/*********************************************************************************
 * Objetivo: Arquivo responsável pela configuração e padronização das mensagens
 *      da API
 * Data: 17/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
*********************************************************************************/

//Padronização de cabeçalho para retorno dos endpoints da API
const DEFAULT_MESSAGE = {
    api_description:    'API para gerenciar o controle de filmes',
    development:        'Daniele Silva Santos',
    version:            '1.0',
    status:             Boolean,
    status_code:        Number,
    response:           {}
}

//Mensagens de erro da API
//pode ser tudo em maiusculo caso for erro
const ERROR_BAD_REQUEST                 = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.'}
const ERROR_INTERNAL_SERVER_MODEL       = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS].'}
const ERROR_INTERNAL_SERVER_CONTROLLER  = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição por conta de erro na API [ERRO NA CONTROLLER].'}
const ERROR_CONTENT_TYPE                = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição, pois o formato de dados aceito pela API é somente JSON.'}
const ERROR_NOT_FOUND                   = {status: false, status_code: 404, message: 'Não foi encontrado nenhum dado para retorno'}


//Mensagens de sucesso da API
const SUCCESS_CREATED_ITEM      = {status: true, status_code: 201, message: 'Registro inserido com sucesso!'} // Mensagem de sucesso da API

const SUCCESS_CREATED_WARNING  = {status: true, status_code: 201, message: 'Os dados principais foram inserido com sucesso, porém alguns dados apresentaram problemas!'} // Mensagem de sucesso da API

const SUCESS_RESPONSE           = {status: true, status_code: 200} //retorno para GET 200

const SUCESS_UPDATED_ITEM       = {status: true, status_code: 200, message: 'Registro atualizado com sucesso!'} //retorno para PUT 200

const SUCESS_DELETED_ITEM       = {status: true, status_code: 200, message: 'Registro excluido com sucesso!'} // retorno para DELETE (200 ou 204)

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_NOT_FOUND,
    SUCESS_RESPONSE,
    SUCESS_UPDATED_ITEM,
    SUCESS_DELETED_ITEM,
    SUCCESS_CREATED_WARNING
}
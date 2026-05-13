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

const inserirNovoSexo = async function () {
    let message = JSON.parse(JSON.stringify(config_message)) /*Criando um clone do objeto JSON para manipular 
                                                                a sua estrutura local sem modificar a estrutura original*/

    try {
        
    } catch (error) {
        
    }
}
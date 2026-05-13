/**********************************************************************************
 * Obejtivo: Arquivo responsável pelo CRUD no Banco de Dados MySQL na tabela Sexo
 * Data: 13/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca para gerenciar o banco de dados MySql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD MySql
const knexConfig = require('../../database_config_knex/knexFile.js')

//Cria a conexão com o banco de dados MySql
const knexConex = knex(knexConfig.development)

const insertSexo = async function(sexo) {
    try {
        let sql = ` insert into tbl_sexo (
						sigla
						)
						values (
						'${sexo.sigla}'
						);`

        let result = await knexConex.raw(sql) //Executa o ScriptSql no banco de dados

        if(result) {
            return result[0].insertId //Retorna o ID gerado no BD
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    insertSexo
}
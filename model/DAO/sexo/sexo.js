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


const updateSexo = async function (sexo) {

    try {
        //Script para atualizar os dados no BD
        let sql = `update tbl_sexo set
                        sigla 	    = '${sexo.sigla}',
                        where id    = '${sexo.id}'
                    `

        let result = await knexConex.raw(sql) //Executa o scriptSQL no BD

        if(result) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}


const selectAllSexo = async function () {
    try {
        let sql = `select * from tbl_sexo order by id desc`

        let result = await knexConex.raw(sql)
 
        //Validação para verificar se o retorno no BD é um ARRAY
        if(Array.isArray(result)) {
            return result[0]
        } else {
            return false //Se o scriptSQL der erro, ele não devolve um ARRAY
        }

    } catch (error) {
        return false
    }
}


const selectByIdSexo = async function (id) {
    try {
        let sql = `select * from tbl_sexo where id=${id}`
        let result = await knexConex.raw(sql)

        if(Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}


const deleteSexo = async function (id) {
    try {
        let sql = `delete from tbl_sexo where id = ${id}`

        let result = await knexConex.raw(sql)
        
        if(result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}


module.exports = {
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}
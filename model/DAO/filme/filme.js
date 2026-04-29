/**********************************************************************************
 * Obejtivo: Arquivo responsável pelo CRUD no Banco de Dados MySQL na tabela Filme
 * Data: 15/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 **********************************************************************************/

//Import da biblioteca para gerenciar o banco de dados MySql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD MySql
const knexConfig = require('../../database_config_knex/knexFile.js')

//Cria a conexão com o banco de dados MySql
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de filme
const insertFilme = async function(filme) {
    try {
            let sql = `insert into tbl_filme (
                                nome, 
                                data_lancamento, 
                                duracao, 
                                sinopse, 
                                avaliacao, 
                                valor, 
                                capa
                                ) 
                        values (
                                '${filme.nome}', 
                                '${filme.data_lancamento}', 
                                '${filme.duracao}', 
                                '${filme.sinopse}',
                                if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                                '${filme.valor}',
                                '${filme.capa}'
                                );`

            let result = await knexConex.raw(sql) //Executa o ScriptSql no banco de dados

            if(result) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.log(error)
            return false
        }
}

//Função para atualizar um filme existente na tabela
const updateFilme = async function(filme) {
    try {
        //Script para atualizar os dados no BD
        let sql = `update tbl_filme set
                        nome 			= '${filme.nome}',
                        data_lancamento = '${filme.data_lancamento}',
                        duracao 		= '${filme.duracao}',
                        sinopse 		= '${filme.sinopse}',
                        avaliacao 		= if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
                        valor 			= '${filme.valor}',
                        capa 			= '${filme.capa}'
                        where id = ${filme.id}`

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


//Função que retorna todos os filmes da tabela de filmes
const selectAllFilme = async function() {
    try {
        let sql = `select * from tbl_filme order by id desc` //Script para retornar todos os filmes por ordem decrescente

        let result = await knexConex.raw(sql) //Executa no banco de dados o scriptSQL para retornar os filmes
 
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


//Função que irá retornar os dados de um filme pela primary key
const selectByIdFilme = async function(id) {
    try {
        let sql = `select * from tbl_filme where id=${id}`
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


//Função para excluir um filme pelo id
const deleteFilme = async function(id) {

}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}
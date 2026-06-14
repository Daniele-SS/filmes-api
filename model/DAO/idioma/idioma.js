/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 15/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.1
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de filmes
const insertIdioma = async function(idioma){
    try {
        let sql = `insert into tbl_idioma (
                            nome, 
                            sigla
                            )
                    values(
                            '${idioma.nome}',
                            '${idioma.sigla}'
                            );`
    
        //Executar o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
    
        if(result) return result[0].insertId //Retorna o ID gerado no banco de dados
        else return false
        
        }catch(error){
            // console.log(error)
            return false
        }
}

const updateIdioma = async function(idioma){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_idioma set
                            nome            = '${idioma.nome}',
                            sigla           = '${idioma.sigla}'
                            where id        =  ${idioma.id}`
              
            // Executa o script SQL no BD
            let result = await knexConex.raw(sql)

            if(result)
                return true
            else
                return false
        } catch (error) {
            return false
        }
}

const selectAllIdioma = async function(){
    try {
        //Script para retornar todos os filmes
        let sql = 'select * from tbl_idioma order by id desc'

        //Executa no banco de dados o script SQL para retornar os filmes
        let result = await knexConex.raw(sql)

        //Validação para verificar se o retorno do banco é um array
        //se o scriptSQL der erro, o banco não devolve um array
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error){
        return false
    }
}

const selectByIdIdioma = async function(id){
    try {
        let sql = `select * from tbl_idioma where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteByIdioma = async function(id){
    try{
        let sql = `delete from tbl_idioma
                     where id=${id}`

    let result = await knexConex.raw(sql)

    if(result){
        return true
    }else{
        return false
    }
    }catch(error){
        return false
    }
}

module.exports = {
    insertIdioma,
    updateIdioma,
    selectAllIdioma,
    selectByIdIdioma,
    deleteByIdioma
}
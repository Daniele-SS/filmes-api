/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 *           de classificação indicativa
 * Data 15/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertClassificacao = async function(classificacao){
    try {
    let sql = `insert into tbl_classificacao_indicativa (
                        nome, 
                        descricao,
                        sigla, 
                        idade_minima
                        )
                values(
                        '${classificacao.nome}',
                        '${classificacao.descricao}',
                        '${classificacao.sigla}',
                        '${classificacao.idade_minima}'
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

//Função para atualizar um filme existente na tabela
const updateClassificacao = async function(classificacao){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_classificacao_indicativa set
                            nome                    = '${classificacao.nome}',
                            descricao               = '${classificacao.descricao}',
                            sigla                   = '${classificacao.sigla}',
                            idade_minima            = '${classificacao.idade_minima}'
                            where id                =  ${classificacao.id}`
              
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

const selectAllClassificacao = async function(){
    try {
        let sql = 'select * from tbl_classificacao_indicativa order by id desc'

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

const selectByIdClassificacao = async function(id){
    try {
        let sql = `select * from tbl_classificacao_indicativa where id=${id}`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteClassificacao = async function(id){
    try{
        let sql = `delete from tbl_classificacao_indicativa
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
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}
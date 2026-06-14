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


const insertTipoTelefone = async function(tipo_telefone){
    try {
        let sql = `insert into tbl_tipo_telefone (
                            tipo
                            )
                    values(
                            '${tipo_telefone.tipo}'
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

const updateTipoTelefone  = async function(tipo_telefone){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_tipo_telefone set
                            tipo            = '${tipo_telefone.tipo}'
                            where id        =  ${tipo_telefone.id}`
              
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

const selectAllTipoTelefone  = async function(){
    try {
        let sql = 'select * from tbl_tipo_telefone order by id desc'

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

const selectByIdTipoTelefone  = async function(id){
    try {
        let sql = `select * from tbl_tipo_telefone where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteByIdTipoTelefone  = async function(id){
    try{
        let sql = `delete from tbl_tipo_telefone
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
    insertTipoTelefone,
    updateTipoTelefone,
    selectAllTipoTelefone,
    selectByIdTipoTelefone,
    deleteByIdTipoTelefone
}
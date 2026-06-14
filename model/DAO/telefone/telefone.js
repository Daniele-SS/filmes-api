/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data: 04/06/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.2
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

//Função para inserir dados na tabela de telefone
const insertTelefone = async function(telefone){
    try {
        let sql = `insert into tbl_telefone (
                            numero,
                            id_tipo_telefone,
                            id_produtora
                            )
                    values(
                            '${telefone.numero}',
                            '${telefone.id_tipo_telefone}',
                            '${telefone.id_produtora}'
                            );`
    
        let result = await knexConex.raw(sql)
    
        if(result) return result[0].insertId
        else return false
        
        }catch(error){
        console.log(error)
            return false
        }
}

const updateTelefone = async function(telefone){
        try {
            let sql = `update tbl_telefone set
                            numero           = '${telefone.numero}',
                            id_tipo_telefone = '${telefone.id_tipo_telefone}',
                            id_produtora     = '${telefone.id_produtora}'
                            where id         =  ${telefone.id}`
              
            let result = await knexConex.raw(sql)

            if(result)
                return true
            else
                return false
        } catch (error) {
            return false
        }
}

const selectAllTelefone = async function(){
    try {
        let sql = 'select * from tbl_telefone order by id desc'

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error){
        return false
    }
}

const selectByIdTelefone = async function(id){
    try {
        let sql = `select * from tbl_telefone where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para retornar os telefones filtrando pelo ID da produtora
const selectTelefonesByIdProdutora = async function(idProdutora){
    try {
        let sql = `select tbl_telefone.*, tbl_tipo_telefone.tipo as tipo_telefone
                    from tbl_telefone
                        inner join tbl_tipo_telefone
                            on tbl_tipo_telefone.id = tbl_telefone.id_tipo_telefone
                   where tbl_telefone.id_produtora=${idProdutora}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteByIdTelefone = async function(id){
    try{
        let sql = `delete from tbl_telefone where id=${id}`

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

//Função para excluir todos os telefones de uma produtora pelo ID da produtora
//Utilizada no Update e Delete da produtora
const deleteByIdProdutora = async function(idProdutora){
    try{
        let sql = `delete from tbl_telefone where id_produtora=${idProdutora}`

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
    insertTelefone,
    updateTelefone,
    selectAllTelefone,
    selectByIdTelefone,
    selectTelefonesByIdProdutora,
    deleteByIdTelefone,
    deleteByIdProdutora
}
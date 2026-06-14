/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 * Data 04/06/2026
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
const insertSexo = async function(sexo){
    try {
        let sql = `insert into tbl_sexo (
                            nome,
                            sigla
                            )
                    values(
                            '${sexo.nome}',
                            '${sexo.sigla}'
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

const updateSexo = async function(sexo){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_sexo set
                            nome       = '${sexo.nome}',
                            sigla      = '${sexo.sigla}'
                            where id        =  ${sexo.id}`
              
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

const selectAllSexo = async function(){
    try {
        //Script para retornar todos os filmes
        let sql = 'select * from tbl_sexo order by id desc'

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

const selectByIdSexo = async function(id){
    try {
        let sql = `select * from tbl_sexo where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteByIdSexo = async function(id){
    try{
        let sql = `delete from tbl_sexo
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
    insertSexo,
    updateSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteByIdSexo
}
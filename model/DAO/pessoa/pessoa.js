/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 *           genero
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

const insertPessoa = async function(pessoa){
    try {
        let sql = `insert into tbl_pessoa (
                            nome, 
                            data_nascimento,
                            foto,
                            id_nacionalidade,
                            id_sexo
                            )
                    values(
                            '${pessoa.nome}',
                            '${pessoa.data_nascimento}',
                            '${pessoa.foto}',
                            ${pessoa.id_nacionalidade},
                            ${pessoa.id_sexo}
                            );`
    
        //Executar o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
    
        if(result) return result[0].insertId //Retorna o ID gerado no banco de dados
        else return false
        
        }catch(error){
            console.log(error)
            return false
        }
}

const updatePessoa = async function(pessoa){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_pessoa set
                            nome            = '${pessoa.nome}',
                            data_nascimento = '${pessoa.data_nascimento}',
                            foto            = '${pessoa.foto}',
                            id_nacionalidade = ${pessoa.id_nacionalidade},
                            id_sexo         = ${pessoa.id_sexo}
                            where id        =  ${pessoa.id}`
              
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

const selectAllPessoa = async function(){
    try {
        let sql = 'select * from tbl_pessoa order by id desc'

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

const selectByIdPessoa = async function(id){
    try {
        let sql = `select * from tbl_pessoa where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deletePessoa = async function(id){
    try{
        let sql = `delete from tbl_pessoa
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
    insertPessoa,
    updatePessoa,
    selectAllPessoa,
    selectByIdPessoa,
    deletePessoa
}
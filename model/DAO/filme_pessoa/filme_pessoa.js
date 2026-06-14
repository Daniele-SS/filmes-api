/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 *           intermediaria filme e idioma
 * Data 20/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 0.9.5.26
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertFilmePessoa = async function(filmePessoa){
    try {
        let sql = `insert into tbl_filme_pessoa (
                            funcao, 
                            id_filme,
                            id_pessoa
                            )
                    values(
                            '${filmePessoa.funcao}',
                            '${filmePessoa.id_filme}',
                            '${filmePessoa.id_pessoa}'
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

const updateFilmePessoa = async function(filmePessoa){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_filme_pessoa set
                            funcao          = '${filmePessoa.funcao}',
                            id_filme        = '${filmePessoa.id_filme}',
                            id_pessoa       = '${filmePessoa.id_pessoa}'
                            where id        =  ${filmePessoa.id}`
              
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

const selectAllFilmePessoa = async function(){
    try {
        let sql = 'select * from tbl_filme_pessoa order by id desc'

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

const selectByIdFilmePessoa = async function(id){
    try {
        let sql = `select * from tbl_filme_pessoa where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const selectFilmesByIdPessoa = async function(idPessoa){
    try {
        let sql = `select tbl_filmes.*
                    from tbl_filmes 
                        inner join tbl_filme_pessoa 
                            on tbl_filmes.id = tbl_filme_pessoa.id_filme
                        inner join tbl_pessoa
                            on tbl_pessoa.id = tbl_filme_pessoa.id_pessoa
                where tbl_pessoa.id=${idPessoa}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Idioma filtrando pelo ID do filme
const selectPessoaByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_pessoa.*, tbl_filme_pessoa.funcao
                    from tbl_filmes 
                        inner join tbl_filme_pessoa 
                            on tbl_filmes.id = tbl_filme_pessoa.id_filme
                        inner join tbl_pessoa
                            on tbl_pessoa.id = tbl_filme_pessoa.id_pessoa
                where tbl_filmes.id=${idFilme}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteFilmePessoa = async function(id){
    try{
        let sql = `delete from tbl_filme_pessoa
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

//Função para excluir os idiomas filtrando pelo id do filme
//Essa função será utilizada no Update do filme pois precisa apagar todos os IDIOMAS 
//Relacionados com o FILME para INSERIR as novas relações
const deletePessoasByIdFilme = async function(idPessoa){
    try{
    let sql = `delete from tbl_filme_pessoa where id_filme=${idPessoa};`
               
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
    insertFilmePessoa,
    updateFilmePessoa,
    selectAllFilmePessoa,
    selectByIdFilmePessoa,
    selectFilmesByIdPessoa,
    selectPessoaByIdFilme,
    deleteFilmePessoa,
    deletePessoasByIdFilme
}
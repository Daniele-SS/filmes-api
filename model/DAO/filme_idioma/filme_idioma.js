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

const insertFilmeIdioma = async function(filme_idioma){
    try {
        let sql = `insert into tbl_filme_idioma (
                            tipo, 
                            id_idioma,
                            id_filme
                            )
                    values(
                            '${filme_idioma.tipo}',
                            ${filme_idioma.id_idioma},
                            ${filme_idioma.id_filme}
                            );`
    
        //Executar o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
    
        if(result) return result[0].insertId //Retorna o ID gerado no banco de dados
        else return false
        
        }catch(error){
            return false
        }
}

const updateFilmeIdioma = async function(filme_idioma){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_filme_idioma set
                            tipo            = '${filme_idioma.tipo}',
                            id_idioma       = '${filme_idioma.id_idioma}',
                            id_filme        = '${filme_idioma.id_filme}'
                            where id        =  ${filme_idioma.id}`
              
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

const selectAllFilmeIdioma = async function(){
    try {
        let sql = 'select * from tbl_filme_idioma order by id desc'

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

const selectByFilmeIdioma = async function(id){
    try {
        let sql = `select * from tbl_filme_idioma where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const selectFilmesByIdIdioma = async function(idIdioma){
    try {
        let sql = `select tbl_filmes.*
                    from tbl_filmes 
                        inner join tbl_filme_idioma 
                            on tbl_filmes.id = tbl_filme_idioma.id_filme
                        inner join tbl_idioma
                            on tbl_idioma.id = tbl_filme_idioma.id_idioma
                where tbl_idioma.id=${idIdioma}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Idioma filtrando pelo ID do filme
const selectIdiomasByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_idioma.*, tbl_filme_idioma.tipo
                    from tbl_filmes 
                        inner join tbl_filme_idioma 
                            on tbl_filmes.id = tbl_filme_idioma.id_filme
                        inner join tbl_idioma
                            on tbl_idioma.id = tbl_filme_idioma.id_idioma
                where tbl_filmes.id=${idFilme}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

const deleteFilmeIdioma = async function(id){
    try{
        let sql = `delete from tbl_filme_idioma
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
const deleteIdiomasByIdFilme = async function(idFilme){
    try{
    let sql = `delete from tbl_filme_idioma where id_filme=${idFilme};`
               
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
    insertFilmeIdioma,
    updateFilmeIdioma,
    selectAllFilmeIdioma,
    selectByFilmeIdioma,
    selectFilmesByIdIdioma,
    selectIdiomasByIdFilme,
    deleteFilmeIdioma,
    deleteIdiomasByIdFilme
}
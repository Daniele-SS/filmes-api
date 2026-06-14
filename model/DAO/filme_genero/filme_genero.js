/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 *              de relação entre filme e genero
 * Data 22/05/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.9.05.26
 ********************************************************************************/

//import da biblioteca para gerenciar o banco de dados Mysql no node.JS
const knex = require('knex')

//Import do arquivo de configuração para conexão com o BD Mysql
const knexConfig = require('../../database_config_knex/knex_file.js')

//Criar a conexão com o BD Mysql
const knexConex = knex(knexConfig.development)

const insertFilmeGenero = async function(filmeGenero){
    try {
    let sql = `insert into tbl_filme_genero (
                        id_filme,
                        id_genero
                        )
                values(
                        '${filmeGenero.id_filme}',
                        '${filmeGenero.id_genero}'
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

const updateFilmeGenero = async function(filmeGenero){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_filme_genero set
                            id_filme                = '${filmeGenero.id_filme}',
                            id_genero               = '${filmeGenero.id_genero}'
                            where id                =  ${filmeGenero.id}`
              
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


const selectAllFilmeGenero= async function(){
    try {
        let sql = 'select * from tbl_filme_genero order by id desc'
        
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

const selectByIdFilmeGenero = async function(id){
    try {
        let sql = `select * from tbl_filme_genero where id=${id}`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Filme filtrando pelo ID do Gênero
const selectFilmesByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filmes.*
                    from tbl_filmes 
                        inner join tbl_filme_genero 
                            on tbl_filmes.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                where tbl_genero.id=${idGenero}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para retornar os dados do Gênero filtrando pelo ID do filme
const selectGenerosyIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_genero.*
                    from tbl_filmes 
                        inner join tbl_filme_genero 
                            on tbl_filmes.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero
                where tbl_filmes.id=${idFilme}`

        let result = await knexConex.raw(sql)
        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para excluir gênero pelo ID
const deleteFilmeGenero = async function(id){
    try{
        let sql = `delete from tbl_filme_genero
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

//Função para excluir os generos filtrando pelo id do filme
//Essa função será utilizada no Update do filme pois precisa apagar todos os GENEROS 
//Relacionados com o FILME para INSERIR as novas relações
const deleteGenerosByIdFilme = async function(idFilme){
    try{
    let sql = `delete from tbl_filme_genero where id_filme=${idFilme};`
               
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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosyIdFilme,
    deleteGenerosByIdFilme
}
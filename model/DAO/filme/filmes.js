/********************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de daods MySQL na tabela
 *           Filme
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

//Função para inserir dados na tabela de filmes
const insertFilme = async function(filmes){
    try {
    let sql = `insert into tbl_filmes (
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor, 
                        capa,
                        trailer_url,
                        status_filme,
                        id_classificacao_indicativa,
                        id_produtora
                        )
				values(
						'${filmes.nome}',
						'${filmes.data_lancamento}',
						'${filmes.duracao}',
                        '${filmes.sinopse}',
                        if('${filmes.avaliacao}' = '', null, '${filmes.avaliacao}'),
                        '${filmes.valor}',
                        '${filmes.capa}',
                        if('${filmes.trailer_url}' = '', null, '${filmes.trailer_url}'),
                        if('${filmes.status_filme}' = '', null, '${filmes.status_filme}'),
                        ${filmes.id_classificacao_indicativa},
                        ${filmes.id_produtora}
                        );`

    //Executar o scriptSQL no banco de dados
    let result = await knexConex.raw(sql)

    if(result) return result[0].insertId //Retorna o ID gerado no banco de dados
    else return false
    
    }catch(error){
        return false
    }
}

//Função para atualizar um filme existente na tabela
const updateFilme = async function(filmes){
        try {
            // Script para atualizar os dados do BD
            let sql = `update tbl_filmes set
                            nome                        = '${filmes.nome}',
                            data_lancamento             = '${filmes.data_lancamento}',
                            duracao                     = '${filmes.duracao}',
                            sinopse                     = '${filmes.sinopse}',
                            avaliacao                   = if('${filmes.avaliacao}' = '', null, '${filmes.avaliacao}'),
                            valor                       = '${filmes.valor}',
                            capa                        = '${filmes.capa}',
                            trailer_url                 = if('${filmes.trailer_url}' = '', null, '${filmes.trailer_url}'),
                            status_filme                = if('${filmes.status_filme}' = '', null, '${filmes.status_filme}'),
                            id_classificacao_indicativa = ${filmes.id_classificacao_indicativa},
                            id_produtora                = ${filmes.id_produtora}
                        where id = ${filmes.id}`
              
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

//Função para retornar todos os dados da tabela de filme
const selectAllFilme = async function(){
    try {
        //Script para retornar todos os filmes
        let sql = 'select * from tbl_filmes order by id desc'

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

//Função para retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function(id){
    try {
        let sql = `select * from tbl_filmes where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else return false

    } catch (error) {
        return false
    }
}

//Função para excluir um filme pelo ID
const deleteFilme = async function(id){
    try{
        let sql = `delete from tbl_filmes
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
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}
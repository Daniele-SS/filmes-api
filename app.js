/************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Filmes
 * Data: 17/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ************************************************************************************/

//Import das depedências para criar a API
const express       = require ('express')
const cors          = require ('cors')
const bodyParser    = require('body-parser')


//Import das CONTROLLERS do projeto
const controllerFilme = require('./controller/filme/controller_filme.js')


const bodyParserJSON = bodyParser.json() //Criando um objeto para manipular dados do body da API em formato JSON

const app = express() //Criando um objeto para manipular o express

//Conjunto de permissões a serem aplicadas no cors da API
const corsOptions = {
    origin: ['*'], //A origem da requisição, podendo ser um IP ou um asterisco '*' (que significa todos)
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //São os verbos que serão liberados na API (GET, POST, PUT e DELETE)
    allowedHeaders: ['Content-type', 'Autorization'] //São permissões de cabeçalho do cors
}

app.use(cors(corsOptions)) //Configura as permissões da API através do cors


app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    let dados       = request.body //Recebe o conteúdo dentro do body da requisição
    let contentType = request.headers['content-type']
    
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    response.status(result.status_code)
    response.json(result) //Irá retornar meu JSON que já está configurado na controller
    
})


app.get('/v1/senai/locadora/filme', async function(request, response) {
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})


app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    let id      = request.params.id //Recebe o ID via parâmetro
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})


app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type'] //Recebe o contentType da requisição

    let id = request.params.id //Recebe o ID do registro a ser atualizado

    let dados = request.body //Recebe os dados enviados no corpo (BODY) da requisição

    let result = await controllerFilme.atualizarFilme(dados, id, contentType) /*Chama a função de atualizar na controller 
                                                                                e encaminha os dados, id, contentType
                                                                                obedecendo a ordem de criação na função da controller*/

    response.status(result.status_code)
    response.json(result)
})

app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id //Recebe o ID do registro a ser atualizado

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})


app.listen(8080, function(){
    console.log('API funcionando e aguardando novas requisições ...')
})
/************************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de Filmes
 * Data: 17/04/2026
 * Autora: Daniele Silva Santos
 * Versão: 1.0
 ************************************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Fazendo com que o swagger leia o arquivo YAML para gerar a documentação em web
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')

//Import das CONTROLLERS do projeto

const    controllerGenero          = require('./controller/genero/controller_genero.js')
const    controllerClassificacao   = require('./controller/classificacao_indicativa/controller_classificacao.js')
const    controllerIdioma          = require('./controller/idioma/controller_idioma.js')
const    controllerNacionalidade   = require('./controller/nacionalidade/controller_nacionalidade.js')
const    controllerTipoTelefone    = require('./controller/tipo_telefone/controller_tipo_telefone.js')
const    controllerFilme           = require('./controller/filme/controller_filme.js')
const    controllerSexo            = require('./controller/sexo/controller_sexo.js')
const    controllerProdutora       = require('./controller/produtora/controller_produtora.js')
const    controllerPessoa          = require('./controller/pessoa/controller_pessoa.js')
//Criando um objeto para manipular dados do body da API em formato JSON
const bodyParserJSON = bodyParser.json()

const app = express()

//Carregando o arquivo YAML para o swagger
const swaggerDocument = YAML.load('./openapi.yaml')

const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Autorization']
}

app.use(cors(corsOptions))

//Configuração do Swagger para acessar a documentação da API
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
)

//ENDPOINTS

/* =========================================
             ENDPOINTS DE FILME
 ========================================= */

//Endpoint para inserir um filme 
app.post('/v1/senai/locadora/filme', bodyParserJSON, async function(request, response){
    //Recebe o conteúdo dentro do body da requisição
    let dados = request.body

    //Recebe o content type da requisição para validar se é um JSON
    let contentType = request.headers['content-type'] 

    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para listar todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response){
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

//Endpoint para buscar o filme pelo ID
app.get('/v1/senai/locadora/filme/:id', async function(request, response) {
    //Recebe o ID via paramêtro
    let id = request.params.id 
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para Atualizar um filme pelo ID 
app.put('/v1/senai/locadora/filme/:id', bodyParserJSON, async function(request, response){
    // Recebe o content type da requisição
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados enviados no corpo da requisição
    let dados = request.body

    // Chama a função de atualizar na controller e encaminha os dados, id e content-type
    // obedecendo a ordem de criação na função da controller
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


//Endpoint para Deletar um filme pelo ID
app.delete('/v1/senai/locadora/filme/:id', async function (request, response) {
    let id = request.params.id

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
    
})

/* =========================================
             ENDPOINTS DE GÊNERO
 ========================================= */

//Endpoint para inserir um genero 
app.post('/v1/senai/locadora/genero', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerGenero.inserirNovoGenero(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar gêneros
app.get('/v1/senai/locadora/genero', async function(request, response){

    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar gênero pelo ID
app.get('/v1/senai/locadora/genero/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar gênero
app.put('/v1/senai/locadora/genero/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar gênero
app.delete('/v1/senai/locadora/genero/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)
})

// Endpoint para inserir classificação
app.post('/v1/senai/locadora/classificacao', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

/* =========================================
             ENDPOINTS DE CLASSIFICAÇÃO
 ========================================= */

// Endpoint para listar classificações
app.get('/v1/senai/locadora/classificacao', async function(request, response){

    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar classificação pelo ID
app.get('/v1/senai/locadora/classificacao/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar classificação
app.put('/v1/senai/locadora/classificacao/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar classificação
app.delete('/v1/senai/locadora/classificacao/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})

/* =========================================
             ENDPOINTS DE IDIOMA
 ========================================= */

// Endpoint para inserir idioma
app.post('/v1/senai/locadora/idioma', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerIdioma.inserirNovoIdioma(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar idiomas
app.get('/v1/senai/locadora/idioma', async function(request, response){

    let result = await controllerIdioma.listarIdioma()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar idioma pelo ID
app.get('/v1/senai/locadora/idioma/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerIdioma.buscarIdioma(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar idioma
app.put('/v1/senai/locadora/idioma/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerIdioma.atualizarIdioma(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar idioma
app.delete('/v1/senai/locadora/idioma/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerIdioma.excluirIdioma(id)

    response.status(result.status_code)
    response.json(result)
})

// =========================================
// ENDPOINTS DE NACIONALIDADE
// =========================================

// Endpoint para inserir nacionalidade
app.post('/v1/senai/locadora/nacionalidade', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar nacionalidades
app.get('/v1/senai/locadora/nacionalidade', async function(request, response){

    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar nacionalidade pelo ID
app.get('/v1/senai/locadora/nacionalidade/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerNacionalidade.buscarByIdNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar nacionalidade
app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar nacionalidade
app.delete('/v1/senai/locadora/nacionalidade/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerNacionalidade.excluirByIdNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

/* =========================================
             ENDPOINTS DE TELEFONE
 ========================================= */

// Endpoint para inserir tipo telefone
app.post('/v1/senai/locadora/tipo-telefone', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerTipoTelefone.inserirNovoTipoTelefone(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar tipos de telefone
app.get('/v1/senai/locadora/tipo-telefone', async function(request, response){

    let result = await controllerTipoTelefone.listarTipoTelefone()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar tipo telefone pelo ID
app.get('/v1/senai/locadora/tipo-telefone/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerTipoTelefone.buscarByIdTipoTelefone(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar tipo telefone
app.put('/v1/senai/locadora/tipo-telefone/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerTipoTelefone.atualizarTipoTelefone(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar tipo telefone
app.delete('/v1/senai/locadora/tipo-telefone/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerTipoTelefone.excluirByIdTipoTelefone(id)

    response.status(result.status_code)
    response.json(result)
})

/* =========================================
             ENDPOINTS DE SEXO
 ========================================= */

 
// Endpoint para inserir tipo telefone
app.post('/v1/senai/locadora/sexo', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar tipos de telefone
app.get('/v1/senai/locadora/sexo', async function(request, response){

    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar tipo telefone pelo ID
app.get('/v1/senai/locadora/sexo/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar tipo telefone
app.put('/v1/senai/locadora/sexo/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar tipo telefone
app.delete('/v1/senai/locadora/sexo/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerSexo.excluirSexo(id)

    response.status(result.status_code)
    response.json(result)
})

/* =========================================
            ENDPOINTS DE PRODUTORA
 ========================================= */

 
// Endpoint para inserir tipo telefone
app.post('/v1/senai/locadora/produtora', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerProdutora.inserirNovaProdutora(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar tipos de telefone
app.get('/v1/senai/locadora/produtora', async function(request, response){

    let result = await controllerProdutora.listarProdutora()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar tipo telefone pelo ID
app.get('/v1/senai/locadora/produtora/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerProdutora.buscarProdutora(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar tipo telefone
app.put('/v1/senai/locadora/produtora/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerProdutora.atualizarProdutora(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar tipo telefone
app.delete('/v1/senai/locadora/produtora/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerProdutora.excluirProdutora(id)

    response.status(result.status_code)
    response.json(result)
})


/* =========================================
            ENDPOINTS DE PESSOA
 ========================================= */

 
// Endpoint para inserir tipo telefone
app.post('/v1/senai/locadora/pessoa', bodyParserJSON, async function(request, response){

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPessoa.inserirNovaPessoa(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para listar tipos de telefone
app.get('/v1/senai/locadora/pessoa', async function(request, response){

    let result = await controllerPessoa.listarPessoas()

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para buscar tipo telefone pelo ID
app.get('/v1/senai/locadora/pessoa/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerPessoa.buscarByIdPessoa(id)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para atualizar tipo telefone
app.put('/v1/senai/locadora/pessoa/:id', bodyParserJSON, async function(request, response){

    let id = request.params.id

    let dados = request.body

    let contentType = request.headers['content-type']

    let result = await controllerPessoa.atualizarPessoa(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


// Endpoint para deletar tipo telefone
app.delete('/v1/senai/locadora/pessoa/:id', async function(request, response){

    let id = request.params.id

    let result = await controllerPessoa.excluirByIdPessoa(id)

    response.status(result.status_code)
    response.json(result)
})


//Seve para inicializar a API para receber requisições
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log('API Funcionando na porta ' + PORT);
})

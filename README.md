# Locadora de Filmes — REST API

API REST desenvolvida em Node.js com arquitetura MVC para gerenciamento de uma locadora de filmes, com CRUD completo em múltiplos recursos e relacionamentos entre entidades.

---

## Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Banco de dados:** MySQL
- **Query builder:** Knex.js
- **Documentação:** OpenAPI 3.0 (Swagger)

---

## Estrutura do Projeto

```
filmes-api/
├── app.js
├── controller/
│   ├── filme/
│   │   ├── controller_filme.js
│   │   ├── controller_filme_genero.js
│   │   ├── controller_filme_idioma.js
│   │   └── controller_filme_pessoa.js
│   ├── genero/
│   │   └── controller_genero.js
│   ├── idioma/
│   │   └── controller_idioma.js
│   ├── classificacao_indicativa/
│   │   └── controller_classificacao.js
│   ├── produtora/
│   │   └── controller_produtora.js
│   ├── tipo_telefone/
│   │   └── controller_tipo_telefone.js
│   ├── telefone/
│   │   └── controller_telefone.js
│   ├── nacionalidade/
│   │   └── controller_nacionalidade.js
│   └── sexo/
│       └── controller_sexo.js
├── model/
│   └── DAO/
│       ├── filme/
│       ├── genero/
│       ├── idioma/
│       ├── produtora/
│       ├── telefone/
│       └── ...
├── database_config_knex/
│   └── knex_file.js
└── doc/
    └── openapi.yaml
```

---

## Instalação

**Pré-requisitos:** Node.js e MySQL instalados.

```bash
git clone https://github.com/Daniele-SS/filmes-api.git
cd filmes-api
npm install
```

Configure a conexão com o banco em `database_config_knex/knex_file.js`:

```js
development: {
  client: 'mysql2',
  connection: {
    host:     'localhost',
    user:     'root',
    password: 'sua_senha',
    database: 'db_filmes_20261_a'
  }
}
```

```bash
node app.js
# Servidor em http://localhost:8080
```

---

## Endpoints

Base URL: `http://localhost:8080/v1/senai/locadora`

### FILME

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/filme` | Lista todos os filmes com gênero, idioma, pessoa, classificação e produtora |
| GET | `/filme/:id` | Busca filme por ID |
| POST | `/filme` | Insere filme com gêneros, idiomas e pessoas |
| PUT | `/filme/:id` | Atualiza filme e reinicia as relações |
| DELETE | `/filme/:id` | Exclui filme e todas as relações |

**Body POST/PUT:**
```json
{
  "nome": "Operação Tempestade de Aço",
  "data_lancamento": "2025-03-20",
  "duracao": "02:05:00",
  "sinopse": "...",
  "avaliacao": "4.60",
  "valor": "54.90",
  "capa": "https://exemplo.com/capa.jpg",
  "trailer_url": "https://youtube.com/watch?v=abc",
  "status_filme": "Ativo",
  "id_classificacao_indicativa": 3,
  "id_produtora": 3,
  "genero":  [{"id": 1}, {"id": 2}],
  "idioma":  [{"id": 1, "tipo": "Original"}, {"id": 2, "tipo": "Dublado"}],
  "pessoa":  [{"id": 1, "funcao": "Ator"}]
}
```

### PRODUTORA

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtora` | Lista produtoras com telefones |
| GET | `/produtora/:id` | Busca produtora por ID |
| POST | `/produtora` | Insere produtora com telefones |
| PUT | `/produtora/:id` | Atualiza produtora e reinicia telefones |
| DELETE | `/produtora/:id` | Exclui produtora e seus telefones |

**Body POST/PUT:**
```json
{
  "nome_fantasia": "Vision Studios",
  "cnpj": "55.345.678/0001-90",
  "razao_social": "Vision Studios Entretenimento LTDA",
  "website": "https://www.visionstudios.com",
  "data_inicio": "2012-08-25",
  "status_produtora": "Ativa",
  "email": "contato@visionstudios.com",
  "telefone": [
    {"id": 1, "numero": "11946125563"},
    {"id": 2, "numero": "11945687852"}
  ]
}
```

### Demais recursos

Todos seguem o padrão CRUD simples:

| Recurso | Rota base |
|---------|-----------|
| Gênero | `/genero` |
| Idioma | `/idioma` |
| Classificação | `/classificacao` |
| Tipo de Telefone | `/tipo-telefone` |
| Nacionalidade | `/nacionalidade` |
| Sexo | `/sexo` |
| Pessoa | `/pessoa` |

```
GET    /recurso
GET    /recurso/:id
POST   /recurso
PUT    /recurso/:id
DELETE /recurso/:id
```

---

## Respostas

| Status | Situação |
|--------|----------|
| `200` | Operação bem-sucedida |
| `201` | Registro criado |
| `400` | Dados inválidos no body ou ID inválido |
| `404` | Registro não encontrado |
| `415` | Content-Type inválido (esperado `application/json`) |
| `500` | Erro interno no servidor ou no banco |

Todas as respostas seguem a estrutura:

```json
{
  "status": true,
  "status_code": 200,
  "message": "Request processado com sucesso",
  "response": {}
}
```

---

## Decisões de Arquitetura

**MVC com DAO:** controllers concentram validação e regras de negócio; DAOs isolam o SQL. Mudança de banco afeta apenas a camada DAO.

**Relações tratadas no controller:** ao inserir/atualizar um filme, o controller orquestra os inserts nas tabelas intermediárias (`tbl_filme_genero`, `tbl_filme_idioma`, `tbl_filme_pessoa`) de forma serial com `async/await`, garantindo consistência sem transações explícitas.

**Estratégia delete-insert no UPDATE:** para relações N:N, o update apaga todas as entradas antigas e reinserindo as novas. Simples, sem risco de duplicatas.

**Validação de Content-Type:** rotas de escrita rejeitam requisições com `Content-Type` diferente de `application/json` antes de processar qualquer dado.

---

## Documentação

A documentação completa dos endpoints está disponível no arquivo `doc/openapi.yaml`.  
Para visualizar: acesse [editor.swagger.io](https://editor.swagger.io) e importe o arquivo.

---

## Autora 
[Daniele Silva Santos](https://www.linkedin.com/in/danielesilvasantos/)
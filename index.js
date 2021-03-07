const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const saudacao = require('./saudacaoMid')
const usuarioAPI = require('./api/usuario')
// require('./api/produto')(app, 'com param!')
const produtoAPI = require('./api/produto')
produtoAPI(app, 'com param!')


app.post('/usuario', usuarioAPI.salvar)
app.get('/usuario', usuarioAPI.obter)

app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Função Middleware
app.use(saudacao('Felippe'))

app.use('/opa', (req, res, next) => {
    console.log('Antes...')
    next()
})

app.get('/clientes/relatorio', (req, res) => {
    res.send(`Cliente relatório: completo = ${req.query.completo} ano = ${req.query.ano}`)
})

app.post('/corpo', (req, res) => {
    // let corpo = ''
    // req.on('data', (parte) => {
    //     corpo += parte
    // })

    // req.on('end', () => {
    //     res.send(corpo)
    //     // res.json(JSON.parse(corpo))
    // })
    res.send(req.body)
    // res.send(JSON.stringify(req.body))
})

app.get('/clientes/:id', (req, res) =>{
    res.send(`Cliente ${req.params.id} selecionado!`)
})

app.get('/opa', (req, res, next) => {
    console.log('Durante...')
    res.json({
        data: [
            { id: 7, name: 'Ana', position: 1 },
            { id: 34, name: 'Bia', position: 2 },
            { id: 73, name: 'Carlos', position: 3 }
        ],
        count: 30,
        skip: 0,
        limit: 3,
        status: 200
    })

    //Chama o próximo método da cadeia
    next()

    // res.json([
    //     { id: 7, name: 'Ana', position: 1 },
    //     { id: 34, name: 'Bia', position: 2 },
    //     { id: 73, name: 'Carlos', position: 3 },
    // ])
    
    // res.json({
    //     name: 'iPad 32Gb',
    //     price: 1899.00,
    //     discount: 0.12
    // })

    // res.send('<h1>Estou bem!</h1><br/><h2>Tipo é HTML!</h2>')
})

app.use('/opa', (req, res) => {
    console.log('Depois...')
})

app.listen(3000, () => {
    console.log('Backed executando...')
})
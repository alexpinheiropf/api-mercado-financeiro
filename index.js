const api = require('./api')
const express = require("express")
const server = express()

// Seta a porta do Heroku ou padrão 3000
const port = process.env.PORT || 3000

// Utiliza o express Json para tratar o retorno da API
server.use(express.json())

// Configura a porta padrão ou a porta do Heroku teste
server.listen(port)

// Rota responsável em retornar o parâmetro 
server.get('/opcao/:serieId', async (req, res) => {

    // Recebe o parâmetro do Ticker da Opção
    const { serieId } = req.params
    try {
        // Inclui o parâmetro do Ticker da opção e retorna o seu último preço
        const {data} = await api.get(`opcao/seriepremio?serieId=${serieId}`)

        // Seta apenas o array do prices dentro da variável
        const arrayValoresOpcao = data.prices

        // Pega o ultimo preço cotado da opção
        const price = arrayValoresOpcao.at(-1).price

        // Retorna o ultimo valor cotado no dia
        return res.send({ price })

    } catch (error) {

        // Retorna o erro caso não consiga executar a rota
        res.send({ error: error.message })
    }
})

server.get('/teste', async (req, res) => {

    return res.send('teste')
})

// Rota responsável em retornar o parâmetro 
server.get('/tesouro/:ticker', async (req, res) => {

    // Recebe o parâmetro do Ticker da Opção
    const { ticker } = req.params
    const hoje = new Date()
    const dia = hoje.getDate().toString().padStart(2,'0')
    const mes = String(hoje.getMonth() + 1).padStart(2,'0')
    const ano = hoje.getFullYear().toString().slice(2)
    const dataAtual = `${dia}/${mes}/${ano}`
    let price = 0

    try {

        // Inclui o parâmetro do Ticker do Tesouro e retorna todos os preços
        const {data} = await api.get(`category/bondprice?ticker=${ticker}`)

        data.forEach(el => {
          if(dataAtual === el.date) {
            price = el.buyprice ?? el.sellprice
          }
        });

        // Retorna o ultimo valor cotado no dia
        return res.send({ price })

    } catch (error) {

        // Retorna o erro caso não consiga executar a rota
        res.send({ error: error.message })
    }
})

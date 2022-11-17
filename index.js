const api = require('./api')
const express = require("express")
const server = express()

// Seta a porta do Heroku ou padrão 3000
const port = process.env.PORT || 3000

// Utiliza o express Json para tratar o retorno da API
server.use(express.json())

// Configura a porta padrão ou a porta do Heroku
server.listen(port)

// Rota responsável em retornar o parâmetro 
server.get('/opcao/:serieId', async (req, res) => {
    // Recebe o parâmetro do Ticker da Opção
    const { serieId } = req.params
    try {
        // Inclui o parâmetro do Ticker da opção e retorna o seu último preço
        const {data} = await api.get(`seriepremio?serieId=${serieId}`)
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
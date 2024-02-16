const apiStatusInvest = require('./api-status-invest')
const { apiTesouroDireto } = require('./api-tesouro-direto')

const express = require("express")
const server = express()

// Seta a porta do Heroku ou padrão 3000
const port = process.env.PORT || 3000

// Utiliza o express Json para tratar o retorno da API
server.use(express.json())

// Configura a porta padrão ou a porta do Heroku teste
server.listen(port)

// Rota responsável em retornar o parâmetro das opções
server.get('/opcao/:serieId', async (req, res) => {

    // Recebe o parâmetro do Ticker da Opção
    const { serieId } = req.params
    try {
        // Inclui o parâmetro do Ticker da opção e retorna o seu último preço
        const {data} = await apiStatusInvest.get(`opcao/seriepremio?serieId=${serieId}`)

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

// Rota responsável em retornar o parâmetro do tesouro direto
server.get('/tesouro/:ticker', async (req, res) => {

    // Recebe o parâmetro do Ticker da Opção
    const { ticker } = req.params

    // Pega a data atual para comparar os valores
    const today = new Date()
    const day = today.getDate().toString().padStart(2,'0')
    const month = String(today.getMonth() + 1).padStart(2,'0')
    const year = today.getFullYear().toString().slice(2)
    const currentDate = `${day}/${month}/${year}`

    // Seta o preço
    let price

    try {

        // Inclui o parâmetro do Ticker do Tesouro e retorna todos os preços
        const {data} = await apiStatusInvest.get(`category/bondprice?ticker=${ticker}`)

        // Realiza um for e paga o último preço do ativo
        data.forEach(el => {
          if(currentDate === el.date) {
            // Valida se possui o ultimo preço atual senão pega o ultimo valor guardado
            price = el.buyprice ?? el.sellprice

          } else {
            price = el.buyprice ?? el.sellprice
          }
        });

        // Retorna o ultimo valor cotado no dia
        return res.send({ 
            "price": price
         })

    } catch (error) {

        // Retorna o erro caso não consiga executar a rota
        res.send({ error: error.message })
    }
})

// API Tesouro Direto oficial
server.get('/bonds/:ticker', async (req, res) => {
    let treasuryData = []
    let price
    let nameTreasury

    // Recebe o parâmetro do Ticker da Opção
    const { ticker } = req.params

    // Retorna os dados do Json do tesouro direto
    apiTesouroDireto()
    .then(data => {
        // Pega todos os dados importantes do tesouro (TrsrBdTradgList)
      const dataApiTreasury = data.response.TrsrBdTradgList
    
    //   Realiza o primeiro filtro para armazenar os dados separados
      dataApiTreasury.forEach((doc) => {
          treasuryData.push(doc.TrsrBd)
      })

    // Realiza o segundo filtro para pegar os dados para montar a saida da API  
      treasuryData.forEach(el => {
        if(replacetoLowerCase(el.nm) === ticker){
            price = el.untrInvstmtVal === 0 ? el.untrRedVal : el.untrInvstmtVal
        }
      })

      return res.send({ 
        price
     })
    })
    .catch(error => {
      console.error(error.message);
    });
})

function replacetoLowerCase (param) {
    let replaceTreasury

    // Verifica se tem o + e retira
    if (param.indexOf('+') !== -1) {
        replaceTreasury = param.replace(/\+/g, " ")
    } else {
        replaceTreasury = param
    }

    // Retorna dados todos minusculos e com traço
    return replaceTreasury.replace(/\s+/g, '-').toLowerCase()
}
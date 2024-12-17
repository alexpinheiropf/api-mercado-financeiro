
# Node.js API - Stock Options and Bonds

Este projeto é uma API desenvolvida em Node.js que utiliza Express para oferecer informações sobre opções de ações e títulos do Tesouro Direto.

## Estrutura do Projeto

```
src
├── config
│   ├── api-radar-opcoes.js
│   ├── api-status-invest.js
├── controllers
│   ├── bondsController.js
│   ├── stockOptionsController.js
├── services
│   ├── apiRadarOpcoesService.js
│   ├── apiStatusInvestService.js
├── utils
│   ├── replacetoLowerCase.js
├── app.js
├── routes.js
.env
```

## Pré-requisitos

- [Node.js](https://nodejs.org) (versão 14 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/alexpinheiropf/api-mercado-financeiro.git
   cd api-mercado-financeiro
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```env
   PORT=3000
   API_STATUS_INVEST_URL=https://api.statusinvest.com.br
   API_RADAR_OPCOES_URL=https://api-radar-opcoes.com.br
   ```

## Uso

1. Inicie o servidor em modo de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse a API em `http://localhost:3000`.

## Endpoints

### 1. **Obter Preço de Opções de Ações**

   - **URL:** `/stockoptions/:serieId`
   - **Método:** `GET`
   - **Parâmetros:** `serieId` - ID da série da opção de ação
   - **Exemplo de resposta:**
     ```json
     {
       "price": 12.34
     }
     ```

### 2. **Obter Dados de Títulos do Tesouro Direto**

   - **URL:** `/bonds/:ticker`
   - **Método:** `GET`
   - **Parâmetros:** `ticker` - Nome do título no formato lowercase e sem espaços
   - **Exemplo de resposta:**
     ```json
     {
       "nameTreasury": "Tesouro Prefixado 2026",
       "price": 1023.45
     }
     ```

## Estrutura de Código

- **Config:** Contém a configuração de URLs das APIs externas.
- **Controllers:** Gerenciam a lógica das rotas, processando requisições e enviando respostas.
- **Services:** Fazem a comunicação com APIs externas e encapsulam a lógica de negócios.
- **Utils:** Inclui funções auxiliares, como a conversão para lowercase.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm start`: Inicia o servidor em modo de produção.

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m 'Adiciona nova feature'
   ```
4. Faça um push para sua branch:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.

---

**Desenvolvido com 💻 por [Seu Nome](https://github.com/seu-usuario).**

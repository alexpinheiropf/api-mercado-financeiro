## Passo a passo para criar uma API no AWS
## Acesso da API na AWS por exemplo: https://54.94.91.102:3000/opcao/PETRB280 ou https://54.94.91.102:3000//tesouro/tesouro-Selic-2029

## Acesso ao vídeo tutorial para criar a máquina na AWS
## https://www.youtube.com/watch?v=u-o7cqzK6u8

## Inicializar package.json
yarn init -y

## Inicializar node_modules
npm add express

## Executar o node com o nodemon (Sem precisar reinicializar)
yarn start 

## Execução unica para teste
node index.js

## Realizar Login no heroku
heroku login

## Inicializar o Git
git init

## Indicar a pasta remota no Heroku onde está hospedado (Sem as aspas)
heroku git:remote -a "api-mercado-opcoes"

## Adiciona todos os arquivos no servidor por meio do git
git add .

## Realiza o commit da aplicação junto com uma frase para identificação
git commit -am "Primeiro Commit"

## Sobe a aplicação no Heroku e deixa disponível para consumo
git push heroku master

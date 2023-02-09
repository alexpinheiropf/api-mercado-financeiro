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

## ------------------------------------------------------------------------------
## CONFIGURAÇÃO DO OPENSSH NO POWERSHELL para acesso a máquina da AWS
## ------------------------------------------------------------------------------
## Link de acesso aos docs da microsoft
## https://learn.microsoft.com/pt-br/windows-server/administration/openssh/openssh_install_firstuse

## No terminal do PowerShell do windows digitar o seguinte comando para verificar se existe o open SSH
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'

## Acessar a máquina na AWS
## EC2/Instances/{{id da máquina}}/Connect to instance
## Vai aparcer uma tela com as informações de acesso via Open SSH
## Obs.: Ali vai ter o chmod 440 que deve ser configurado em Linux e Mac, porém em windows é um pouco diferente
## Windows:
## Acessar a pasta onde está a chave .pem e ir nas opções segurança em propriedades
## Desabilitar a Herança e clicar na primeira opção do modal
## Adiciona a permissão correta como:
## Inclua o usuário correta da máquina em que está
## Deixa as duas caixinhas Ler e Executar e pode aplicar e fechar tudo

## Acesse a pasta de acesso onde está a chave .pem
## E digite o acesso ssh com por exemplo: ssh -i "instance-aws-apsolutions.pem" ubuntu@ec2-54-94-91-102.sa-east-1.compute.amazonaws.com
## Já dentro do servidor realize um git clone para clonar o projeto dentro do servidor --- Caso tenha faça um git pull
## Para clonar basta executar o comando git clone https://github.com/alexpinheiropf/api-mercado-financeiro.git

## Acessar a pasta do projeto
## Rodar o npm install para baixar o node modules

## Antes de prosseguir com a execução do projeto deve-se liberar a porta 3333 na AWS caso não esteja liberada
## Acessar as instancias na AWS
## Rolar até o final da máquina e clicar no grupo de segurança definido para a máquina
## Clicar no grupo
## Ir no botão Edit inbound rules
## Add rule
## Custom TCP - Port range(3333) - Source(Anywhere) - Salve Rules

## Para deixar rodando o serviço para sempre deve-se instalar o pm2 para gerenciar os serviços
sudo npm install pm2 -g

## Para verificar se está instalado o pm2
pm2 -v

## Para verificar quais instancias estão rodando agora
pm2 list

## Acessando a pasta do projeto para rodar a api executar o seguinte comando
pm2 start index.js name=api-mercado-financeiro

## Para parar a aplicação 
pm2 stop api-mercado-financeiro

## Para atualizar a versão da API
git pull origin-master







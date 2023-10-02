# API de Contas Bancárias

Esta é uma API de contas bancárias  permite realizar operações bancárias , como abrir contas, excluir contas, depositar, sacar, transferir, verificar saldo e obter extrato de contas bancárias.

## Rotas Disponíveis

    rotas.get('/contas') - Listar contas
    rotas.post('/contas') - Abrir uma nova conta
    rotas.put('/contas/:numeroConta/usuario') - Atualizar dados Cadastrais
    rotas.post('/transacoes/depositar') - Depositar em uma conta
    rotas.post('/transacoes/sacar') - Sacar de uma conta
    rotas.post('/transacoes/transferir') - Transferir entre contas
    rotas.get('/contas/saldo') - Verificar saldo
    rotas.get('/contas/extrato') -  Obter extrato


## Configuração

Certifique-se de ter o Node.js instalado em seu ambiente.

Clone este repositório em sua máquina local.

    Inicialize o  npm init -y
   
 Instale as dependências:
    
    npm install express
    npm install -D nodemon

 Configure o arquivo (package.json):
    
    "scripts": {
    "dev": "nodemon ./src/index.js"
    },

Inicie o servidor:


## Uso
Você pode usar uma ferramenta como o insomnia para testar as rotas da API.

## Listar contas


        [
	{
		"numero": 1,
		"saldo": 1200,
		"usuario": {
			"nome": "Foo Bar",
			"cpf": "00011122233",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "foo@bar.com",
			"senha": "1234"
		}
	},
	{
		"numero": 2,
		"saldo": 100,
		"usuario": {
			"nome": "Foo Bar 2",
			"cpf": "00011122234",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "foo@bar2.com",
			"senha": "12345"
		}
	},
	{
		"numero": 3,
		"saldo": 800,
		"usuario": {
			"nome": "Foo Bar 3",
			"cpf": "00011122256",
			"data_nascimento": "2021-03-15",
			"telefone": "71999998888",
			"email": "foo123@bar2.com",
			"senha": "123456"
		}
	}
]
  

## Abrir uma nova conta



       {
               "nome": "Foo Bar 3",
               "cpf": "00011122256",
               "data_nascimento": "2021-03-15",
               "telefone": "71999998888",
               "email": "foo1236@bar2.com",
               "senha": "123458"
      }



## Atualizar dados Cadastrais

        {
		"nome": "Foo Bar 3",
		"cpf": "00011122256",
		"data_nascimento": "2021-03-15",
		"telefone": "71999998888",
		"email": "foo123@bar2.com",
		"senha": "12345"
	}



      
## Depositar em uma conta


    {
         "numero_conta": "1",
         "valor": 100
   }
    

## Sacar de uma conta



     {
     
         "numero_conta": "1",
         "valor": 500,
         "senha": "senha123"
    }

## Transferir entre contas

     {

         "numero_conta_origem": "1",
         "numero_conta_destino": "2",
         "valor": 3000,
         "senha": "senha123"
    }


## Verificar saldo

    {
	"mensagem": " saldo da conta : 200"
    }


## Obter extrato

       {
	"depositos": [
		{
			"data": "29/09/2023, 14:29:33",
			"numero_conta": "1",
			"valor": 500
		},
		{
			"data": "02/10/2023, 19:23:51",
			"numero_conta": "1",
			"valor": 500
		}
	],
	"saques": [
		{
			"data": "29/09/2023, 14:29:45",
			"numero_conta": "1",
			"valor": 100
		}
	],
	"transferenciasEnviadas": [
		{
			"data": "29/09/2023, 14:33:40",
			"numero_conta_origem": "1",
			"numero_conta_destino": "2",
			"valor": 100
		}
	],
	"transferenciasRecebidas": [
		{
			"data": "29/09/2023, 14:33:57",
			"numero_conta_origem": "2",
			"numero_conta_destino": "1",
			"valor": 100
		},
		{
			"data": "29/09/2023, 19:16:39",
			"numero_conta_origem": "2",
			"numero_conta_destino": "1",
			"valor": 100
		},
		{
			"data": "29/09/2023, 19:16:45",
			"numero_conta_origem": "3",
			"numero_conta_destino": "1",
			"valor": 100
		},
		{
			"data": "02/10/2023, 19:24:23",
			"numero_conta_origem": "3",
			"numero_conta_destino": "1",
			"valor": 100
		}
	]
    }


## Contribuição
Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

# API de Contas Bancárias

Esta é uma API de contas bancárias  permite realizar operações bancárias , como abrir contas, excluir contas, depositar, sacar, transferir, verificar saldo e obter extrato de contas bancárias.

## Rotas Disponíveis

GET /contas - Lista todas as contas bancárias existentes.

POST /contas/abrir - Abre uma nova conta bancária.

DELETE /contas/excluir/:numeroConta - Exclui uma conta bancária com base no número da conta.

POST /contas/depositar - Realiza um depósito em uma conta bancária.

POST /contas/sacar - Realiza um saque de uma conta bancária.

POST /contas/transferir - Realiza uma transferência entre contas bancárias.

GET /contas/saldo - Retorna o saldo de uma conta bancária.

GET /contas/extrato - Lista as transações realizadas em uma conta bancária.

## Configuração
Certifique-se de ter o Node.js instalado em seu ambiente.

Clone este repositório em sua máquina local.

Navegue até o diretório do projeto:

Instale as dependências:

npm install

Inicie o servidor:


## Uso
Você pode usar uma ferramenta como o insomnia para testar as rotas da API. Aqui estão alguns exemplos de como usar as rotas:

## Abrir uma nova conta
Rota: POST /contas/abrir

Corpo da Solicitação:


       {

           "nome": "Nome do Cliente",
             "cpf": "123.456.789-00",
               "data_nascimento": "01/01/1990",
                 "telefone": "(11) 99999-9999",
                    "email": "cliente@email.com",
                       "senha": "senha123"

      }

## Depositar em uma conta
Rota: POST /contas/depositar

Corpo da Solicitação:

  
     {
  
      "numero_conta": "1",
        "valor": 100.0
	
    }
    

## Sacar de uma conta
Rota: POST /contas/sacar

Corpo da Solicitação:


     {
     
         "numero_conta": "1",
           "valor": 500,
             "senha": "senha123"
    }

## Transferir entre contas

Rota: POST /contas/transferir


     {

          "numero_conta_origem": "1",
            "numero_conta_destino": "2",
              "valor": 3000,
                "senha": "senha123"
    }


## Verificar saldo
Rota: GET /contas/saldo?numero_conta=123&senha=senha123

## Obter extrato
Rota: GET /contas/extrato?numero_conta=123&senha=senha123


## Contribuição
Contribuições são bem-vindas! Se você encontrar problemas ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

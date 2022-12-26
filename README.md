### Documentation build

# Como rodar o projeto?

Para iniciar o projeto basta entrar no projeto e rodar o comando "docker-compose up"

url base: localhost:3333

Para cadastrar um usuario

  Post localhost:3333/users
    example:
    {
        "username": "example"
        "password": "Password1"
    }

Realizar o Login

  Post  localhost:3333/login

    example:
    {
        "username": "example"
        "password": "Password1"
    }

Acessar o balance do usuario logado


    GET  localhost:3333/users/balance - H "Authorization : Bearer {TOKEN}"

Realizar uma transação

    Post localhost:3333/users/transactions

    {
        "username": "example"
        "balance": 25
    }
    e passar no o bearer token no header
Visualizar todas as transações

    Get localhost:3333/users/transactions
    e passar no o bearer token no header

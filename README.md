# SCHOOL-PREADSHEET-BACKEND

Este é o projeto de uma API que controla o cadastro de estudantes e usuários, permitindo operações de cadastro de alunos, edição e exclusão, conforme a necessidade do usuário.

## Hospedagem

O servidor foi hospedado em duas instancia diferentes para testes: 
  - Na **AWS**, utilizando o EC2 e o protocolo http, facilitando a comunicação com o [frontend](http://school-spreadsheet-front.s3-website-sa-east-1.amazonaws.com/sign-in) também hospedado na aws usando o S3. 

  - Também foi hospedado na plataforma **Render**, utilizando o protocolo https, que permite a conexão com o [frontend](https://school-spreadsheet-front.vercel.app/home) hospedado na plataforma vercel. 

> *Obs: O servidor hospedado na plataforma Render entra em hibernação após determinado período de inatividade, devido à isso, pode apresentar bastante lentidão no primeiro acesso. Preferível testar usando o link da AWS* 


> *Obs2: Ambos os bancos foram populados com dados fictícios para facilitação dos testes e visualização das funcionalidades criadas*

Credenciais para conectar no servidor aws (protocolo http): 
  ```bash
  http://18.231.155.115:5000
  ```

Credenciais para conectar na render (protocolo https): 
  ```bash
  https://school-spreadsheet-backend.onrender.com
  ```


## Funcionalidades

### Rotas de autenticação
1. Criação de novo usuário: 
    - rota utilizada: post("/sign-up")
    - Para cadastro de usuário, é necessário enviar um objeto válido, contendo as informações de email, senha e confirmação de senha. 
    - É feita validação para verificar se os dados estão de acordo com o formato designado, utilizando o a biblioteca de validação do **Joi** . 
    - Logo após, é feito validação para verificar se o email do usuário já existe. 
    - Se estiver tudo certo, os dados serão tratados, para padronização do banco de dados. 
    - A senha é guardada de forma criptografada, utilizando a biblioteca de criptografia **bcript** 

2. Login de usuário: 
    - rota utilizada: post("/sign-in")
    - Para login de usuário, é necessário enviar um objeto válido, contendo as informações de email e senha. 
    - É feita validação para verificar se os dados estão de acordo com o formato designado, utilizando o a biblioteca de validação do **Joi** . 
    - Logo após, é feito uma busca no banco de dados para validar se o email existe e se a senha criptografada confere com a recebida. 
    - Se estiver tudo certo, o usuário recebe seu token de acesso, criado através do **jsonwebtoken**, juntamente com seu id de usuário. 
    - É o token é salvo no banco de dados, para validações de credenciais. 
    - O token é excluído após 15 minutos, sendo necessário fazer login novamente. 

### Rotas de estudantes 
  Em todas as todas relacionadas aos estudantes, é feito validação de token. Caso o token esteja expirado, todas as ações de leitura, escrita, edição e remoção ficam bloqueadas, retornando um erro para o usuário.

1. Buscar a quantidade de estudantes estudantes: 
    - Rota utilizada: get("/students/count").
    - Ela retorna a quantidade de estudantes armazenados na tabela. 
    - É possível filtrar o resultado, utilizando querys, retornando apenas a quantidade de estudantes que correspondam aos critérios do filtro. 

2. Buscar estudantes.
    - Rota utilizada: get("/students")
    - Ela retorna os dados dos estudantes armazenados na tabela. 
    - Retorna apenas de 10 em 10, utilizando querys para especificar a página.
    - É possível filtrar o resultado, utilizando querys, retornando apenas os estudantes que correspondam aos critérios do filtro. 

3. Adicionar estudante
    - Rota utilizada: post("/students") 
    - Valida se os dados foram enviados corretamente através do **joi**
    - Padroniza os dados recebidos para serem salvos no banco de dados
    - Salva no banco. 

4. Editar estudante
    - Rota utilizada: put("/students") 
    - Valida se os dados foram enviados corretamente através do **joi**
    - Padroniza os dados recebidos para serem salvos no banco de dados
    - Faz o update no banco, tendo como parâmetro o id do estudante (recebido pelo frontend). 


5. Deletar estudante
    - Rota utilizada: delete("/students/:id").
    - Recebe o id através de um param da url.
    - deleta o estudante do banco. 


## Bibliotecas utilizadas 
- node
- express
- jsonwebtoken 
- joi 
- dotenv 
- cors 
- bcrytp 


# INSTALAÇÃO

## Pré-requisitos 

1. Ter o postgres instalado
2. Ter o node v22.13.1

## Instalação local


1. Clone do repositório: 

  ```bash
  git clone https://github.com/FelipeMedeiros99/school-spreadsheet-backend.git
  ```


2. Instale as dependências necessárias:

  ```bash 
  npm install 
  ```

3. Inserir o arquivo .env, (enviado por email)

4. Iniciar o prisma:

  ```bash
  npx prisma migrate dev 
  ```

  ```bash
  npx prisma generate 
  ```

5. Se desejar preencher o banco com dados fictícios, pode rodar o comando abaixo (Opcional): 

  ```bash 
  npm rum seed
  ``` 



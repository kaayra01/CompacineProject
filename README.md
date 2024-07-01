# Desafio - Projeto Compacine

- Repositório utilizada para desenvolver o projeto Compacine, proposto como desafio para a etapa 2 de backend do projeto Fast Track.
- O projeto apresenta as funcionalidades de cadastro, edição, listagem e exclusão de filmes, sessões e ingressos, além da compra de ingressos:
<img src="./image/model.png">

## API
- A API Compacine possui 3 rotas principais para realizarmos o CRUD de filmes, sessões e ingressos:
    - /movies
    - /sessions
    - /tickets
- As funcionalidades de cada rota são configuradas pelos controllers e routes, permitindo a alteração dos dados de acordo com as regras de negócios.

## Instalação
- *Atenção!* É necessário ter o NodeJS instalado.
- Para iniciar é necessário realizar o `git clone` do projeto e entrar no seu editor de código favorito;
- Dentro do editor, abra o terminal e rode o comando `npm install` ou `npm i` para instalar as dependências do projeto;
- Criar o arquivo "mongodb.env" na raíz do projeto com os dados: 
```shell
MONGO_INITDB_ROOT_USERNAME: admin
MONGO_INITDB_ROOT_PASSWORD: admin
```
- Criar o arquivo "mongo-express.env" na raíz do projeto com os dados:
```shell
ME_CONFIG_MONGODB_URL: mongodb://127.0.0.1:27017/compacine
ME_CONFIG_MONGODB_ADMINUSERNAME: admin
ME_CONFIG_MONGODB_ADMINPASSWORD: admin
ME_CONFIG_BASICAUTH_USERNAME: guest
ME_CONFIG_BASICAUTH_PASSWORD: guest
```
- Com os arquivos env configurados, agora basta rodar o comando `docker-compose up -d`.

## Execução
- Com as instalações e configurações feitas com sucesso, é possível rodar o projeto com o comando `npm run start`;
- Quando pronto, o terminal apresentará as informações "Servidor rodando na porta 3000" e "Banco de dados conectado com sucesso", então a aplicação poderá ser acessada em `http://localhost:3000/`.

## Tecnologias
- JavaScript, HTML e CSS

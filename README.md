# Pet Bem
## Requisitos
- mysql
- nodejs
- docker
- bootstrap
### Banco de dados
#### Script para a criação do banco
- /db/CreateDatabase.sql (copiado no Dockerfile)
#### Comandos para configurar o banco de dados: 
1. build da imagem: ```docker build -t petbem .```
2. executar a imagem: ```docker run -it -p 3306 -d petbem```


### Desenvolvimento
Executar os comandos 
- ```npm install ```
- ```npm run serve```
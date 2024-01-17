# Derivando da imagem oficial do MySQL
FROM mysql:latest

# Adicionando os scripts SQL para serem executados na criação do banco
COPY ./db/ /docker-entrypoint-initdb.d/
ENV MYSQL_ROOT_PASSWORD "petbem24"
ENV MYSQL_DATABASE "PetBem"
ENV TZ "America/Sao_Paulo"


const app = require('./api/server')
const express = require("express");

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
console.log(__dirname)
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static( 'node_modules/jquery/dist'))
app.use('/js', express.static( 'node_modules/jquery-ajax'))
app.use('/assets', express.static( 'public/assets'))


app.listen(3000, () => {
    console.log('Aplicação em execução na porta 3000!');
});


const app = require('./api/server')
const express = require("express");
const fs = require('fs');

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))
app.use('/js', express.static('node_modules/jquery/dist'))
app.use('/js', express.static('node_modules/jquery-ajax'))
app.use('/js', express.static('node_modules/moment/locale'))
app.use('/js', express.static('node_modules/moment'))
app.use('/js', express.static('node_modules/jquery-mask-plugin/dist'))
app.use('/assets', express.static('static/assets'))

const listEndpoints = require('express-list-endpoints');
let endpoints = listEndpoints(app);
console.debug("\nEndpoints\n");
console.debug(endpoints.filter(e => {
    if (e.path.includes("api")) return true;
}).map(e => {
    return e.path;
}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, async function () {
    console.log(`Aplicação em execução na porta ${PORT}!`);
});





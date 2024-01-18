const path = require("path");


module.exports = function (app) {
    const userCtrl = app.controllers.user;





    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });



    app.get('/inicio', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'inicio.html'));
    });

    app.get('/diario', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'diario.html'));
    });

    app.get('/vacinas', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'vacinas.html'));
    });

    app.get('/consultas', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'consultas.html'));
    });

    app.get('/tratamentos', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'tratamentos.html'));
    });

    app.get('/exames', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'exames.html'));
    });

    app.get('/cadastrar_pet', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'cadastrar_pet.html'));
    });

    app.get('/novo', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public', 'cadastrar_usuario.html'));
    });
}
const path = require("path");


module.exports = function (app) {
    const userCtrl = app.controllers.user;
    const security = app.security.JWT




    app.get('/', function getPageLogin(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });

    app.get('/inicio', function getPageInicio(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'inicio.html'));
    });

    app.get('/diario', function getPageDiario(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'diario.html'));
    });

    app.get('/vacinas', function getPageVacinas(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'vacinas.html'));
    });

    app.get('/consultas', function getPageConsultas(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'consultas.html'));
    });

    app.get('/tratamentos', function getPageTratamentos(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'tratamentos.html'));
    });

    app.get('/exames', function getPageExames(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'exames.html'));
    });

    app.get('/cadastrar_pet', function getPageCadastrarPet(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'cadastrar_pet.html'));
    });


    app.get('/novo', function getPageNovoUsuario(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'cadastrar_usuario.html'));
    });
}
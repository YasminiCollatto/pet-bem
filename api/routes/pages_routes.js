const path = require("path");


module.exports = function (app) {
    app.get('/', function getPageLogin(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'index.html'));
    });

    app.get('/inicio', function getPageInicio(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'inicio.html'));
    });

    app.get('/diario', function getPageDiario(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'diario.html'));
    });

    app.get('/gerenciar_diario', function getPageDiario(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'gerenciar_diario.html'));
    });

    app.get('/vacinas', function getPageVacinas(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'vacinas.html'));
    });

    app.all('/consultas', function getPageConsultas(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'consultas.html'));
    });

    app.all('/gerenciar_consulta', function getPageConsultas(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'gerenciar_consulta.html'));
    });

    app.get('/tratamentos', function getPageTratamentos(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'tratamentos.html'));
    });

    app.get('/gerenciar_tratamento', function getPageTratamentos(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'gerenciar_tratamento.html'));
    });

    app.get('/exames', function getPageExames(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'exames.html'));
    });

    app.get('/gerenciar_exame', function getPageExames(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'gerenciar_exame.html'));
    });

    app.get('/gerenciar_pet', function getPageCadastrarPet(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'gerenciar_pet.html'));
    });


    app.get('/novo', function getPageNovoUsuario(req, res) {
        res.sendFile(path.join(__dirname, '../../public', 'cadastrar_usuario.html'));
    });
}
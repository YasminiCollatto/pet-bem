module.exports = function (app) {
    const path = require("path");
    app.get('/', function getPageLogin(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'index.html'));
    });

    app.get('/inicio', function getPageInicio(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'inicio.html'));
    });

    app.get('/diario', function getPageDiario(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'diario.html'));
    });

    app.get('/gerenciar_diario', function getPageDiario(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_diario.html'));
    });

    app.get('/vacinas', function getPageVacinas(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'vacinas.html'));
    });

    app.get('/gerenciar_vacina', function getPageVacinas(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_vacina.html'));
    });

    app.get('/consultas', function getPageConsultas(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'consultas.html'));
    });

    app.get('/gerenciar_consulta', function getPageConsultas(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_consulta.html'));
    });

    app.get('/tratamentos', function getPageTratamentos(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'tratamentos.html'));
    });

    app.get('/gerenciar_tratamento', function getPageTratamentos(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_tratamento.html'));
    });

    app.get('/exames', function getPageExames(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'exames.html'));
    });

    app.get('/gerenciar_exame', function getPageExames(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_exame.html'));
    });

    app.get('/gerenciar_pet', function getPageCadastrarPet(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'gerenciar_pet.html'));
    });


    app.get('/novo', function getPageNovoUsuario(req, res) {
        res.sendFile(path.join(__dirname, '../../static', 'cadastrar_usuario.html'));
    });
}
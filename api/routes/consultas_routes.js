module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const consultaCtrl = app.controllers.consultas;

    app.route(`${config.prefix}/consultas`)
        .post(security.verifyJWT, async function registro(req, res) {
        await consultaCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function listar(req, res){
        await consultaCtrl.list(req, res)
    });

    app.route(`${config.prefix}/consultas/:id`)
        .get(security.verifyJWT, async function getConsulta(req, res) {
        await consultaCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function update(req, res){
        await consultaCtrl.update(req, res)
    })
        .delete(security.verifyJWT, async function remove(req, res) {
        await consultaCtrl.remove(req, res);
    });
}
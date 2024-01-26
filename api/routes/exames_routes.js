module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const examesCtrl = app.controllers.exames;

    app.route(`${config.prefix}/exames`)
        .post(security.verifyJWT, async function create(req, res) {
        await examesCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function list(req, res){
        await examesCtrl.list(req, res)
    });

    app.route(`${config.prefix}/exames/:id`)
        .get(security.verifyJWT, async function get(req, res) {
        await examesCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function update(req, res){
        await examesCtrl.update(req, res)
    })
        .delete(security.verifyJWT, async function remove(req, res) {
        await examesCtrl.remove(req, res);
    });
}
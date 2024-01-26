module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const diarioCtrl = app.controllers.diario;

    app.route(`${config.prefix}/diario`)
        .post(security.verifyJWT, async function create(req, res) {
        await diarioCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function list(req, res){
        await diarioCtrl.list(req, res)
    });

    app.route(`${config.prefix}/diario/:id`)
        .get(security.verifyJWT, async function get(req, res) {
        await diarioCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function update(req, res){
        await diarioCtrl.update(req, res)
    })
        .delete(security.verifyJWT, async function remove(req, res) {
        await diarioCtrl.remove(req, res);
    });
}
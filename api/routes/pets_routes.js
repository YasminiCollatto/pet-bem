module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const ctrl = app.controllers.pets;

    app.route(`${config.prefix}/pets`)
        .post(security.verifyJWT, async function create(req, res) {
            await ctrl.create(req, res)
        })
        .get(security.verifyJWT, async function list(req, res) {
            await ctrl.list(req, res)
        });

    app.route(`${config.prefix}/pets/:id`)
        .get(security.verifyJWT, async function get(req, res) {
            await ctrl.get(req, res);
        })
        .put(security.verifyJWT, async function update(req, res) {
            await ctrl.update(req, res)
        })
        .delete(security.verifyJWT, async function remove(req, res) {
            await ctrl.remove(req, res);
        });

    app.route(`${config.prefix}/racas/:tipo`)
        .get(security.verifyJWT, async function list(req, res) {
            await ctrl.listRacas(req, res);
        })
}
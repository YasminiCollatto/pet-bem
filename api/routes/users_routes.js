module.exports = function (app) {
    const config = app.config.vars;
    const userCtrl = app.controllers.users
    const security = app.security.JWT

    app.route(`${config.prefix}/users`)
        .get(security.verifyJWT, async function get(req, res) {
            await userCtrl.get(req, res);
        })
        .post(async function create(req, res) {
            await userCtrl.create(req, res);
        });

    app.post(`${config.prefix}/login`, async function login(req, res) {
        await userCtrl.login(req, res);
    });

    app.route(`${config.prefix}/users/:email`)
        .put(security.verifyJWT, async function update(req, res) {
            await userCtrl.update(req, res);
        })
        .delete(security.verifyJWT, async function remove(req, res) {
            await userCtrl.remove(req, res)
        });
}
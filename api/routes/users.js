module.exports = function (app) {
    const config = app.config.vars;
    const userCtrl = app.controllers.user
    const security = app.security.JWT

    app.post(`${config.prefix}/user`, async function createUser(req, res) {
        await userCtrl.create(req, res);
    });

    app.post(`${config.prefix}/login`, async function login(req, res) {
        await userCtrl.login(req,res);
    });

    app.route(`${config.prefix}/user/:email`)
        .get(security.verifyJWT, async function getUser(req, res) {
        await userCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function updateUser(req, res) {
        await userCtrl.update(req, res);
    })
        .delete(security.verifyJWT, async function removeUser(req, res) {
        await userCtrl.remove(req, res)
    });
}
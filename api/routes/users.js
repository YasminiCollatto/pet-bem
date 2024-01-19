module.exports = function (app) {
    const config = app.config.vars;
    const userCtrl = app.controllers.user
    const security = app.security.JWT

    app.post(`${config.prefix}/user`, async (req, res) => {
        await userCtrl.create(req, res);
    });

    app.post(`${config.prefix}/login`, async (req, res) => {
        console.log(1)
        await userCtrl.login(req,res);
    });

    app.get(`${config.prefix}/user/:email`, security.verifyJWT, async (req, res) => {
        await userCtrl.get(req, res);
    });

    app.put(`${config.prefix}/user/:email`, security.verifyJWT, async (req, res) => {
        await userCtrl.update(req, res);
    });

    app.delete(`${config.prefix}/user/:email`, security.verifyJWT, async (req, res) => {
        await userCtrl.remove(req, res)
    });
}
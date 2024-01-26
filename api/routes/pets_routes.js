const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const petCtrl = app.controllers.pets;

    app.route(`${config.prefix}/pets`)
        .post(security.verifyJWT, async function create(req, res) {
        await petCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function list(req, res){
        await petCtrl.list(req, res)
    });

    app.route(`${config.prefix}/pets/:id`)
        .get(security.verifyJWT, async function get(req, res) {
        await petCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function update(req, res){
        await petCtrl.update(req, res)
    })
        .delete(security.verifyJWT, async function remove(req, res) {
        await petCtrl.remove(req, res);
    });

    app.route(`${config.prefix}/racas/:tipo`)
        .get(security.verifyJWT, async function list(req, res) {
            await petCtrl.listRacas(req, res);
        })
}
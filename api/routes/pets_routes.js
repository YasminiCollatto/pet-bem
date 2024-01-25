const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const petCtrl = app.controllers.pets;

    app.route(`${config.prefix}/pets`)
        .post(security.verifyJWT, async function createPet(req, res) {
        await petCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function listAllPets(req, res){
        await petCtrl.list(req, res)
    });

    app.route(`${config.prefix}/pets/:id`)
        .get(security.verifyJWT, async function getPet(req, res) {
        await petCtrl.get(req, res);
    })
        .put(security.verifyJWT, async function updatePet(req, res){
        await petCtrl.update(req, res)
    })
        .delete(security.verifyJWT, async function removePet(req, res) {
        await petCtrl.remove(req, res);
    });

    app.route(`${config.prefix}/racas/:tipo`)
        .get(security.verifyJWT, async function listRacas(req, res) {
            await petCtrl.listRacas(req, res);
        })
}
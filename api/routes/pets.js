const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = function (app) {
    const security = app.security.JWT
    const config = app.config.vars

    const petCtrl = app.controllers.pet;

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    app.route(`${config.prefix}/pets`)
        .post(security.verifyJWT, async function createPet(req, res) {
        await petCtrl.create(req, res)
    })
        .get(security.verifyJWT, async function listAllPets(req, res){
        await petCtrl.list(req, res)
    });

    app.route(`${config.prefix}/pets/:id`)
        .get(security.verifyJWT, async function getPet(req, res) {
        await petCtrl.get(req, res)
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
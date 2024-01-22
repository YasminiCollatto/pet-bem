/** @namespace application.app.interfaces.response**/

const utf8 = require("utf8");
module.exports = function (app) {
    const utf8 = require('utf8');
    const isJson = (str) => {
        try{
            JSON.parse(str);
        }catch (e){
            //Error
            //JSON is not okay
            return false;
        }

        return true;
    }

    return {
        success: (res, data = {data: true}) => {
            if (isJson(data)){
                let formatData = JSON.parse(utf8.decode(JSON.stringify(data)))
                res.status(200).json(formatData)
            } else {
                res.status(200).send(data)
            }
        },
        error: (res, data = false) => {
            if (isJson(data)){
                let formatData = JSON.parse(utf8.decode(JSON.stringify(data)))
                res.status(500).json(formatData)
            } else {
                res.status(500).send(data)
            }
        },
        forbidden: (res, data = false) => {
            if (isJson(data)){
                let formatData = JSON.parse(utf8.decode(JSON.stringify(data)))
                res.status(403).json(formatData)
            } else {
                res.status(403).send(data)
            }
        },

    }
}
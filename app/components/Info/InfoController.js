const Model = require("./Model");

module.exports = class InfoController {
    constructor() {
        this.model = new Model();
    }

    async main(call, callback) {
            let info = await this.model.retrieve(call.request.id);
            if (info) callback(null, {status: true, msg: JSON.stringify(info)});
            else callback(null, {status: false, msg: 'user not found'})
    }
};
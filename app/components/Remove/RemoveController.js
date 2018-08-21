const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class EditController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    async main(call, callback) {
        let response = await this.model.remove(call.request.id);
        if (response) return callback(null, {status: true});
        else return callback(null, {status: false});
    }
};
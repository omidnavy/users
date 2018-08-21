const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class ForgetPasswordChangeController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    async main(call, callback) {
            let response = await this.model.forget(call.request.id, call.request.token, call.request.password);
            if (response.status === 'error') callback(null, {status: false, msg: response.error});
            else callback(null, response)
    }
};
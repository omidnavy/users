const BaseController = require("../../core/BaseController");
const Model = require("./RegisterModel");

module.exports = class RegisterClientController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.register(call.request);
            if (response.status === 'error') callback(null, {status: false, msg: response.error});
            else callback(null, {status: true, msg: response.id})
        })()
    }
};
const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class ForgetPasswordRequestController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.forgetRequest(call.request.mode, call.request.value);
            if (response.status === 'error') callback(null, {status: false, msg: response.error});
            else callback(null, response)
        })()
    }
};
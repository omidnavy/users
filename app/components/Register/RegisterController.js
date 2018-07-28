const BaseController = require("../../core/BaseController");
const Model = require("./RegisterModel");

module.exports = class RegisterController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.register(call.request);
            if (isNaN(response)) callback(null, {status: false, msg: response});
            else callback(null, {status: true, msg: response})
        })()


    }
};
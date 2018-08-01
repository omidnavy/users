const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class ChangePasswordController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.edit(call.request._id,call.request.oldPassword,call.request.newPassword);
            if (response.status === 'error') callback(null, {status: false, msg: response.error});
            else callback(null, {status: true, msg: response.id})
        })()
    }
};
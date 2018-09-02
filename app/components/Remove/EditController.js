const BaseController = require("../../core/BaseController");
const Model = require("./EditModel");

module.exports = class EditController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.edit(call.request.type, call.request._id, JSON.parse(call.request.user));
            if (response.status === 'error') callback(null, {status: false, msg: response.error});
            else callback(null, {status: true, msg: response.id})
        })()
    }
};
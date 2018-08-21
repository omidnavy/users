const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class EditController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    main(call, callback) {
        (async () => {
            let response = await this.model.activate(call.request.id,call.request.status);
            if (response) return callback(null, {status: true});
            else return callback(null, {status: false});

        })()
    }
};
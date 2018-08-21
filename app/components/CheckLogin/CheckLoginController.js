/*
Controllers may extends the "BaseController" or not , depends on you and your system.
Model initialize in constructor of Controller
"main" functions is your gateway ! you have to declare it with call and callback parameters.
 */

const BaseController = require("../../core/BaseController");
const Model = require("./Model");

module.exports = class CheckLoginController extends BaseController {
    constructor() {
        super();
        this.model = new Model();
    }

    async main(call, callback) {
            let items = await this.model.retrieve(call.request.username, call.request.password);
            if (items) callback(null, {status: true, user: items});
            else callback(null,{status:false})
    }
};
/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');

module.exports = class SayHelloModel extends DatabaseModel {

    constructor() {
        super();
    }

    async retrieve(phone, password) {
        try {
            return await this.db.users.findOne({Phone: phone, Password: password});
        }
        catch (e) {
            logger('error',e);
            return null
        }

    }
};


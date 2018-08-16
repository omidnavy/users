const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');

module.exports = class SayHelloModel extends DatabaseModel {

    constructor() {
        super();
    }

    async retrieve(id) {
        try {
            return await this.db.users.findOne({_id: mongo.ObjectId(id)});
        }
        catch (e) {
            logger('error', e);
            return null
        }

    }
};


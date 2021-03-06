/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class EditModel extends DatabaseModel {

    constructor() {
        super();
    }

    async remove(user) {
        try {
            let result = await this.db.users.remove({_id: mongo.ObjectId(user)});
            return result.ok === 1 && result.deletedCount === 1;
        }
        catch (e) {
            logger('error', e);
            return false
        }
    }


};


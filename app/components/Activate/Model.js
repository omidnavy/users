/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class EditModel extends DatabaseModel {

    constructor() {
        super();
    }

    async activate(user, status) {
        try {
            let result = await this.db.users.update({_id: mongo.ObjectId(user)}, {$set: {Status: +status}});
            return (result.n === 1 && result.nModified === 1 && result.ok === 1);
        }
        catch (e) {
            logger('error', e);
            return false
        }
    }


};


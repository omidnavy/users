/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class Model extends DatabaseModel {

    constructor() {
        super();
    }

    async forget(id, token, password) {
        try {
            let request = await this.redis.getAsync(`forget-${id}`);
            if (!request) return ({status: 'error', error: 'token-not-exists'});
            if (request.toString() !== token.toString()) return ({status: 'error', error: 'wrong-token'});
            let additionalInfo = {
                modifiedDate: +new Date()
            };
            let result = await this.db.users.update({
                _id: mongo.ObjectId(id)
            }, {$set: {...{Password: password}, ...additionalInfo}});
            if (result.n === 1 && result.nModified === 1 && result.ok === 1) return {status: true};
            return {status: 'error', error: 'can not update'}

        }
        catch (e) {
            logger('error',e)
        }
    }


};


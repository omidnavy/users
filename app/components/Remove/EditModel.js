/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class EditModel extends DatabaseModel {

    constructor() {
        super();
    }

    async edit(type, id, user) {
        let PhoneCheckResult = await this.doesPhoneExists(user.Phone);
        if (PhoneCheckResult && PhoneCheckResult._id.toString() !== id.toString()) return ({
            status: 'error',
            error: 'phone exists'
        });

        let additionalInfo = {
            modifiedDate: +new Date()
        };
        try {
            let result = await this.db.users.update({_id: mongo.ObjectId(id)}, {$set: {...user, ...additionalInfo}});
            if (result.n === 1 && result.nModified === 1 && result.ok === 1) {
                return {status: 'success', id: result._id}
            }
            return {status: 'error', error: 'can not update'}
        }
        catch (e) {
            logger('error', e)
        }
    }


};


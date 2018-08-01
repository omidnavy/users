/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class Model extends DatabaseModel {

    constructor() {
        super();
    }

    async edit(id, oldPassword, newPassword) {
        let additionalInfo = {
            modifiedDate: +new Date()
        };
        try {
            let user = await this.db.users.findOne({_id: mongo.ObjectId(id)});
            if (!user) return ({status: 'error', error: 'bad-user'});

            if (!user || user.Password !== oldPassword) return ({status: 'error', error: 'wrong-password'});

            let result = await this.db.users.update({
                _id: mongo.ObjectId(id)
            }, {$set: {...{Password: newPassword}, ...additionalInfo}});
            if (result.n === 1 && result.nModified === 1 && result.ok === 1) {
                return {status: 'success', id: result._id}
            }
            return {status:'error',error:'can not update'}
        }
        catch (e) {
            console.log(e)
        }
    }


};


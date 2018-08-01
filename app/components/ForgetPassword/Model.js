/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class Model extends DatabaseModel {

    constructor() {
        super();
    }

    async forgetRequest(user) {
        try {
            let user = await this.db.users.findOne({$or:[{Phone:user},{Email:user}]});
            if (!user) return ({status: 'error', error: 'bad-user'});

            this.redis.setex("omid",10,"navy",()=>{
                this.redis.get("omid",(e,r)=>{
                    console.log(r)
                });
            });

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


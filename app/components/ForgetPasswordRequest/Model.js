/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */
const mongo = require('mongodb');
const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class Model extends DatabaseModel {

    constructor() {
        super();
    }

    generateRandomNumber() {
        return (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    }

    async forgetRequest(mode, value) {
        try {
            let user = await this.db.users.findOne({[mode]: value});
            if (!user) return ({status: 'error', error: 'not-found'});
            //Check if there is no token submitted for this user in redis.
            if (await this.redis.getAsync(`forget-${user._id}`)) return ({status: 'error', error: 'token-exists'});
            let token = this.generateRandomNumber();
            await this.redis.setexAsync(`forget-${user._id}`, 180, token);
            console.log(token)
            return ({status: true, msg: token, phone: user.Phone, id: user._id})
        }
        catch (e) {
            console.log(e)
        }
    }


};


/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');
const Client = require('./clientDAL');
const Translator = require('./translatorDAL');
module.exports = class RegisterModel extends DatabaseModel {

    constructor() {
        super();
    }

    async register(type, user) {
        if (await this.doesPhoneExists(user.Phone)) return ({status: 'error', error: 'phone exists'});
        if (type === 'client') user = Client.prepare(user);
        else if (type === 'translator') user = Translator.prepare(user);
        try {
            let result = await this.db.users.insert(user);
            if (result._id) return {status: 'success', id: result._id};
            else return {status: 'error', error: 'can not insert'}
        }
        catch (e) {
            console.log(e)
        }
    }

};


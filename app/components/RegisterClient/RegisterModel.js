/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {

    constructor() {
        super();
    }

    async register(user) {
        if (await this.doesPhoneExists(user.Phone)) return ({status: 'error', error: 'phone exists'});

        let additionalInfo = {
            registeredDate: +new Date(),
            status: 1
        };
        try {
            let result = await this.insertUser({...user, ...additionalInfo}, {Role: 'client'}, {});
            if (result._id) {
                return {status: 'success', id: result._id}
            }
            return {status:'error',error:'can not insert'}
        }
        catch (e) {
            console.log(e)
        }
    }

};


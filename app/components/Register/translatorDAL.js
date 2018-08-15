const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {
    static prepare(user) {
        let basicInfo = {
            Email     : user.Email ,
            Phone     : user.Phone ,
            Password  : user.Password ,
            Firstname : user.Firstname ,
            Lastname  : user.Lastname
        };
        let additionalInfo = {
            Role:'translator',
            registeredDate: +new Date(),
            Status: 0
        };
        let RoleInfo = {
            
        }
        return {...user,...additionalInfo}
    }

};


/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');

module.exports = class SayHelloModel extends DatabaseModel {

    constructor() {
        super();
    }

    async retrieve(username, password) {
        let result;
        try {
            result = await this.query('SELECT ID,Role,RoleID,Firstname,Lastname,Email,Phone FROM Users WHERE (Username = ? AND Password = ?) OR (Phone = ? AND Password = ?) OR (Email = ? AND Password = ?) ', [username, password, username, password, username, password]);
            if (result.length < 1) result = false;
            else result = result[0]
        }
        catch (e) {
            result = false;
        }
        return (result);
    }
};


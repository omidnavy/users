/*
Models may extends the "BaseModel" ,"BaseDBModel" or nothing , depends on you and your system.
 */

const DatabaseModel = require('../../core/BaseDBModel');
module.exports = class RegisterModel extends DatabaseModel {

    constructor() {
        super();
    }

    async register(user) {
        let isValid = await this.validateUser(user);
        if (isValid !== true) {
            return (isValid)
        }

        let result;
        try {
            result = await this.query('INSERT INTO users SET ?', user);
            if (result) {
                return result.insertId
            }
            else return 'error'
        }
        catch (e) {
            return e;
        }
    }

    async validateUser(user) {
        if (this.isValidPhone(user.Phone)) {

            if (await this.doesPhoneExists(user.Phone)){
                return 'phone exists'
            }

            if (this.isValidPassword((user.Password))) {
                return true
            }
            else return 'password'
        }
        return 'phone';
    }

    isValidPhone(phone) {
        return (!!phone.match(/^[0][9][0-9]{9}$/));
    }

    isValidPassword(password) {
        return ((password.length >= 4))
    }

    async doesPhoneExists(phone) {
        let result = await this.query('SELECT ID FROM users WHERE Phone = ?', [phone]);
        return (result.length > 0)
    }
};


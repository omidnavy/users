/*
Simple MYSQL DB Class using pools and basic query function.
you can extend this class as you need or change it to another DB
 */


const redis = require('redis');
const client = redis.createClient({host: "192.168.0.7"});
client.on('connect', () => console.log('redis connected\n'));
client.on('error', (e) => logger('error', e));


const mongojs = require('mongoist');
const url = "mongodb://192.168.0.7:27017/users";
const config = require('./config/database').development;
const BaseModel = require('./BaseModel');

const db = mongojs(url, {useNewUrlParser: true});
const onConnectionError = (e) => {
    logger('error', e);
};
db.on('error', onConnectionError);

db.on('connect', function () {
    console.log('database connected')
});
// db.dropDatabase()
(async () => {
    try {
        await db.createCollection('users', {autoIndexId: true});
    }
    catch (e) {
        if (e.codeName !== 'NamespaceExists') logger('error', e)
    }
    try {
        await db.users.createIndex({Phone: 1}, {unique: true})
    }
    catch (e) {
        logger('error', e)
    }
})();


module.exports = class BaseDBModel extends BaseModel {
    constructor() {
        super();
        this.db = db;
        this.redis = client;
    }

    insertUser(user, role, RoleInfo) {
        return this.db.users.insert({...user, ...role, RoleInfo})
    }

    async doesPhoneExists(phone) {
        return (await this.db.users.findOne({Phone: phone}))
    }

};
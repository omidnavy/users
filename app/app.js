require('./helpers/helpers.js');
const routes = require('./core/RouteMapper');
new routes();


const redis = require('redis');
const client = redis.createClient({host: "192.168.0.7"});
client.on('connect', () => console.log('redis connected\n'));
client.on('error', (e) => logger('error', e));

client.setex("omid",10,"navy",()=>{
    client.get("omid",(e,r)=>{
        console.log(r)
        setTimeout(()=>{
            client.get("omid",(e,r)=>console.log(r))
        },11000)
    });

});
const sql=require('mysql');
const conn=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bluefox"
});
module.exports=conn;
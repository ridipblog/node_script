const mysql=require('mysql');
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_sql"
});
module.exports=conn;
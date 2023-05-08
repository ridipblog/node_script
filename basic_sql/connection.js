var mysql=require('mysql');
var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_sql"
});
module.exports=conn;
const express=require('express');
const app=express();
const mysql=require('mysql');
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bluefox"
})
conn.connect();
app.get('/show_image',(req,res)=>{
    sql="SELECT * FROM images WHERE id=1";
    conn.query(sql,(err,result)=>{
        console.log(result[0].image_data);
    })
})
module.exports=app;
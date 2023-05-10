const express=require('express');
const app=express();
const conn=require('./config.js');
conn.connect((err)=>{
    if(err){
        console.log("Connection Error");
    }
    else{
        console.log("Connected !");
    }
})
app.get('/set',async(req,res)=>{
    var data=['name 2','pass 2','city 2'];
    var dataEncoded=JSON.stringify(data);
    var sql="INSERT INTO data(name,email)VALUES(?,?)";
    conn.query(sql,[dataEncoded,'code2@gmail.com'],(err)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send("Inserted !");
        }
    })
});
app.get('/get',async(req,res)=>{
    var sql="SELECT * FROM data";
    conn.query(sql,(err,result)=>{
        result.forEach((row)=>{
            console.log(row['email']);
            var data=JSON.parse(row['name']);
            data.forEach((value)=>{
                console.log(value)
            })
        })
        res.end();
    })
})
app.listen(3000);
const express=require('express');
const app=express();
const hbs=require('hbs');
app.set('view engine','hbs');
app.set('views','./view');
app.use(express.static(__dirname+'/public'));
const conn=require('./connection');
conn.connect((err)=>{
    console.log("Connected ");
});
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/view',async(req,res)=>{
    var data={};
    var sql="SELECT * FROM data";
    conn.query(sql,(err,result)=>{
        if(err){
            res.send("Error");
        }
        else{
            console.log(result[0]['name']);
            res.send("Data Viewd ");
        }
    });
})
app.get('/add',async(req,res)=>{
    var sql="INSERT INTO data(name,email)VALUES (?,?)";
    conn.query(sql,['coder 3','password 3'],(err)=>{
        if(err){
            res.send("Error");
        }
        else{
            res.send("Data Added !");
        }
    });
})
app.get('/update',async(req,res)=>{
    var sql="UPDATE data SET email=? WHERE name=?";
    conn.query(sql,['coder1@gmail.com','coder 1'],(err)=>{
        if(err){
            res.send("Error");
        }
        else{
            res.send("Update Data");
        }
    });
});
app.get('/delete',async(req,res)=>{
    var sql="DELETE FROM data WHERE email=?";
    conn.query(sql,['coder2@gmail.com'],(err)=>{
        if(err){
            res.send("Error");
        }
        else{
            res.send("Delete Data");
        }
    });
})
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Running");
    }
});
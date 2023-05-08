const express=require('express');
const app=express();
const hbs=require('hbs');
const bodyParser=require('body-parser');
const multer=require('multer');
const path=require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set("views",'./view');
app.set('view engine','hbs');
const conn=require('./connection.js');
const show_image=require('./show_image');
app.use('/',show_image);
conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected");
    }
});
var storage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'./public/images/')
    },
    filename:(req,file,callBack)=>{
        callBack(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
var upload=multer({
    storage:storage
})
app.post("/",upload.single('image'),(req,res)=>{
    if(!req.file){
        console.log("File Not Found");
    }
    else{
        console.log(req.file.filename);
        var imgsrc=req.file.filename;
        var insertData="INSERT INTO images(image)VALUES(?)";
        conn.query(insertData,[imgsrc],(err,result)=>{
            if(err){
                res.send("Error");
            }
            else{
                res.render("index");
            }
        })
    }
})
app.get('/show',async(req,res)=>{
    var sql="SELECT * FROM images";
    res.send("Send");
})
app.get('/',async(req,res)=>{
    sql="SELECT * FROM images WHERE id=1";
    conn.query(sql,(err,result)=>{
        res.render('index',{
            data:[
                req.query.name,
                'images/image-1683393578415.png'
            ]
        })
    })
})
app.get('/image',(req,res)=>{
    res.send('images/image-1683393578415');
})
app.listen(3000,(err)=>{
    if(err){
        console.log("Error");
    }
    else{
        console.log("Server Connected ");
    }
});
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const hbs=require('hbs');
const multer=require('multer');
const path=require('path');
app.use(express.static('./public'));
app.set('views','./view');
app.set('view engine','hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const conn=require('./connection');
conn.connect((err)=>{
    console.log("Connected");
});
const upload=multer({storage:multer.memoryStorage()});
app.get('/',async(req,res)=>{
    const sql="SELECT * FROM images";
    conn.query(sql,(err,result)=>{
        if(err){
            res.render('index',{
                data:[
                    "Error"
                ]
            });
        }
        else{
            const id=5;
            const img_data=Buffer.from(result[id].image_data).toString('base64');
            const img_type=result[id].image_type;
            const img_format=`data:${img_type};base64,${img_data}`;
            res.render('index',{
                data:[
                    result[id].image_name,
                    img_format
                ]
            })
        }
    });
});
app.get('/upload',async(req,res)=>{
    res.render('upload');

});
app.post('/upload',upload.single('image'),async(req,res)=>{
    const image=req.file;
    const sql="INSERT INTO images(image_name,image_type,image_data)VALUES(?,?,?)";
    conn.query(sql,['image 7',image.mimetype,image.buffer],(err)=>{
        if(err){
            res.redirect("/upload");
        }
        else{
            res.render('upload',{
                data:[
                    "Done"
                ]
            })
        }
    })
});
app.listen(3000);
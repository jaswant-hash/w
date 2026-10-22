const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');

const app=express();
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"",
     database:'sample'
})

db.connect((err)=>{
    if(err) return console.log("not connected");

    console.log("connected");
})


app.get("/",(req,res)=>{
    db.query("select * from sample",(err,result)=>{
        if(err){
            return res.json({
                message:"cant fetch"
            })
        }
        res.json(result);
    })
})

app.get("/data/:id",(req,res)=>{
    db.query("select * from sample where id =?",[req.params.id],(err,result)=>{
        if(err){
            return res.json({
                message:"error while fetch"
            })
        }
        res.json(result);
    })
})
app.post("/register",(req,res)=>{
    const{name,email,age}=req.body;
    db.query("insert into sample (name,email,age)values(?,?,?)",[name,email,age],(err)=>{
         if(err){
            return res.json({
                message:"cant add"
            })
        }
        res.json({message:"added"});
    })
})

app.put("/update/:id",(req,res)=>{
    const {name,email,age}=req.body;

    db.query('update sample set name=?,email=?,age=? where id=?',[name,email,age,req.params.id],(err,result)=>{
         if(err){
            return res.json({
                message:"cant update"
            })
        }
        res.json(result);
    })
})

app.delete("/delete/:id",(req,res)=>{
    db.query("Delete from sample where id=?",[req.params.id],(err)=>{
         if(err){
            return res.json({
                message:"cant delete"
            })
        }
        res.json({
            message:"deleted"
        })
    })
})

app.listen(3000);






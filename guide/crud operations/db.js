const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/");

const student=mongoose.model('samplee',{
    name:String,
    email:String,
    age:Number
});

app.get('/',async(req,res)=>{
    res.json(await student.find());
});

// GET by ID
app.get("/data/:id", async (req, res) => {
    res.json(await student.findById(req.params.id));
});

app.post('/add',async(req,res)=>{
    await student.create(req.body);
    res.send("added");
})

app.put('/update/:id',async(req,res)=>{
    res.json(await student.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
    }))
})

app.delete('/delete/:id',async(req,res)=>{
    await student.findByIdAndDelete(req.params.id);
    res.send("deleted");
})

app.listen(3000);





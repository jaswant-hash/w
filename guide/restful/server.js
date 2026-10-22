
const express = require('express');
const app = express();
app.use(express.json());

let students = [{id:1, name:"Arun"}];

// GET all
app.get('/students', (req,res) => res.json(students));

// GET by ID
app.get('/students/:id', (req,res) => {
    let s = students.find(x => x.id == req.params.id);
    res.json(s);
});

// POST
app.post('/students', (req,res) => {
    students.push(req.body);
    res.send("Added");
});

// PUT
app.put('/students/:id', (req,res) => {
    let s = students.find(x => x.id == req.params.id);
    if(s) s.name = req.body.name;
    res.send("Updated");
});

// DELETE
app.delete('/students/:id', (req,res) => {
    students = students.filter(x => x.id != req.params.id);
    res.send("Deleted");   
});

app.listen(3000, () => console.log("Server started"));

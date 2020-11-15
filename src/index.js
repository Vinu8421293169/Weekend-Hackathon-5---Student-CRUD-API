const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const students=require('./InitialData.js');
// your code goes here

app.get('/api/student',(req,res)=>{
   res.send(students);
});


app.get('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const student=students.filter((stu)=>stu.id===parseInt(id));
    if(!student){
        res.status(404).send('id is invalid');
    }else
    res.send(student);
});

app.post('/api/student',(req,res)=>{
    const name=req.body.name;
    const currentClass=req.body.currentClass;
    const division=req.body.division;

    if(name && currentClass && division){
        students.push({id:students.length+1,name,currentClass,division});
        res.send(students);
    }else{
        res.status(400).send("invalid request");
    }
});

app.put('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const findStudent=students.find((stu)=>stu.id===parseInt(id));
    
    if(findStudent){
        const student=students.filter((stu)=>stu.id===parseInt(id));

        res.set('Content-Type', 'application/x-www-form-urlencoded');
        student.name=req.body.name;
        student.currentClass=parseInt(req.body.currentClass);
        student.division=req.body.division;
        res.send(students);
    }else{
        res.status(400).send("invalid id not found");
    }
});

app.delete('/api/student/:id',(req,res)=>{
    const id=req.params.id;

    const findStudent=students.find((stu)=>stu.id===parseInt(id));

    if(findStudent){
        const filteredStudents=students.filter((stu)=>stu.id!==parseInt(id));
        students=filteredStudents;
        res.send(students);
    }else{
        res.status(400).send('id not found');
    }
});



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;

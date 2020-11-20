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
    const student=students.find((stu)=>stu.id===parseInt(id));
    
    if(findStudent){
        res.status(200).send(student);
    }else{
        res.status(404).send('id is invalid');
    }
});

app.post('/api/student',(req,res)=>{

res.set({'Content-Type': 'application/x-www-form-urlencoded'});
    
if(body.name && body.currentClass && body.division){
        const student={id:students.length+1,...body};
        students.push(student);
        res.send({id:student.id});
    }else{
        res.status(400).send("invalid request");
    }
    
});

app.put('/api/student/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    
    const studentIndex=students.findIndex((stu)=>stu.id===id);

    res.set({'Content-Type': 'application/x-www-form-urlencoded'});

    
    if(student!==-1 && body.name && body.currentClass && body.division){
        students[studentIndex]={id,...body};
        res.send(students[studentIndex]);
    }else{
        res.status(400).send("invalid request");
    }

});

app.delete('/api/student/:id',(req,res)=>{
    const id=parseInt(req.params.id);

    const findStudent=students.find((stu)=>stu.id===id);

    if(findStudent){
        const filteredStudents=students.filter((stu)=>stu.id!==id);
        students=filteredStudents;
        res.send({id});
    }else{
        res.status(404).send('id not found');
    }
});



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;

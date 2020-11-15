const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const students=require('InitialData.js');

app.get('/api/student',()=>{
   res.send(students);
});


app.get('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const student=students.filter((stu)=>stu.id===id);
    if(!student){
        res.status(404).send('id is invalid');
    }else
    res.send(student);
});

app.post('/api/student',(req,res)=>{
    const name=req.body.name;
    const currentClass=req.body.currentClass;
    const division=req.body.division;
    if(!name || !currentClass || !division){
        res.status(400).send("invalid request");
    }else{
        students.push({id=students.length+1,...body});
    }
});

app.put('/api/student',(req,res)=>{
    res.set('Content-Type', 'application/x-www-form-urlencoded');
})

app.delete('/api/student',(req,res)=>{
    const id=req.body.id;

    const findStudent=students.find((stu)=>{
        stu.id===id;
    });
    if(!findStudent){
        res.status(400)
    }else{
        const filteredStudents=students.filter((stu)=>{
            stu.id!==id;
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;

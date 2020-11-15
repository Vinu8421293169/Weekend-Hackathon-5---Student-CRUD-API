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


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;

const express=require('express');
const path=require('path');
const mysql=require('mysql');
const ejs=require('ejs');
const bodyParser=require('body-parser');

//DataBase Connection
const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node-crud'
});
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Database Connected!');
    }
});

const app=express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Routes
app.get('/', (req,res)=>{
    let sql="SELECT * FROM students";
    let query=connection.query(sql, (err,rows)=>{
        if(err) throw err;
        res.render('index',{
            students:rows
        });
    });
})
//Add Students
app.post('/save', (req,res)=>{
    let sql="INSERT INTO `students`(`name`, `age`, `fatherName`, `motherName`, `address`) VALUES ('"+req.body.name+"','"+req.body.age+"','"+req.body.fatherName+"','"+req.body.motherName+"','"+req.body.address+"')";
    let query=connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});
//Edit Students 
app.get('/edit/:studentId', (req,res)=>{
    const studentId=req.params.studentId;
    let sql=`SELECT * FROM students WHERE id=${studentId}`;
    let query=connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.render('edit',{
            students:result[0]
        }); 
    });
});

//update students
app.post('/update' , (req , res)=>{
   const studentId=req.body.id;
   let sql ="update students SET name='"+req.body.name+"', age='"+req.body.age+"', fatherName='"+req.body.fatherName+"', motherName='"+req.body.motherName+"', address='"+req.body.address+"' where id="+studentId;
    let query=connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});
//Delete students
app.get('/delete/:studentId', (req, res)=>{
    const studentId=req.params.studentId;
    let sql=`DELETE from students where id=${studentId}`;
    let query=connection.query(sql,(err,results)=>{
        if(err) throw err;
        res.redirect('/');
    })
})

app.listen(3000,()=>{
    console.log("Server is Running at Port 3000!");
})

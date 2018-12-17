const express = require("express");
const fs= require("fs");
const hbs = require("hbs");
const app = express()
const port = process.env.PORT||3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
 var now = new Date().toString();
 var log = `${now}:${req.method}:${req.url}`;
 fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
    console.log("Unable to process");
    }
 });
 console.log(log);
 next();
})
app.use((req,res)=>{
    res.render('maintenance.hbs');
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        title:'Welcome',
        year:new Date().getFullYear(),
        head:'Welcome to my page'
    })
})
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'help',
        head:'help page',
        year:new Date().getFullYear()
    });
})
app.listen(port,()=>console.log(`Example app listening on port ${port}`));
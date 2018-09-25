let express=require('express');
let app=express();
let cookieParser=require('cookie-parser')
let bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());

app.get('/hello',(req,res)=>{
    res.send("helloworld");
})

app.listen(8010,()=>{console.log("running on http://localhost:8010")});

module.exports=app;

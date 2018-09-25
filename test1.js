
let express=require('express');
let app=express();
let cookieParser=require('cookie-parser')
let bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());


let cloud=require('./cloudWatchSample2')

let url;
let count=0;
let data=JSON.stringify({url:count});

app.get('/hello',(req,res)=>{
    count++;
    res.send("helloworld");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;
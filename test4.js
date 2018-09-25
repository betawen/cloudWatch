
let express=require('express');
let app=express();
let cookieParser=require('cookie-parser')
let bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());


let watch3=require('./cloudWatchSample3')
let watch4=require('./cloudWatchSample4')

let url;
let count=0;

app.get('/hello',(req,res)=>{
    watch3.putMetricData(req.originalUrl,1);
    res.send("helloworld\n");
})

app.post('./post',(req,res)=>{
    watch4.putMetricData(req.originalUrl,1,req.header('Client_Version'),req.header('Client_Name'));
    res.send("ok");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;

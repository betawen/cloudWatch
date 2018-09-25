
let express=require('express');
let app=express();
let cookieParser=require('cookie-parser')
let bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());


let watch=require('./cloudWatchSample2')
let cloud=require('./cloudWatchSample1')

let url;
let count=0;
let data={url:count};
cloud.putMetricData(count);
watch.putMetricData({url:count})

app.get('/hello',(req,res)=>{
    count++;
url=req.url;
watch.putMetricData({req.originUrl:count})

    res.send("helloworld\n");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;

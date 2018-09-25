
let express=require('express');
let app=express();
let cookieParser=require('cookie-parser')
let bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());


let watch3=require('./cloudWatchSample3')
let watch2=require('./cloudWatchSample2')
let watch1=require('./cloudWatchSample1')

let url;
let count=0;
let data={url:count};
watch1.putMetricData(count);
watch2.putMetricData({url:count})

app.get('/hello',(req,res)=>{
    watch3.putMetricData(req.originalUrl,count);
    count++;
    url=req.url;
    watch1.putMetricData(count);
    watch2.putMetricData({url:count})

    res.send("helloworld\n");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;

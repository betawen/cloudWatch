
let express=require('express');
let app=express();

let watch3=require('./cloudWatchSample3')
let watch4=require('./cloudWatchSample4')

app.get('/hello',(req,res)=>{
    watch3.putMetricData(req.originalUrl,1);
    res.send("helloworld\n");
})

app.get('/dimension',(req,res)=>{
    watch4.putMetricData(req.originalUrl,1,"3.3","beta");
    res.send("ok");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;

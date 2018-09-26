
let express=require('express');
let app=express();

let watch3=require('./cloudWatchSample3')

app.get('/hello',(req,res)=>{
    watch3.putMetricData(req.originalUrl,1);
    res.send("helloworld\n");
})

app.listen(8009,()=>{console.log("running on http://localhost:8009")});

module.exports=app;

let cloud=require('./cloudWatchSample2')

let url;
let count=0;
let data=JSON.stringify({url:count});

app.get('/hello',(req,res)=>{
    count++;
    res.send("helloworld");
})
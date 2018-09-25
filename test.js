let cloudWatch=require("./cloudWatch/cloudWatchSample2")

let md5=require('md5')
let logger=require('winston').loggers.get('AuthorizationException');


function checkAccessKey(req,res,next){
    let url=req.originUrl;
    let count=0;

    let watch=JOSN.stringify({url:count});
    cloudWatch.putMetricData(watch);

    if( 'GET' === req.method && req.originUrl && req.originUrl.includes('/hello')){
        count++;
    }
}

module.exports = checkAccessKey;
let AWS=require('aws-sdk');
AWS.config.update({region:'us-east-1'});

let cloudWatch;

function putMetricData(name,value,dimension1,dimension2){
    if(typeof value==='undefined' || typeof name === 'undefined' || !Number.isInteger(value) || value<0){
        console.log("Invailed params.");
    }
    if(!cloudWatch){
        cloudWatch=new AWS.CloudWatch();
    }
    console.log("Params vailed");

    let params={
        MetricData:[{
            MetricName:name,
            Timestamp:new Date,
            Value:value,
            Dimensions:[
                {
                    Name:"Client_Version",
                    Value:Client_Version
                },
                {
                    Name:"Client_Name",
                    Value:Client_Name
                }
            ]
        }],
        Namespace:'user-count'
    };
    return new Promise((resolve,reject)=>{
        params.MetricData[0].Value=value;
        params.MetricData[0].Timestamp=new Date();
        for([key,value] of Object.entries(dimension1)){
            params.MetricData[0].Dimensions[0].Name= key;
            params.MetricData[0].Dimensions[0].Value= value;
        }
        for([key,value] of Object.entries(dimension2)){
            params.MetricData[0].Dimensions[1].Name= key;
            params.MetricData[0].Dimensions[1].Value= value;
        }

        cloudWatch.putMetricData(params,(err,data)=>{
            if(err){
                console.log("Error: sending metrics to cloudWatch");
                console.log(err,err.stack);
                reject(err.stack);
            }else{
                console.log("Sending metrics to cloudWatch successfully! ");
                console.log(data);
                resolve(data);
            }
        });
    });
}

exports.putMetricData=putMetricData;

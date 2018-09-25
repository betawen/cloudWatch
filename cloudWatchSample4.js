let AWS=require('aws-sdk');
AWS.config.update({region:'us-east-1'});

let cloudWatch;

function putMetricData(name,value,Client_Version,Client_Name){
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
            Dimensions:{Client_Version=Client_Version,Client_Name=Client_Name}
        }],
        NameSpace:'user-count'
    };

    return new Promise((resolve,reject)=>{
        params.MetricData[0].Value=value;
        params.MetricData[0].Timestamp=new Date();
        params.MetricData[0].Dimensions={Client_Version=Client_Version,Client_Name=Client_Name};

        cloudWatch.putMetricData(params,(err,data)=>{
            if(err){
                console.log("Error: sending metrics to cloudWatch");
                console.log(err,err.stack);
                console.log(err.stack);
            }else{
                console.log("Sending metrics to cloudWatch successfully! ");
                console.log(data);
                resolve(data);
            }
        });
    });
}

exports.putMetricData=putMetricData;
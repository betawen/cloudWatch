const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
let cloudWatch;


function setParams(key,value){
    return params={
        MetricData:[{
            MetricName:key,
            Timestamp:new Date,
            Value:value
        }],
        Namespace:'user-count'
    }
}

function putMetricData(data){
    for(let [key,value] of Object.entries(data)){
        if(typeof data ==='undefined' || !Number.isInteger(value) || value<0){
            console.log("Invaild params: ",JSON.stringify(data));
        }
        if(!cloudWatch){
            cloudWatch= new AWS.CloudWatch();
        }

        console.log("Invoke real object!");

        let params = setParams(key,value);

        return new Promise((resolve,reject)=>{
            params.MetricData[0].value= value;
            params.MetricData[0].Timestamp=new Date();

            cloudWatch.putMetricData(params,(err,data)=>{
                if(err){
                    console.log("Error: sending metrics to cloudWatch");
                    console.log(err,err.stack);
                    reject(err.stack);
                }else{
                    console.log("Sending metrics to cloudWatch successfully");
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }
};

exports.putMetricData=putMetricData;



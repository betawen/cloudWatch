const AWS = require('aws-sdk');

const logger = require('./dummy_game_event_data');

AWS.config.update({region:'us-east-1'});

let cloudWatch;

let params = {
    MetricData:[{
        MetricName:'UserCount',
        Timestamp: new Date,
        Value :10
    }],
    Namespace:'user-count'
};

function putMetricData(count){
    if (typeof count === 'undefined' || !Number.isInteger(count)|| count<0){
        console.log('Parameter count is invailid : ${count}');
    }
    if (!cloudWatch){
        cloudWatch = new AWS.CloudWatch();
    }

    console.log('invoke real objest!');
    return new Promise((resolve,reject)=>{
        params.MetricData[0].Value = count;
        params.MetricData[0].Timestamp = new Date();

        cloudWatch.putMetricData(params,(err,data)=>{
            if(err){
                console.log('Error:sending metrics to cloudWatch');
                console.log(err,err.stack);
                reject(err.stack);
            }else{
                console.log('Sending metric to cloudWatch successfully');
                console.log(data);
                resolve(data);
            }
        });
    });
};

exports.putMetricData = putMetricData;
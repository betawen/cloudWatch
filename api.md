//definitions

watchWithHeader{
    putMetricData((string)name,(Integer)value,(string)Client_Version,(string)Client_Name);
    exports.putMetricData=putMetricData
}

watchWithoutHeader{
    putMetricData((string)name,(Integer)value);
    exports.putMetricData=putMetricData
}

watchWithChangingHeader{
    putMetricData((string)name,(Integer)value,(object)dimension1,(object)dimension2);
    exports.putMetricData=putMetricData
}
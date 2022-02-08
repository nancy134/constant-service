const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const syncCCContact = process.env.AWS_SQS_SPARK_SYNC_CONTACT_TO_CC

const { Consumer } = require('sqs-consumer');
const constantService = require('./constant');

exports.handleSQSMessage = function(message){
    var json = JSON.parse(message.Body);
    var json2 = JSON.parse(json.Message);
    var queryStr = "?email="+json2.email;

    var accessToken = json2.token;
    console.log(accessToken);
    
    constantService.getContacts(accessToken, queryStr).then(function(contacts){
        console.log(contacts);
    }).catch(function(err){
        console.log(err);
    });

}

exports.sqsApp = Consumer.create({
    queueUrl: syncCCContact,
    handleMessage: module.exports.handleSQSMessage,
    sqs: new AWS.SQS()
});

exports.handleError = function(err){
    console.log(err);
}

module.exports.sqsApp.on('error', (err) => {
    module.exports.handleError(err);
});


module.exports.sqsApp.start()
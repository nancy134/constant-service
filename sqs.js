const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const syncCCContact = process.env.AWS_SQS_SPARK_SYNC_CONTACT_TO_CC

const { Consumer } = require('sqs-consumer');
const constantService = require('./constant');

exports.handleSQSMessage = function(message){
    var json = JSON.parse(message.Body);
    var json2 = JSON.parse(json.Message);
    var queryStr = "email="+json2.email;

    var accessToken = json2.token;

    constantService.getContacts(accessToken, queryStr).then(function(contacts){
        if (contacts.contacts.length > 0){
        } else {
            console.log("Create Account");
            var contact =
            {
                email_address: {
                    address : json2.email
                },
                first: json2.first,
                last : json2.last,
                create_source: "Account",
                custom_fields: 
                {
                    custom_field_id: "9b3ca464-333f-11ec-834b-fa163e2743c5",
                    value: json2.sparkId
                }
            };

            console.log(contact);
        }
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

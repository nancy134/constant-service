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
            var first = contacts.contacts[0].first_name;
            var last = contacts.contacts[0].last_name;

            var id = contacts.contacts[0].contact_id;

            var body = contacts.contacts[0];
            body.update_source = "Account";

            if (!first && json2.first) body.first_name = json2.first;
            if (!last && json2.last) body.last_name = json2.last;

            constantService.updateContact(accessToken, id, body).then(function(contact){
                console.log(json2.email + " successfully updated");
            }).catch(function(err){
                console.log(err);
            });

        } else {
            //console.log("Create Account");
            var contact =
            {
                email_address: {
                    address : json2.email
                },
                first_name: json2.first,
                last_name : json2.last,
                create_source: "Account",

                custom_fields: [
                    {
                        custom_field_id: json2.customFieldId,
                        value: json2.sparkId
                    }]
            };
            //console.log(contact);
            constantService.createContact(json2.token, contact).then(function(newContact){
                //console.log(newContact);
            }).catch(function(err){
                //console.log(err);
            });
        }
    }).catch(function(err){
        //console.log(err);
    });
}

exports.sqsApp = Consumer.create({
    queueUrl: syncCCContact,
    handleMessage: module.exports.handleSQSMessage,
    sqs: new AWS.SQS()
});

exports.handleError = function(err){
    //console.log(err);
}

module.exports.sqsApp.on('error', (err) => {
    module.exports.handleError(err);
});


module.exports.sqsApp.start()

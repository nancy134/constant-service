const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./jwt');
const ccService = require('./constant');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
const utilities = require('./utilities');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("constant-service");
});

app.put('/cc/emails/:campaignId', (req, res) => {
    ccService.updateCampaign(req.params.campaignId, req.body).then(function(campaign){
        res.json(campaign);
    }).catch(function(err){
        console.log(err);
        res.status(400).json(err);
    });
});

app.post('/cc/emails', (req, res) => {
    ccService.createCampaign(req.body).then(function(campaign){
        res.json(campaign);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/cc/tokenInfo', (req, res) => {
    ccService.tokenInfo(req.body).then(function(info){
        res.json(info);
    }).catch(function(err){
        res.status(400).json(err);
    });
});


app.get('/account', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getAccount(accessToken).then(function(account){
        res.json(account);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/contact_lists', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContactLists(accessToken).then(function(contactLists){
        res.json(contactLists);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/emails', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getEmails(accessToken).then(function(emails){
        res.json(emails);
    }).catch(function(err){
        res.status(400).json(err);
    });
});


app.get('/contacts', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContacts(accessToken).then(function(contacts){
        res.json(contacts);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/contacts/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContact(accessToken, req.params.id).then(function(contact){
        res.json(contact);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/emails/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getEmail(accessToken, req.params.id).then(function(email){
        res.json(email);
    }).catch(function(err){
        res.status(400).json(err);
    });
});


app.get('/contact_lists/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContactList(accessToken, req.params.id).then(function(contactList){
        res.json(contactList);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/contacts', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.createContact(accessToken, req.body).then(function(contact){
        res.json(contact);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.put('/contacts/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.updateContact(accessToken, req.params.id, req.body).then(function(contact){
        res.json(contact);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/contacts/sign_up_form', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.signupContact(accessToken, req.body).then(function(contact){
        res.json(contact);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/contact_lists', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.createContactList(accessToken, req.body).then(function(contactList){
        res.json(contactList);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/contact_custom_fields', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.createContactCustomField(accessToken, req.body).then(function(customField){
        res.json(customField);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/contact_custom_fields', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContactCustomFields(accessToken).then(function(customFields){
        res.json(customFields);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/contact_tags', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContactTags(accessToken).then(function(contactTags){
        res.json(contactTags);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.post('/contact_tags', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    console.log(req.body);
    ccService.createContactTag(accessToken, req.body).then(function(contact){
    //ccService.createContact(accessToken, req.body).then(function(contact){
        res.json(contact);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.get('/contact_tags/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.getContactTag(accessToken, req.params.id).then(function(tag){
        res.json(tag);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.put('/contact_tags/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.updateContactTag(accessToken, req.params.id, req.body).then(function(tag){
        res.json(tag);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.delete('/contact_tags/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.deleteContactTag(accessToken, req.params.id).then(function(tag){
        res.json(tag);
    }).catch(function(err){
        res.status(400).json(err);
    });
});

app.delete('/contacts/:id', (req, res) => {
    var accessToken = utilities.getAccessToken(req);
    ccService.deleteContact(accessToken, req.params.id).then(function(tag){
        res.json(tag);
    }).catch(function(err){
        res.status(400).json(err);
    });
});


app.listen(PORT, HOST);

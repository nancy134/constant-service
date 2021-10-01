const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('./jwt');
const ccService = require('./constant');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
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

app.listen(PORT, HOST);

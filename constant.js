const axios = require('axios');
const utilities = require('./utilities');

exports.getCampaign = function(accessToken, campaignId){
    return new Promise(function(resolve, reject){
        var url = "https://api.cc.email/v3/emails/" + campaignId;
        var headers = utilities.createHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}

exports.updateCampaign = function(campaignId, body){
    return new Promise(function(resolve, reject){
        exports.getCampaign(body.accessToken, campaignId).then(function(campaign){
            var activityId = null;
            for (var i=0; i<campaign.campaign_activities.length; i++){
                if (campaign.campaign_activities[i].role === 'primary_email'){
                    var activityId = campaign.campaign_activities[i].campaign_activity_id;
                }
            }
            exports.getActivity(body.accessToken, activityId).then(function(activity){
                delete activity["campaign_activity_id"];
                delete activity["campaign_id"];
                activity.from_email = body.email_campaign_activities[0].from_email;
                activity.from_name = body.email_campaign_activities[0].from_name;
                activity.html_content = body.email_campaign_activities[0].html_content;
                activity.reply_to_email = body.email_campaign_activities[0].reply_to_email;
                activity.subject = body.email_campaign_activities[0].subject;
                exports.updateActivity(body.accessToken, activityId, activity).then(function(updatedActivity){
                    resolve(updatedActivity);
                }).catch(function(err){
                    reject(err);
                });
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
            reject(err);
        });
    });
}

exports.getActivity = function(accessToken, activityId){
    return new Promise(function(resolve, reject){
        var url = "https://api.cc.email/v3/emails/activities/" + activityId + "?include=html_content";
        var headers = utilities.createHeaders(accessToken);
        var options = {
            url: url,
            method: 'GET',
            headers: headers
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}

exports.updateActivity = function(accessToken, activityId, body){
    return new Promise(function(resolve, reject){
        var url = "https://api.cc.email/v3/emails/activities/" + activityId;
        var headers = utilities.createHeaders(accessToken);
        var options = {
            url: url,
            method: 'PUT',
            data: body,
            headers: headers
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        }); 
    });
}

exports.createCampaign = function(body){
    return new Promise(function(resolve, reject){
        url = "https://api.cc.email/v3/emails";
        var headers = utilities.createHeaders(body.accessToken);
        var options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: body
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}

exports.tokenInfo = function(body){
    return new Promise(function(resolve, reject){
        var url = "https://api.cc.email/v3/token_info";
        var headers = utilities.createHeaders(body.token);
        var options = {
            url: url,
            method: 'POST',
            headers: headers,
            data: body
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(utilities.processAxiosError(err));
        });
    });
}


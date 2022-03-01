exports.processAxiosError = function(error){
    if (error.response){
        return(error.response.data);
    } else if (error.request){
        return(error.request);
    } else {
        return(error.message);
    }
}

exports.createHeaders = function(accessToken){
    var bearerToken = "Bearer " + accessToken;
    var headers = {
        "Authorization" : bearerToken
    };
    return headers;
}

exports.getAccessToken = function(req){
    var authorization = req.get("Authorization");

    if (authorization){
        var array = authorization.split(" ");
        var token = array[1];
        return token;
    } else {
        return "noAuthorizationHeader";
    }
}

exports.createConstantContactData = function(body, json2){
    body.update_source = "Account";

    if (!body.first_name && json2.first){
        body.first_name = json2.first;
    }
    if (!body.last_name && json2.last){
       body.last_name = json2.last;
    }
    
    if (isPhone(body, "home")){
        console.log("found home phone");
    }
    
    if (isAddress(body, "home")){
        console.log("found home address");
    }
    return body;


}

exports.isPhone = function(c, kind){
    var p = c.phone_numbers;
    var isFound = false;
    for (var i=0; i<p.length; i++){
        if (p[i].kind === kind) isFound = true;
    }
    return isFound;
}

exports.isAddress = function(c, kind){
    var a = c.street_addresses;
    var isFound = false;
    for (var i=0; i<a.length; i++){
        if (a[i].kind === kind) isFound = true;
    }
    return isFound;
}


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


    
    if (!isPhone(body, "home") && json2.phone_home){
        if (!body.phone_numbers) body.phone_numbers = [];
        body.phone_numbers.push({phone: json2.phone_home, kind: "home"});
    }

    if (!isPhone(body, "work") && json2.phone_work){
        if (!body.phone_numbers) body.phone_numbers = [];
        body.phone_numbers.push({phone: json2.phone_work, kind: "work"});
    }

    if (!isPhone(body, "mobile") && json2.mobile_mobile){
        if (!body.phone_numbers) body.phone_numbers = [];
        body.phone_numbers.push({phone: json2.phone_mobile, kind: "mobile"});
    }

    if (!isPhone(body, "other") && json2.mobile_other){
        if (!body.phone_numbers) body.phone_numbers = [];
        body.phone_numbers.push({phone: json2.phone_other, kind: "other"});
    }


    
    if (!isAddress(body, "home")){
        if (!body.street_addresses) body.street_address = [];
        body.street_addresses.push({
            kind: "home",
            street: json2.address_home_street,
            city: json2.address_home_city,
            state: json2.address_home_state,
            postal_code: json2.address_home_zip,
        });
    }

    if (!isAddress(body, "work")){
        if (!body.street_addresses) body.street_address = [];
        body.street_addresses.push({
            kind: "work",
            street: json2.address_work_street,
            city: json2.address_work_city,
            state: json2.address_work_state,
            postal_code: json2.address_work_zip,
        });
    }

    if (!isAddress(body, "other")){
        if (!body.street_addresses) body.street_address = [];
        body.street_addresses.push({
            kind: "other",
            street: json2.address_other_street,
            city: json2.address_other_city,
            state: json2.address_other_state,
            postal_code: json2.address_other_zip,
        });
    }


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


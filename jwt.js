exports.getAuthParams = function(req){
    var authParms = {};
    var authorization = req.get("Authorization");
    var array = authorization.split(" ");
    var AuthToken = array[1];

    authParams = {
        AuthToken: AuthToken
    };
    return authParams;
}


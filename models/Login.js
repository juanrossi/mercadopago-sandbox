module.exports = function (app) {

    var LoginModel = {

        isLogged: function (req, res, next) {

            if(typeof req.session.credentials != 'undefined'){
                console.log(req.session.credentials);
                next();
                return true;
            }else{
                res.redirect("/");
                return false;
            }


            // continua a requisição caso esteja ok
            next();
        },

        // gera session
        generateSession: function (req, credentials){
            req.session.credentials = credentials;
            return req.session.credentials;
        },

        generateSessionByAccessToken: function(req, access_token){
            var Login = this;
            var split_access_token = access_token.split("-");

            if(split_access_token[0] != 'TEST'){
                return {"error": "access_token_not_test"}
            }

            return Login.generateSession(req, {access_token: access_token});
            
        },

        // deleta session
        destroy: function(req){
            req.session = null;
            return req.session;
        }

    };

    return LoginModel;
};
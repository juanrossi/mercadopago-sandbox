module.exports = function (app) {

    var MercadoPago = app.models.MercadoPago;
    var Login = app.models.Login;
    
    var MercadoPagoController = {
        
        getCode: function(req, res) {
        	var code = req.query.code;

			MercadoPago.get_credentials(code, function(error, resp){
				//envia req e a resposta para gravar a sessao
				Login.generateSession(req, resp);
                res.redirect("/collector/payments");
        	});
		},

        byAccessToken: function(req, res) {
            var access_token = req.query.access_token;
            
            //envia req e a resposta para gravar a sessao
            var login = Login.generateSessionByAccessToken(req, access_token);

            if(login.error != undefined){
                res.redirect("/?error=access_token_test");
            }else{
                res.redirect("/collector/payments");    
            }

            
        },

        logout: function(req, res) {
            Login.destroy(req);
            res.redirect("/");
        }
    };

    return MercadoPagoController;
};
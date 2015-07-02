module.exports = function (app) {

	var client_id = "2364998264727646"
	var access_token_ll_sandbox = "TEST-2364998264727646-061816-e8643010cdb84e4ff8bcd54101b891f5__LC_LB__-95095923"
	var public_key_sandbox = "TEST-6eff9791-0b45-47a7-a39b-3b1100ca023f"
	var redirect_uri = "http://mercadopago-sandbox.herokuapp.com/mercadopago/code"
	var Login = app.models.Login

    var MercadoPagoModel = {
    	
        get_url_auth: function () {
            return "https://auth.mercadopago.com.br/authorization?client_id=" + client_id + "&response_type=code&platform_id=mp&redirect_uri=" + redirect_uri
        },

        get_credentials: function(code, next) {
        	var MP = new app.mercadopago(client_id, client_secret);

        	MP.getCredentials(access_token_ll_sandbox, code, redirect_uri, function(error, resp){
                
                console.log("Resp get_credentials", error, resp);

        		if(error != null){
        			next(error, null);
        			return;
        		}

                next(null, resp.response)

        	});


        }

    };

    return MercadoPagoModel;
};


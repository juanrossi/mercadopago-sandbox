module.exports = function (app) {
    
    var AppController = {


        index: function (req, res) {
            var mercadopago = app.models.MercadoPago;
            var url = mercadopago.get_url_auth();

            var params = {
                url_app: url
            }

            res.render("app/index", params);
        },

        list: function (req, res) {
        	var credentials = req.session.credentials;
			var MP = new app.mercadopago(credentials.access_token);

                console.log("access_token", credentials.access_token);

            var user_role = req.params.user_role;
            var limit = 25;

            var page = req.query.page;
            var offset = 0;
            if(page != undefined){
                //pagina sempre comeca com 1
                offset = (page * limit) - limit;
            }

            var params = {
                "user_role": user_role,
                limit: limit,
                offset: offset
            }

            MP.get("/v1/payments/search", params, function(error, r){
                if (error) {
                    res.json({error: error});
                    return;
                }

                var params = {
                    payments: r.response.results,
                    paging: r.response.paging,
                    user_role: user_role
                }
                
                res.render("app/list", params);
            });

        },

        details: function (req, res) {
            var credentials = req.session.credentials;
            var MP = new app.mercadopago(credentials.access_token);
            var payment_id = req.params.id;
            
            MP.get("/v1/payments/" + payment_id, function(error, r){
                if (error) {
                    res.json({error: error});
                    return;
                }

                var params = {
                    payment: r.response,
                    moment: app.moment
                }
                
                res.render("app/payment_details", params);
            });
        },

        lol: function (req, res){
            res.render("app/lol")
        }

    };

    return AppController;
};
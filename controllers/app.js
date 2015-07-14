module.exports = function (app) {
    
    var AppController = {


        index: function (req, res) {
            var mercadopago = app.models.MercadoPago;
            var url = mercadopago.get_url_auth();

            var params = {
                url_app: url
            }

            if(typeof req.query.error != 'undefined' && req.query.error == 'access_token_test'){
                params.error = {
                    message: "O access_token utilizado não é de teste",
                    type: "error"
                }
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
            }else{
                page = 1;
            }

            var params = {
                "user_role": user_role,
                limit: limit,
                offset: offset,
                sort: "date_created",
                criteria: "desc"

            }

            MP.get("/v1/payments/search", params, function(error, r){
                if (error) {
                    res.json({error: error});
                    return;
                }
                //add page
                r.response.paging.page = page;

                var params = {
                    payments: r.response.results,
                    paging: r.response.paging,
                    user_role: user_role,
                    moment: app.moment
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

        refund: function (req, res) {
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
                
                res.render("app/refund", params);
            });
        },

        refund_action: function (req, res) {
            var params
            console.log(Object.keys(req.body).length);
            if(Object.keys(req.body).length > 0){

                var credentials = req.session.credentials;
                var MP = new app.mercadopago(credentials.access_token);

                var amount_user = req.body.amountToRefundByUser
                var amount_refund = req.body.amountToRefund
                var payment_id = req.body.payment_id

                var payment_data = {
                    amount: parseFloat(amount_user)
                }

                app.async.parallel({
                    refund: function(callback){
                        MP.post("/v1/payments/" + payment_id + "/refunds", payment_data, function(error, r){
                            callback(error, r)
                        });
                    },
                    payments: function(callback){
                        MP.get("/v1/payments/" + payment_id, function(error, r){
                            callback(error, r)
                        });
                    }
                },
                
                function(error, r) {

                    params = {
                        amount_refund: amount_user,
                        payer_name: r.payments.response.payer.first_name,
                        payer_email: r.payments.response.payer.email
                    }

                    if (typeof error != "undefined") {
                        params = {
                            error: error.error,
                            message: error.message
                        }
                    }

                    res.render("app/refund_action", params);
                });

            }else{
                params = {
                    error: "not_found",
                    message: "Payment not found"
                }

                res.render("app/refund_action", params);
            }
        },

    };

    return AppController;
};
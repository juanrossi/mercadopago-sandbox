module.exports = function (app) {

    var LoginModel = {

        isLogged: function (req, res, next) {

            if(typeof req.session.credentials != 'undefined'){
                next();
                return;
            }else{
                var mercadopago = app.models.MercadoPago;

                //caso não esteja autenticado redireciona para a tela de autorização da aplicação
                var url = mercadopago.get_url_auth();
                console.log("Usuario redirecionado para autorização da aplicação: ", url);
                res.redirect(url);
                return;
            }


            // continua a requisição caso esteja ok
            next();
        },

        // gera session
        generateSession: function (req, credentials){
            req.session.credentials = credentials;
            return req.session.credentials;
        },

        // deleta session
        destroy: function(req){
            req.session = null;
            return req.session;
        }

    };

    return LoginModel;
};
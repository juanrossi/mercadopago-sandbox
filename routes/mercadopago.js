module.exports = function(app) {

    var MercadoPagoController = app.controllers.mercadopago;

    app.get('/mercadopago/code', MercadoPagoController.getCode);
    
    app.get('/mercadopago/by_access_token', MercadoPagoController.byAccessToken);

    app.get('/mercadopago/logout', MercadoPagoController.logout);

    
}
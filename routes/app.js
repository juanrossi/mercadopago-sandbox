module.exports = function(app) {

    var appController = app.controllers.app;
    var login = app.models.Login;
    
    app.get('/', appController.index);
    app.get('/:user_role/payments', login.isLogged, appController.list);
    app.get('/payment/detail/:id', login.isLogged, appController.details);

    app.get('/payment/refund', login.isLogged, appController.refund_action);
    app.post('/payment/refund', login.isLogged, appController.refund_action);
    app.get('/payment/refund/:id', login.isLogged, appController.refund);

}
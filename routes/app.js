module.exports = function(app) {

    var appController = app.controllers.app;
    var login = app.models.Login;
    
    app.get('/', appController.index);
    app.get('/:user_role/payments', login.isLogged, appController.list);
    app.get('/payment/details/:id', login.isLogged, appController.details);

}
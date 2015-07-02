$(document).ready(function() {
    
    $(".auth_by_access_token").click(function(){
        $("#box_auth").hide();
        $("#box_token").fadeIn();
    });
    
    $(".auth_by_mp_connect").click(function(){
        $("#box_token").hide();
        $("#box_auth").fadeIn();
    });
    
});
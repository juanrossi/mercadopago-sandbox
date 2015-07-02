$(document).ready(function() {
    
    $(document).click(function() {
        //hide menu
        $("#menu-btn").removeClass("active");
        $("#menu").hide();
    });

    $("#menu-btn").click(function(e){
        //show menu
        $("#menu-btn").addClass("active");
        $("#menu").show();

        //para o evento para não esconder o menu
        e.stopPropagation();
        return false; 
    });

});
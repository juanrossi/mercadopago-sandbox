$(document).ready(function() {
    
    $(document).click(function() {
        //hide menu
        $("#menu-btn").removeClass("active");
        $("#menu").hide();

        $(".menu-options").hide();
    });

    $("#menu-btn").click(function(e){
        //show menu
        $("#menu-btn").addClass("active");
        $("#menu").show();

        //para o evento para não esconder o menu
        e.stopPropagation();
        return false; 
    });


    $(".menu-payment").click(function(e){

        $detail_box = $(this).parent();
        $detail_box.find(".menu-options").show();

        e.stopPropagation();
        return false; 
    });

});
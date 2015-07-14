$(document).ready(function() {
	
    $("input[name=amountToRefundByUser]").focusout(function(){
        var $amount_user = $(this);
        var $amount_refund = $("input[name=amountToRefund]");

        console.log($amount_user.val(), $amount_refund.val());
    });

	/*$(".head-group-details").click(function(){
		var date_created = $(this).attr("data-date_created");
		var $box_activies = $(this).parent().find(".box_activies");
		
		//add loading
		$box_activies.html(loading);

		$.ajax({
            type: "GET",
            url: "/activities/by_date/" + date_created,
            success: function(html){
            	//cria um btn de fechar
            	var btn_fechar = '<i class="mdl-color-text--blue-grey-400 material-icons fechar-box">zoom_out</i>';
            	
            	//add tabela
            	$box_activies.html(html + btn_fechar);

            	//le action de fechar
            	action_btn();
            }
        });

	});*/
});
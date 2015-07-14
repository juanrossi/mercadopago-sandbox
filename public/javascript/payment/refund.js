$(document).ready(function() {
	
    $("#amountToRefundByUser").focusout(validForm);
    $("#form-refund").submit(validForm);

});


function validForm(event){
    
    var amount_user = parseFloat($("#amountToRefundByUser").val());
    var amount_refund = parseFloat($("#amountToRefund").val());
    var $amount_refund_view = $("#amountToRefundView");

    if(amount_user > amount_refund){
        //pausa action do form
        event.preventDefault();
        
        amount_refund = amount_refund.toFixed(2)
        $("#amountToRefundByUser").val(amount_refund);

        alert("O valor máximo é R$ " + amount_refund);
    }else{
        $amount_refund_view.html(amount_user.toFixed(2));
    }
}


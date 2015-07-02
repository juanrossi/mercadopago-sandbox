module.exports = function (app) {

	app.locals.getClassByStatus = function(type, status) {
		var class_defined = "price-neutral";

		if(status == "approved"){
			if(type == "collector"){
				class_defined = "price-positive"
			}else{
				class_defined = "price-negative"
			}
		}

		return class_defined;
	}

	app.locals.getTitleByUserRole = function(user_role) {

		var title = {
			index: "Recebimentos",
			detail_pago: "Recebimento",
			user_part: "Comprador"
		}


		if(user_role == "payer"){
			title = {
				index: "Pagamentos",
				detail_pago: "Pagamento",
				user_part: "Vendedor"
			}
		}

		return title;
	}

	app.locals.identifyUserByPayment = function(payment) {
		var user;
		if(payment.payer == undefined){
			user = {
				details: payment.collector,
				user_role: "payer"
			}
		}else{
			user = {
				details: payment.payer,
				user_role: "collector"
			}
		}

		return user;
	}

	app.locals.getFormatClassAmount = function(transaction_amount) {
		//forca para string para ter a funcao de split
		var amount = String(transaction_amount.toFixed(2));

		//splita o valor a partir do ponto 
		transaction_amount = amount.split(".");

		var html = ""
		html += '<span class="price-symbol">R$</span>'
		html += '<span class="price-integer">' + transaction_amount[0] + '</span>'
		html += '<span class="price-decimal-mark">,</span>'
		html += '<span class="price-decimal">' + transaction_amount[1] + '</span>'

		return html;
	}
	
	
}
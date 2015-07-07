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

	app.locals.makePaginator = function(paging){
		var pages = parseInt(paging.total / paging.limit);
		var html = '<ul id="paginator">'
		
		if(paging.page != 1){
			html += '<li><a type="prev" href="?page='+ (parseInt(paging.page) - 1) +'">&lt; Anterior</a></li>'
		}

		for(var x = 1; x <= pages; x++){
			if(x == paging.page){
				html += '<li class="page_selected"><a href="?page=' + x + '">' + x + '</a></li>'
			}else{
				html += '<li><a href="?page=' + x + '">' + x + '</a></li>'
			}
		}

		if(paging.page < pages){
			html += '<li><a type="next" href="?page='+ (parseInt(paging.page) + 1) +'">Próxima &gt;</a></li>'
		}

		html += '</ul>'
		return html;

	}

	app.locals.invertUserRole = function(user_role) {
		if(user_role == 'collector'){
			user_role = 'payer'
		} else {
			user_role = 'collector'
		}
		
		return user_role;
	}
	
	app.locals.groupDateDiv = function(date_group_old, date_group) {
		var close = '' 

		var date_group_new = {
			date: date_group,
			div: ''
		}
		
		if(date_group_old != ''){
			close = '</div>'
		}

		if(date_group_old == "" || date_group_old.date != date_group){
			date_group_new.div = close + '<div class="group_by_date"> <time>' + date_group +'</time>'
		}
		
		return date_group_new
	}
}
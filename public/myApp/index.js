$(function(){

	// page has loaded
	// need to pull the old coffee orders from localStorage
	var orders = [];
	var oldOrdersJSON = localStorage.getItem("coffeeOrders");
	var oldOrders = JSON.parse(oldOrdersJSON);

	if (oldOrders) {
		orders = oldOrders;
	}
	

	// show the old orders to the screen
	var oldOrdersHTML = "";
	orders.forEach(function(currentOrder){
		oldOrdersHTML += renderCoffeeOrder(currentOrder);
	});
	$('#orderList').append(oldOrdersHTML);

	function renderCoffeeOrder(order) {
		var finalHTML = '<div class="order" data-id="'+ order.id +'">';

		finalHTML += '<span>'+ order.coffeeOrder +' </span>';
		finalHTML += '<span>'+ order.email +' </span>';
		finalHTML += '<span>'+ order.size +' </span>';
		finalHTML += '<span>'+ order.flavorShot +' </span>';
		finalHTML += '<span>'+ order.strength +' </span>';
		finalHTML += '<button class="delete">X</button>';
		finalHTML += '</div>';

		return finalHTML;
	}

	$('form').submit(function(e){
		e.preventDefault();

		var currentOrder = {
			id: new Date(),
			coffeeOrder: $('#coffeeOrder').val(),
			email: $('#emailInput').val(),
			size: $('input:checked').val(),
			flavorShot: $('#flavorShot').val(),
			strength:$('#strengthLevel').val()
		};

		orders.push(currentOrder);

		// Show the new order the the screen
		var renderedHTML = renderCoffeeOrder(currentOrder);	
		$('#orderList').append(renderedHTML);

		// Save the order list to localStorage
		var ordersJSON = JSON.stringify(orders);
		localStorage.setItem("coffeeOrders", ordersJSON);

	});


	$('#orderList').on('click', '.delete', function(){
		// Remove the right order object from orders
		var idToDelete = $(this).parent().data("id");

		// make sure the order gets removed from our orders array
		orders = orders.filter(function(currentOrder){
			return currentOrder.id != idToDelete;
		});

		// make sure the order gets removed from localStorage too
		var ordersJSON = JSON.stringify(orders);
		localStorage.setItem("coffeeOrders", ordersJSON);

		// Remove the order from the screen
		$(this).parent().remove();

		
	});

});

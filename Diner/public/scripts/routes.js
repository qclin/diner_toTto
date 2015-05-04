var currentView; 
var mainRoutes = Backbone.Router.extend({
	routes:{
		"":"showHomepage", 
	}, 
	showHomepage: function(){
		if(currentView !== undefined){
			currentView.remove(); 
		}
		$('<div id ="homeContent">').appendTo($('div#contentArea'));
		currentView = new HomepageView().render(); 
	}
});
var DishRoutes = Backbone.Router.extend({
	routes: {
		"dishes":"allDishes", 
		"dishes/new":"newDish", 
		"dishes/:dishID":"showDish", 
	}, 

	showDish: function(dishID){
		var thisDish = new Dish({id:dishID}); 
		thisDish.fetch({
			success: function(){
				// if(currentView !== undefined){
				// 	currentView.remove(); 
				// }
				//$('<div id = "dishArea"'+dishID+'>').appendTo($('li#dish'+dishID)); 
				new ShowDishView({model:thisDish}).render(); 
			}
		});
	}, 
	allDishes:function(){
		dishes.fetch({
			success:function(model,response){
				if(currentView !== undefined){
					currentView.remove();
				}
				$('<ul id = "allDishes">').appendTo($('div#contentArea'));
				currentView = new AllDishesView({collection: dishes}).render();
			}
		});
	}, 
	newDish: function(){
		if(currentView !== undefined){
			currentView.remove();
		}
		$('<div id = "formHere">').appendTo($('div#contentArea'));
		currentView = new CreateDishView({collection:dishes}).render();
	},
}); 

var homeRoute = new mainRoutes();
var dishRoutes = new DishRoutes(); 
Backbone.history.start();
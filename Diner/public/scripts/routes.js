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

var MenuRoutes = Backbone.Router.extend({
	routes: {
		"menus":"allMenus", 
		"menus/new":"newMenu", 
		"menus/:menuID":"showMenu", 
	},
	showMenu:function(menuID){
		var thisMenu = new Menu({id:menuID}); 
		thisMenu.fetch({
			success:function(){
				new ShowMenuView({model:thisMenu}).render();
			}
		});
	},
	allMenus:function(){
		menus.fetch({
			success: function(model, response){
				if(currentView !== undefined){
					currentView.remove(); 
				}
				$('<ul id = "allMenus">').appendTo($('div#contentArea'));
				currentView = new AllMenusView({collection: menus}).render();
			}
		});
	},
	newMenu : function(){
		if(currentView !== undefined){
			currentView.remove();
		}
		$('<div id = "formHere">').appendTo($('div#contentArea'));
		currentView = new CreateMenuView({collection:menus}).render();
	},
});
var homeRoute = new mainRoutes();
var dishRoutes = new DishRoutes();
var menuRoutes = new MenuRoutes();

Backbone.history.start();
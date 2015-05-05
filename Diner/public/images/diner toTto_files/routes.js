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
				currentView += new ShowMenuView({model:thisMenu}).render();
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
		currentView += new CreateMenuView({collection:menus}).render();
	},
});

var MenuDishRoutes = Backbone.Router.extend({
	routes:{
		"menus/:menuID/dishes":"showMenuDishes",
		"menus/:menuID/addDish": "addDishToMenu",
		"menus/:menuID/rmDish":"removeDish"
	},

	addDishToMenu: function(menuID){
		notOnMenu.fetch({
			traditional: true,
    		data: {menuID: menuID},
			success:function(model, response){
				if(currentView !== undefined){
					currentView.remove(); 
				}
				$('<ul id = "notOnMenu">').appendTo($('div#contentArea'));
				$('ul#notOnMenu').append('<div id = "square"><div id = "circle"><div id = "innerCircle"></div></div></div>');
				new addDishToMenuView({collection: notOnMenu}).render();
			}
		});
	}, 
	showMenuDishes: function(menuID){
		menuDishes.fetch({
			traditional:true, 
			data:{menuID: menuID}, 
			success:function(model, response){
				console.log("what's already on our menu?");
				$('<ul id = "alreadyOnMenu">').appendTo($('div#contentArea'));
				new rmDishFrMenuView({collection:menuDishes}).render();
			}
		});
	}
});

var homeRoute = new mainRoutes();
var dishRoutes = new DishRoutes();
var menuRoutes = new MenuRoutes();
var menuDishRoutes = new MenuDishRoutes();
Backbone.history.start();
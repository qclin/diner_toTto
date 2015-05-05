var currentView; 
var mainRoutes = Backbone.Router.extend({
	routes:{
		"":"showHomepage", 
	}, 
	showHomepage: function(){
		$('div#contentArea').html("");
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
				$('div#contentArea').html("");
				$('<ul id = "allDishes">').appendTo($('div#contentArea'));
				currentView = new AllDishesView({collection: dishes}).render();
			}
		});
	}, 
	newDish: function(){

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
		
				$('div#contentArea').html("");
				$('<ul class = "allMenus">').appendTo($('div#contentArea'));
				currentView = new AllMenusView({collection: menus}).render();
			}
		});
	},
	newMenu : function(){
		
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
				console.log(notOnMenu);
				$('div#contentArea').html("");
				console.log($('div#contentArea').html());
				$('div#contentArea').append($('<ul id = "notOnMenu">'));

				$('ul#notOnMenu').append('<div id = "square'+menuID+'" class ="menuTarget"><div id = "circle"><div id = "innerCircle"></div></div></div>');
				new addDishToMenuView({collection: notOnMenu}).render();
			}
		});
	}, 
	showMenuDishes: function(menuID){
		menuDishes.fetch({
			traditional:true, 
			data:{menuID: menuID}, 
			success:function(model, response){
				console.log(menuDishes)
				var menuShow = $('li#'+menuID);
				menuShow.html("");
				console.log(menuShow);
				$('<ul id = "alreadyOnMenu' + menuID + '" class= "alreadyOnMenuClass">').appendTo(menuShow);
				new ShowDishInMenuView({collection: menuDishes}).render();
			}
		});
	}
});

var homeRoute = new mainRoutes();
var dishRoutes = new DishRoutes();
var menuRoutes = new MenuRoutes();
var menuDishRoutes = new MenuDishRoutes();
Backbone.history.start();
var currentView; 
var main = $('div#contentArea');
var mainRoutes = Backbone.Router.extend({
	routes:{
		"":"showHomepage", 
	}, 
	showHomepage: function(){
		main.html("");
		$('<div id ="homeContent">').appendTo(main);
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
				main.html("");
				$('<ul id = "allDishes">').appendTo(main);
				currentView = new AllDishesView({collection: dishes}).render();
			}
		});
	}, 
	newDish: function(){

		$('<div id = "formHere">').appendTo(main);
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
		
				main.html("");
				$('<ul class = "allMenus">').appendTo(main);
				currentView = new AllMenusView({collection: menus}).render();
			}
		});
	},
	newMenu : function(){
		
		$('<div id = "formHere">').appendTo(main);
		currentView += new CreateMenuView({collection:menus}).render();
	},
});

var MenuDishRoutes = Backbone.Router.extend({
	routes:{
		"menus/:menuID/dishes":"showMenuDishes",
		"menus/:menuID/addDish": "addDishToMenu",
		// creating a new route to fetch both dishes on and NOTon menu 
		"menus/:menuID/updateMenuDishes":"updateMenuDishes"

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
	}, 
	updateMenuDishes: function (menuID){
		menuDishes.fetch({
			traditional:true, 
			data:{menuID:menuID}, 
			success:function(model, response){
				main.html("");
				//main.append('<div id = "square'+menuID+'" class ="menuTarget"><div id = "circle"><div id = "innerCircle"></div></div></div>');
				main.append('<a href="/#menus/'+menuID+'/addDish"><span id = "plate'+ menuID +'" class="menuTarget"></span></a>')
				main.append($('<ul id = "itemsOnMenu'+ menuID + '" class = "dishesListed">'));
				new UpdateDishInMenuView({collection:menuDishes}).render();
			}
		});
	},
	addDishToMenu: function(menuID){
		notOnMenu.fetch({
			traditional: true,
    		data: {menuID: menuID},
			success:function(model, response){
				console.log(notOnMenu);
				//main.html("");
				console.log(main.html());
				main.append($('<ul id = "notOnMenu">'));

				//main.append('<div id = "square'+menuID+'" class ="menuTarget"><div id = "circle"><div id = "innerCircle"></div></div></div>');
				new addDishToMenuView({collection: notOnMenu}).render();
			}
		});
	}

});

var homeRoute = new mainRoutes();
var dishRoutes = new DishRoutes();
var menuRoutes = new MenuRoutes();
var menuDishRoutes = new MenuDishRoutes();
Backbone.history.start();
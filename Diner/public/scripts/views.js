var HomepageView = Backbone.View.extend({
	el:"div#homeContent", 
	template: _.template($('#goHome').html()),

	render:function(){
		this.$el.html(this.template()); 
		return this;
	}
}); 

var ShowDishView = Backbone.View.extend({
	tagName:'li',
	template:_.template($('#showDish').html()), 
	events: { 
			"click h3":"showContent",
			"click button.deleteButton": "deleteDish", 
			"click button.editButton": "editDish", 
			"click button.updateButton":"updateDish"
	}, 
	showContent: function(){
		this.$("span.dishContent").show();
	},
	updateDish: function(){
		var newName = this.$("#nDish_name"+this.model.id).val();
		var newTexture = this.$("#nDish_texture"+this.model.id).val(); 
		var newFlavor = this.$("#nDish_flavor"+this.model.id).val();
		this.model.set({name:newName, texture:newTexture, flavor: newFlavor});
		/// needs to add validation before you save; 
		this.model.save();
		dishRoutes.navigate('#dishes', true);
	},
	editDish: function(){
		this.$("span.dishContent").hide(); 
		this.$('span.editDishForm').show();
	},
	deleteDish: function(){
		this.model.destroy(); 
		dishRoutes.navigate('#dishes', true); 
	}, 
	render: function(){
		this.$el.html(this.template({dish: this.model.toJSON()}));
		return this; 
	}
}); 

var AllDishesView = Backbone.View.extend({
	el:"ul#allDishes", 
	//template: _.template($('#dishTemplate').html()), 

	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render); 
	}, 
	render:function(){
		var dishes = this.$el; 
		dishes.html(''); 
		dishes.prepend('<a href = "/#dishes/new" >add a new dish</a><br>');
		this.collection.each(function(dish){
			dishes.append(new ShowDishView({model:dish}).render().$el); 
		}); 
		return this; 
	}
}); 

var CreateDishView = Backbone.View.extend({
	el:"div#formHere", 
	events: {"click button#addNewDish": function(e){
		e.preventDefault(); 
		this.createDish(); 
	}}, 
	template:_.template($('#addDishForm').html()), 
	render:function(){
		this.$el.html(this.template()); 
		return this;
	},

	createDish: function(){
		console.log("we're in creatDish");
		var thisView = this; 
		var name = this.$("#nDish_name").val(); 
		var texture = this.$("#nDish_texture").val(); 
		var flavor = this.$("#nDish_flavor").val();

		var jserDish = {name:name, texture:texture, flavor:flavor}; 
		console.log(jserDish);
		var temp = new Dish(jserDish); 
		Backbone.Validation.bind(this,{
			model: temp
		});
		temp.validate();
		temp.bind('validated', function(isValid, mode, errors){
			if(isValid === true){
				thisView.collection.create(jserDish); 
				dishRoutes.navigate('#dishes',true);
			}else{
				Object.keys(errors).forEach(function(key){
					$('.errorMsg').append("<br>"+errors[key]); 
				});
			}
		});
	}
}); 

var ShowMenuView = Backbone.View.extend({
	tagName:'li', 
	template: _.template($('#showMenu').html()), 
	events: {
		"click img":"showContent",
		"click button.deleteButton":"deleteMenu", 
		"click button.editButton":"editMenu", 
		"click button.updateButton":"updateMenu", 
		"dblclick span.menuContent h3": "showAdmin",
	}, 
	showContent: function(){
		this.$("span.menuContent").show();
	},
	updateMenu: function(){
		var newTag = this.$("#nMenu_tag"+ this.model.id).val();
		var newMood = this.$("#nMenu_mood"+ this.model.id).val(); 
		var newImage = this.$("#nMenu_imgUrl"+this.model.id).val();
		this.model.set({ tag:newTag, mood:newMood, img_url: newImage }); 
		// neeed to add form validation here
		this.model.save(); 
		menuRoutes.navigate('#menus', true); 
	},
	editMenu: function(){
		this.$("img").hide();
		this.$("span.menuContent").hide(); 
		this.$("span.editMenuForm").show(); 
	},
	deleteMenu: function(){
		this.model.destroy(); 
		menuRoutes.navigate("#menus", true);
	}, 
	showAdmin: function(){
		console.log("in h3 right now")
		this.$("div#admin").show();
	},
	render: function(){
		this.$el.attr('id',this.model.id)
		this.$el.html(this.template({menu: this.model.toJSON()}));
		return this;
	}
});

var AllMenusView = Backbone.View.extend({
	el:"ul.allMenus", 

	initialize: function(){
		this.listenTo(this.collection, "sync remove", this.render); 
	}, 

	render: function(){
		var menus = this.$el; 
		menus.html(""); 
		menus.prepend('<a href = "/#menus/new">add a new menu</a><br>'); 
		this.collection.each(function(menu){
			menus.append(new ShowMenuView({model:menu}).render().$el);
		}); 
		return this;
	}
});

var CreateMenuView = Backbone.View.extend({
	el:"div#formHere", 
	events:{"click button#addNewMenu": function(e){
		e.preventDefault();
		this.createMenu(); 
	}}, 
	template: _.template($('#addMenuForm').html()),
	render: function(){
		this.$el.html(this.template()); 
		return this;
	}, 
	createMenu: function(){
		var thisView = this; 
		// incase we lose 'this' later; 
		var tag = this.$('#nMenu_tag').val(); 
		var mood = this.$('#nMenu_mood').val();
		var image = this.$('#nMenu_imgUrl').val(); 
		//Jquery SerializeObject, 
		var jserMenu = {tag:tag, mood:mood, img_url: image};
		// create a model instance for Validation
		var temp = new Menu(jserMenu); 
		// bind validation to temp model
		Backbone.Validation.bind(this,{
			model:temp
		}); 
		temp.validate();
		temp.bind('validated', function(isValid, model, errors){
			if(isValid === true){
				thisView.collection.create(jserMenu); 
				menuRoutes.navigate('#menus', true); 
			}else{
				Object.keys(errors).forEach(function(key){
					$('.errorMsg').append("<br>"+errors[key]); 
				});
			}
		})
	}
});

var ShowDishInMenuView = Backbone.View.extend({
	tagline:'li', 
	template:_.template($('#showDishMenuForm').html()),
	initialize: function(){
		// DON't LISTEN to this.render here, since you're rendering multiple menulist in one view, it'll start to eat up sibbling menu list and act cannibalistic
		this.listenTo(this.collection, "sync change remove"); 
	}, 
	render:function(){
		//debugger;
		var thisView = this;
		var parent = $("ul#alreadyOnMenu"+this.collection.models[0].attributes.menu_id);
		// debugger;
		parent.html("");
		this.collection.each(function(dishOn){
			parent.append(thisView.template({dishOn:dishOn.toJSON()}));
		});
		return this;
	}
});

var addDishToMenuView  = Backbone.View.extend({
	//tagline:'li',
	el:'ul#notOnMenu',
	template: _.template($('#addDishtoMenuForm').html()),

	initialize: function(){
		this.listenTo(this.collection, "sync change remove"); 
		// but also need to listen to the other collecion -- dishes already on the menu 
	}, 

	render: function(){
		var thisView = this; 	
		$('ul#notOnMenu').html("");
		console.log(this.collection);
		this.collection.each(function(dish){
			thisView.$el.append(thisView.template({dish: dish.toJSON()}));
		}); 
		
		var notOn = thisView.$el; 
		var plate = $('.menuTarget');
		var plateId = plate.attr("id").substr(5);
		// let the ul itesm be draggable 
		$('li', notOn).draggable({
			// when it is drag, the route changes back to addDish 
//////////////////////////////lagging here//
			drag:function(event, ui){
			menuDishRoutes.navigate('/menus/'+plateId+'/addDish',true);
			}
		});
		// let the plate be droppable, accepting noOnMenu items
		plate.droppable({
			accepting:" ul#notOnMenu > li", 
			drop:function(event, ui){
				var dish = ui.draggable
				dish.hide();
				var dishId = dish.attr("id").substr(4);
  				//var plateId = $(this).attr("id").substr(5);

  				addToMenu(dishId, plateId);
  				console.log(dishId);
  				console.log(plateId);
  				menuDishRoutes.navigate('/menus/'+plateId+'/dishes',true);
			}
		});

		// add dish to menu function 
		function addToMenu(dish, plate){
			menuDishes.create({menu_id:plate, dish_id: dish});
		}
		return this; 
	}
});

var UpdateDishInMenuView = Backbone.View.extend({
	tagline:'li', 
	template: _.template($('#editDishMenuForm').html()), 
	initialize: function(){
		this.listenTo(this.collection, "sync change remove"); 
		// but also need to listen to the other collecion -- dishes not on the menu
	}, 
	render: function(){
		console.log("here son were here")
		var thisView = this; 
		var container = $('ul#itemsOnMenu');
		container.html("");
		
		this.collection.each(function(dish){
			container.append(thisView.template({onMenuDish: dish.toJSON()}));
		});
		var listedItems = $('ul.dishesListed');
		// let the items of the container be draggable 
		$('li', listedItems).draggable({});

		// grabbing our plate for trashing purposes
		var plate = $('.menuTarget');
		var plateId = plate.attr("id").substr(5);
		//seting plate to be droppable 
		plate.droppable({
			accepting: "ul.dishesListed > li", 
			drop: function (event, ui){
				var dish = ui.draggable;
				dish.hide();
				console.log(dish);
				var dishId = dish.attr("id");
				console.log("dish "+ dishId + "menu "+plateId);
				console.log(dish);
				menuDishes.where({id: parseInt(dishId)})[0].destroy();

				//menu_id:parseInt(plateId);

			}
		})

	}
});













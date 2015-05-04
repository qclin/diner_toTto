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
	render: function(){
		this.$el.html(this.template({menu: this.model.toJSON()}));
		return this;
	}
});

var AllMenusView = Backbone.View.extend({
	el:"ul#allMenus", 

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

		/// render this way for individual page/ using a template for list in html
	// render: function(){
	// 	var menus = this; 
	// 	menus.$el.html(""); 
	// 	menus.$el.prepend('<a href = "/#menus/new" >add a new menu</a>');
	// 	this.collection.each(function(menu){
	// 		menus.$el.append(menus.template({menu: menu.toJSON()}));
	// 	}); 
	// 	return this; 
	// }
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
















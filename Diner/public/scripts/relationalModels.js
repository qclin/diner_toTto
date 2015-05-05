// model a many-to-many relationship using two Backbone.HasMany relations, with a link model in between

//Each relation must define (as a minimum) the 'type', 'key' and 'relatedModel'.
	// Options include 'includeInJSON', 'createModels' and 'reverseRelation'.
var Menu = Backbone.RelationalModel.extend({
	urlRoot:'/menus',
	relations:[{ 
		type: Backbone.HasMany
		key:'categories', 
		relatedModel: 'Category', 
		// a seperate operation from fetch
		// propert
		autoFetch:{
			success: function(model, response){

			},
			error: function(model, response){

			}
		}
		reverseRelations:{
			key: 'menu', 
			includeInJSON: 'id'
		}
	}]
});

var Category = Backbone.RelationalModel.extend({
	defaults: {
		"order": null, 
		"portion": null
	}
}); 

var Dish = Backbone.RelationalModel.extend({
	urlRoot:'/dishes',
	relations: [{
		type: Backbone.HasMany, 
		key: 'menus', 
		relatedModel:'Category', 
		collectionTypeL:'MenuCollection', 
		reverseRelations:{
			key:'company', 
			includeInJSON:'id'
		}
	}]
}); 

var MenuCollection = Backbone.Collection.extend({
	model: Menu
});

var DishCollection = Backbone.Collection.extend({
	model: Dish
});
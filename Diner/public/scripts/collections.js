var DishesCollection = Backbone.Collection.extend({
	model: Dish, 
	url: "/dishes",
	initialize:function(){
		console.log('new DishesCollection created');

		this.on('add', function(model, collection){
			console.log(JSON.stringify(model) + ' added to DishesCollection')
		});
		this.on('remove', function(model, collection){
			console.log(JSON.stringify(model) + ' removed from DisheesCollection');
		});
	}, 
}); 
var dishes = new DishesCollection(); 



var MenusCollection = Backbone.Collection.extend({
	model: Menu, 
	url:"/menus", 
	initialize:function(){
		console.log('new MenuCollection created');

		this.on('add', function(model, collection){
			console.log(JSON.stringify(model) + ' added to MenusCollection')
		});
		this.on('remove', function(model, collection){
			console.log(JSON.stringify(model) + ' removed from MenusCollection');
		});
	}, 
});
var menus = new MenusCollection(); 



var HappeningsCollection = Backbone.Collection.extend({
	model: Happen, 
	url:"/happenings",
	initialize:function(){
		console.log('Happening created');

		this.on('add', function(model, collection){
			console.log(JSON.stringify(model) + ' added to happenings')
		});
		this.on('remove', function(model, collection){
			console.log(JSON.stringify(model) + ' removed from happenings')
		});
	}, 
});

var happenings = new HappeningsCollection(); 



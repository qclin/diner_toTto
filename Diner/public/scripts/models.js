var Dish = Backbone.Model.extend({
	urlRoot : "/dishes",
	initialize:function(){
		console.log('dish created');

		this.on('change', function(){
			console.log('dish updated');
		});
	}, 
	defaults: {
		name: "cactus",
		flavor: "spicy",
		texture:"prickly"
	}, 
	validation:{

		name:{
			required :true, 
			msg: 'Please enter a valid name'
		}, 
		flavor:{
			required: true, 
			msg: 'go head, give us hint of flair'
		}, 
		texture:{
			required: true, 
			msg: 'they must know how if feels', }
	}
}); 

var Menu = Backbone.Model.extend({
	urlRoot:"/menus", 
	initialize:function(){
		console.log('menu created'); 

		this.on('change', function(){
			console.log('menu updated'); 
		});
	}, 
	defaults:{
		tag: 'basic',
		mood: 'the most rudimentary diet to solidify their size',
		img_url: 'http://www.japan-guide.com/g8/2080_05.jpg'
	}, 
	validation:{
		tag:{ 
			required:true,
			msg: 'please tag it'
			///later when you create menu collection you can choose match menu model to menu collection
			//oneOf: ['menuOne', 'menuTwo'] 
		}, 
		mood:{ 
			rangeLength: [4, 140],
			msg: 'a quick memo please, 4 - 140 letters appropriate!'
		},
		img_url:{ 
			pattern: 'url', 
			msg: 'must be a image link'
		}
	},
});

var Happen = Backbone.Model.extend({
	urlRoot:"/happenings", 
	initialize:function(){
		console.log('happen created'); 

		this.on('change', function(){
			console.log('happen changed'); 
		});
	},

	defaults:{
		theme: 'testing',
  		rule: 'no monkey bussiness' , 
  		pic_url: 'http://3.bp.blogspot.com/-3EWQwOf-UV0/T_oT0ZSh09I/AAAAAAAAEro/7Pwzu2d2y1s/s1600/IMG_1251.JPG', 
  		space: '../images/temple-grandin.jpg'
	},

	validation:{
		theme: {
			required: true,
			//oneOf: ['EventOne', 'EventTwo'] 
		}, 
		rule: {
			required: true,
		}, 
		pic_url:{
			pattern: 'url', 
			msg: 'must be a image link'
		}, 
	}, 

});




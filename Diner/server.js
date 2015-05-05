var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("db/diner.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('public'));
app.get('/', function(req, res){
	res.render('index.html')
});

app.get('/menus', function(req, res){
	db.all("SELECT * FROM menus", function(err, rows){
		if(err){
			throw err;
		}
		res.json(rows);
	});
});

app.get('/menus/:id', function(req, res){
	db.get('SELECT * FROM menus WHERE id = ?', req.params.id, function(err, row){
		if(err){
			throw err;
		}
		res.json(row);
	});
});

app.post('/menus', function(req, res){
	db.run("INSERT INTO menus (tag, mood, img_url) VALUES (?,?,?)", req.body.tag, req.body.mood, req.body.img_url, function(err,row){
		if(err){
			throw err;
		}
		var id = this.lastID;
        db.get("SELECT * FROM menus WHERE id = ?", id, function(err, row) {
        	if(err) {
        		throw err;
        	}
        	res.json(row);
        });
    });
});

app.put('/menus/:id', function(req, res){
	var id = req.params.id
	db.run("UPDATE menus SET tag = ?, mood =?, img_url = ? WHERE id = ?", req.body.tag, req.body.mood, req.body.img_url, req.body.id, function(err){
		if(err){
			throw err;
		}
		db.get("SELECT * FROM menus WHERE id = ?", id, function(err, row){
			if(err){
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/menus/:id', function(req, res){
	db.run("DELETE FROM menus WHERE id = ?", req.params.id, function(err){
		if(err){
			throw err;
		}
		res.json({deleted: true});
	});
});


app.get('/dishes', function(req, res) {
	db.all("SELECT * FROM dishes", function(err, rows) {
		if(err) {
			throw err;
		}
		res.json(rows);
	});
});


app.get('/dishes/:id', function(req, res) {
	db.get("SELECT * FROM dishes WHERE id = ?", req.params.id, function(err, row){
		if(err) {
			throw err;
		}
		res.json(row);
	});
});

app.post('/dishes', function(req, res) {
	db.run("INSERT INTO dishes (name, texture, flavor) VALUES (?,?,?)", req.body.name, req.body.texture, req.body.flavor, function(err) {
		if(err) {
			throw err;
		}
    var id = this.lastID;
    db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
    	if(err) {
    		throw err;
    	}
    	res.json(row);
    });
  });
});

app.put('/dishes/:id', function(req, res) {
	var id = req.params.id;
	db.run("UPDATE dishes SET name = ?, texture = ?, flavor = ? WHERE id = ?", req.body.name, req.body.texture, req.body.flavor,  req.body.id, function (err) {
		if(err) {
			throw err;
		}
		db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
			if(err) {
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/dishes/:id', function(req, res) {
	db.run("DELETE FROM dishes WHERE id = ?", req.params.id, function(err) {
		if(err) {
			throw err;
		}
		res.json({deleted: true});
	});
});
// getting all the dishes that are on this menu 
app.get('/alreadyOnMenu', function(req, res){
	var menuID = req.query.menuID; 
	db.all("SELECT * FROM menu_dishes INNER JOIN dishes ON menu_dishes.dish_id = dishes.id WHERE menu_dishes.menu_id =" + menuID, function(err, onMenu){
		if(err){ throw err; }
		console.log(onMenu);
		res.json(onMenu);
	});
});

/// fetching a list of dishes not on thismenu 
//GET http://localhost:3000/dishesNotOnMenu?menuID=2
app.get('/dishesNotOnMenu', function(req, res){
	console.log("dishesNotOnMenu route " + req.query.menuID);
	var menuID = req.query.menuID; 
	db.all("SELECT * FROM dishes WHERE dishes.id NOT IN (SELECT dish_id FROM menu_dishes WHERE menu_id ="+ menuID +")", function(err, notOnMenu){
		if(err){ throw err; }
		res.json(notOnMenu); 
	});
});


// posting dish assignment
app.post('/alreadyOnMenu', function(req, res){
	db.run("INSERT INTO menu_dishes (menu_id, dish_id) VALUES (?,?)", req.body.menu_id, req.body.dish_id, function(err){
		if(err){ throw err; }
		var id = this.lastID; 
		db.get("SELECT * FROM menu_dishes INNER JOIN dishes ON menu_dishes.menu_id = "+ req.body.menu_id +" WHERE menu_dishes.dish_id =" + id, function(err, newOnMenu){
			if(err){ throw err; }
			res.json(newOnMenu);
		});
	});
});

// removing dish from menu 
app.delete('/menus/:menuID/removeDish', function(req,res){
	db.run('DELETE FROM menu_dishes WHERE menu_id = ',+ req.params.menuID, function(err){
		res.json({deleted: true});
	});
});








app.listen(3000);
console.log('Listening on port 3000');

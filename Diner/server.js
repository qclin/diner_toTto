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

app.get('/categories', function(req, res){
	db.all("SELECT * FROM categories", function(err, rows){
		if(err){
			throw err;
		}
		res.json(rows);
	});
});

app.get('/categories/:id', function(req, res){
	db.get('SELECT * FROM categories WHERE id = ?', req.params.id, function(err, row){
		if(err){
			throw err;
		}
		res.json(row);
	});
});

app.post('/categories', function(req, res){
	db.run("INSERT INTO categories (tag) VALUES (?)", req.body.tag, function(err,row){
		if(err){
			throw err;
		}
		var id = this.lastID;
        db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row) {
        	if(err) {
        		throw err;
        	}
        	res.json(row);
        });
    });
});

app.put('/categories/:id', function(req, res){
	var id = req.params.id
	db.run("UPDATE categories SET name = ? WHERE id = ?", req.body.tag, id, function(err){
		if(err){
			throw err;
		}
		db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row){
			if(err){
				throw err;
			}
			res.json(row);
		});
	});
});

app.delete('/categories/:id', function(req, res){
	db.run("DELETE FROM categories WHERE id = ?", req.params.id, function(err){
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

app.listen(3000);
console.log('Listening on port 3000');

var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/meandb');

router.get('/', function(req, res) {
	var collection = db.get('songs');
	collection.find({}, function(err, songs){
		if (err) throw err;
		res.json(songs);
	});
});

router.get('/:id', function(req, res){
	var collection = db.get('songs');
	collection.findOne({ _id: req.params.id }, function(err, song){
		if (err) throw err;

		res.json(song);
	});
});

router.post('/', function(req, res) {
	var collection = db.get('songs');
	collection.insert({
		title: req.body.title,
		year: req.body.year,
		month: req.body.month,
		day: req.body.day,
		venue: req.body.venue,
		description: req.body.description,
		filepath: req.body.filepath
	}, function(err, song) {
		if (err) throw err;

		res.json(song);
	});
});

router.put('/:id', function(req, res){
	var collection = db.get('songs');
	collection.update({
		_id: req.params.id
	},
	{
		title: req.body.title,
		year: req.body.year,
		month: req.body.month,
		day: req.body.day,
		venue: req.body.venue,
		description: req.body.description,
		filepath: req.body.filepath
	}, function(err, song){
		if (err) throw err;

		res.json(song);
	});
});

module.exports = router;

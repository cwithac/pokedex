var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Pokemon    = require('./models/pokemon.js');

    var port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//===================================================//

//Index Page
app.get('/pokemon', function(req, res) {
  res.render('index.ejs', {
    data: Pokemon
  });
});

//Data Page
app.get('/pokemon/data', function(req, res) {
  res.send(Pokemon);
});

//Add Page
app.get('/pokemon/add', function(req, res) {
  res.render('add.ejs');
});

app.post('/pokemon', function(req, res) {
  req.body.stats.hp = req.body.stats[0];
  req.body.stats.attack = req.body.stats[1];
  req.body.stats.defense = req.body.stats[2];
  req.body.stats.spattack = req.body.stats[3];
  req.body.stats.spdefense = req.body.stats[4];
  req.body.stats.speed = req.body.stats[5];
  Pokemon.push(req.body);
  res.redirect('/pokemon/' + (Pokemon.length-1));
});

//Show Page
app.get('/pokemon/:index', function(req, res) {
  res.render('show.ejs', {
    data: Pokemon[req.params.index],
    index: req.params.index
  });
});

//Edit Page
app.get('/pokemon/:index/edit', function(req, res) {
    res.render('edit.ejs', {
      data: Pokemon[req.params.index],
      index: req.params.index
    });
});

app.put('/pokemon/:index', function(req, res) {
  Pokemon[req.params.index] = req.body;
  req.body.stats.hp = req.body.stats[0];
  req.body.stats.attack = req.body.stats[1];
  req.body.stats.defense = req.body.stats[2];
  req.body.stats.spattack = req.body.stats[3];
  req.body.stats.spdefense = req.body.stats[4];
  req.body.stats.speed = req.body.stats[5];
  console.log(req.body);
  res.redirect('/pokemon');
});

//Delete Functionality (displayed on show page only)
app.delete('/pokemon/:index', function(req, res) {
  Pokemon.splice(req.params.index, 1);
  res.redirect('/pokemon');
});

//Listener
app.listen(port, function() {
  console.log("Pokedex App is listening to port " + port + ".");
});

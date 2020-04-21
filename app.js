const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

// App config
mongoose.connect('mongodb://localhost/restful_blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Mongoose/Model Config
let blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: { type: Date, default: Date.now }
});

let Blog = mongoose.model('Blog', blogSchema);

//Restful Routes
app.get('/', (req, res) => {
	res.redirect('/blogs');
});

//Index Route
app.get('/blogs', (req, res) => {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

//New Route
app.get('/blogs/new', (req, res) => {
	res.render('new');
});

//Create Route
app.post('/blogs', (req, res) => {
	Blog.create(req.body.blog, function(err, newBlog) {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/blogs');
		}
	});
});

//Show Route
app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('show', { blog: foundBlog });
		}
	});
});

//edit route
app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', { blog: foundBlog });
		}
	});
});

//update route
app.put('/blogs/:id', (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if (err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

//delete route
app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if (err) res.redirect('/blogs');
		else res.redirect('/blogs');
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

const express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

// App config
mongoose.connect('mongodb://localhost/restful_blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/blogs', (req, res) => {
	Blog.find({}, function(err, blogs) {
		if (err) {
			console.log(err);
		} else {
			res.render('index', { blogs: blogs });
		}
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});

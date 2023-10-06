var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me' });
});
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});

//adding the JavaScript code for handling the form submission of the contact form
router.post('/contact', function(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const contactNumber = req.body.contactNumber;
  const email = req.body.email;
  const message = req.body.message;

  // Process the form data as needed (e.g., send an email, store in a database)

  // Redirect the user back to the home page
  res.redirect('/?formSubmitted=true');
});



router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services' });
});

module.exports = router;

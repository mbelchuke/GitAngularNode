module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    // grab the user model
    var User = require('./models/user');
    var Donor = require('./models/donor');


    // api route "GET ALL USERS"
    app.get('/api/users', function(req, res) {

	// use mongoose to get all users in the database
	User.find(function(err, users) {
	    // if there is an error retrieving, send the error.
	    // nothing after res.send(err) will execute
	    if (err){
		res.send(err);
	    }else{
		res.json(users); // return all users in JSON format
	    }

	});

    }),
    // api route "CREATE NEW USER"
    app.post('/api/users', function(req, res){
	var user            = new User();      // create a new instance of the User model
	user.firstname      = req.body.firstname;  // set the users firstname (comes from the request)
	user.lastname       = req.body.lastname;    // set the users lastname
	user.age            = req.body.age;// set the users age
	user.username       = req.body.username;// set the username
	user.password       = req.body.password; // set the password
	user.email          = req.body.email;       // set user email
	user.role           = req.body.role;        // set user role

	// save the user and check for errors
	user.save(function(err) {
	    if (err)
		res.send(err);

	    res.json({ message: 'User created!' });
	});
    }),

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    app.get('/api/users/:user_id', function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
	    if (err)
		res.send(err);
	    res.json(user);
	});
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    app.put('/api/users/:user_id', function(req, res) {

	// use our user model to find the user we want
	User.findById(req.params.user_id, function(err, user) {

	    if (err)
		res.send(err);

	    user.firstname      = req.body.firstname;   // set the users name (comes from the request)
	    user.lastname       = req.body.lastname;    // set the users lastname
	    user.age            = req.body.age;         // set the users age
	    user.username       = req.body.username;    // set the username
	    user.password       = req.body.password;    // set the password
	    user.role           = req.body.role;        // set user role
	    user.bloodtype      = req.body.bloodtype    // set user bloodtype

	    // save the user
	    user.save(function(err) {
		if (err)
		    res.send(err);

		res.json({ message: 'User updated!' });
	    });

	});
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    app.delete('/api/users/:user_id', function(req, res) {
	User.remove({
	    _id: req.params.user_id
	}, function(err, user) {
	    if (err)
		res.send(err);

	    res.json({ message: 'Successfully deleted' });
	});
    });


    // api route "GET ALL DONORS"
    app.get('/api/donors', function(req, res) {

	// use mongoose to get all donors in the database
	Donor.find(function(err, donors) {
	    // if there is an error retrieving, send the error.
	    // nothing after res.send(err) will execute
	    if (err){
		res.send(err);
	    }else{
		res.json(donors); // return all donors in JSON format
	    }

	});

    }),

    // api route "CREATE NEW DONOR"
    app.post('/api/donors', function(req, res){
	var donor            = new Donor();         // create a new instance of the User model
	donor.firstname      = req.body.firstname;  // set the donors firstname (comes from the request)
	donor.lastname       = req.body.lastname;   // set the donors lastname
	donor.age            = req.body.age;        // set the donors age
	donor.sex            = req.body.sex;        // set the donors sex
	donor.role           = req.body.role;       // set donor role
	donor.bloodtype      = req.body.bloodtype   // set donor bloodtype
	donor.userstory      = req.body.userstory   // set donor userstory
	donor.email          = req.body.email       // set donor email

	// save the donor and check for errors
	donor.save(function(err) {
	    if (err){
		res.send(err);
	    }
	    else{
		res.json({ message: 'User created!' });
	    }
	});
    });

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    app.get('/api/donors/:donor_id', function(req, res) {
	Donor.findById(req.params.donor_id, function(err, donor) {
	    if (err)
		res.send(err);
	    res.json(donor);
	});
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    app.put('/api/donors/:donor_id', function(req, res) {

	// use our user model to find the user we want
	Donor.findById(req.params.donor_id, function(err, donor) {

	    if (err)
		res.send(err);

	    donor.firstname      = req.body.firstname;  // set the donors firstname (comes from the request)
	    donor.lastname       = req.body.lastname;   // set the donors lastname
	    donor.age            = req.body.age;        // set the donors age
	    donor.sex            = req.body.sex;        // set the donors sex
	    donor.role           = req.body.role;       // set donor role
	    donor.bloodtype      = req.body.bloodtype   // set donor bloodtype
	    donor.userstory      = req.body.userstory   // set donor userstory
	    donor.email          = req.body.email       // set donor email

	    // save the user
	    donor.save(function(err) {
		if (err)
		    res.send(err);

		res.json({ message: 'Donor updated!' });
	    });

	});
    })

    // delete the donor with this id (accessed at DELETE http://localhost:8080/api/donors/:user_id)
    app.delete('/api/donors/:donor_id', function(req, res) {
	Donor.remove({
	    _id: req.params.donor_id
	}, function(err, donor) {
	    if (err)
		res.send(err);

	    res.json({ message: 'Successfully deleted' });
	});
    });

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
    });



};

const express = require("express");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt");
const { resourceUsage } = require("process");
const mysql = require("./backend/mariadb");
const mongodb = require("./backend/mongodb");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');

const { body,validationResult } = require("express-validator");

const server = express();
const port = 3000;


server.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
	})
);

server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static("frontend"));

server.set("view engine", "pug");

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use('/', indexRouter);
//server.use('/users', usersRouter);
server.use('/catalog', catalogRouter); 

server.get("/login", (req, res) => {
	res.render("login");
});

server.get("/register", (req, res) => {
	res.render("register");
});

server.get('/logout', function (req, res) {
	req.session.destroy();
	res.send("logout success!");
  });

server.post("/auth", async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	mysql.connection.query(
		"SELECT * FROM accounts WHERE email = ?",
		[email],
		async function (error, results, fields) {
			if (error) {
				res.send({
					code: 400,
					failed: "error ocurred",
				});
				console.log(error);
			} else {
				if (results.length > 0) {
					const comparision = await bcrypt.compare(
						password,
						results[0].password
					);
					if (comparision) {
						req.session.loggedIn = true
						req.session.username = res.locals.username
						res.redirect("/catalog");
					} else {
						res.send({
							code: 204,
							success: "Email and password does not match",
						});
					}
				} else {
					res.send({
						code: 206,
						success: "Email does not exist",
					});
				}
			}
		}
	);
});

server.post("/registration", async (req, res) => {
	const password = req.body.password;
	const encryptedPassword = await bcrypt.hash(password, 10);
	var users = {
		username: req.body.username,
		password: encryptedPassword,
		email: req.body.email,
	};

	mysql.connection.query(
		"INSERT INTO accounts SET ?",
		users,
		function (error, results, fields) {
			if (error) {
				res.send({
					code: 400,
					failed: "error ocurred",
				});
			} else {
				res.send({
					code: 200,
					success: "user registered sucessfully",
				});
				res.render('administration')
			}
		}
	);
});

server.listen(port, () => {
	console.log("Server listening on http://localhost:" + port);
});

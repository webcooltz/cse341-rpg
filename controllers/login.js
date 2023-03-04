const mongodb = require('../db/connect');
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

		// const user = await mongodb.getDb().db().collection('users').find({ email: email });
		const user = await mongodb.getDb().db().collection('users').findOne({ email: email });
		console.log("user: ", user);
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		// const passwordMatch = await bcrypt.compare(password, user.password);
		if (user.password !== password) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
		res.status(201).json({ accessToken: accessToken });
};

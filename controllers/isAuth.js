function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		next(); // proceed to the next middleware
	} else {
		res.status(401).json({ message: "You did not pass the security check" });
	}
}

module.exports = isAuth;

<<<<<<< HEAD
module.exports = function roleMiddleware(...roles) {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
return res.status(403).json({ message: "Access denied" });
}
next();
};
=======
module.exports = function roleMiddleware(...roles) {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
return res.status(403).json({ message: "Access denied" });
}
next();
};
>>>>>>> 28621a65839c4ebf4b6c66460ef02691ed232291
};
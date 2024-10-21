const jwt = require("jsonwebtoken");

class MiddlewareControllers {
    //verifyToken
    verifyToken = (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            //Bearer 122344
            const accessToken = token.split(" ")[1]; // => 122344
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("you are not authenticated !");
        }
    };

    verifyTokenAndAdmin = (req, res, next) => {
        this.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next();
            } else {
                res.status(403).json("You ars not allowed to delete other !");
            }
        });
    };
}
module.exports = new MiddlewareControllers();

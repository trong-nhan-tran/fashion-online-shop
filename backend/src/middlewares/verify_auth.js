const { unAuthor } = require("./handle_errors");
const jwt = require("jsonwebtoken");

exports.verifyAdmin = (req, res, next) =>{
    const {role_id} = req.user;
    if(role_id!=="R1") return unAuthor("Require role admin", res);
    next();
};
 

exports.verifyToken = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token) return unAuthor("Require authorization", res);
    const accessToken = token.split(" ")[1];

    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) =>{
        if(err){
            const isChecked = err instanceof jwt.TokenExpiredError;
            console.log(isChecked)
            if(!isChecked) return unAuthor("Access token invalid", res);
            if(isChecked) return unAuthor("Access token expired", res);
        }
        req.user = user;
        next()
    })
}
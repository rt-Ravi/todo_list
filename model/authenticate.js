const jwt = require("jsonwebtoken");
const User = require("../userSchema.js");

const Authenticate = async (req, res, next) =>{
    try {
        
        const token = req.body.token;
        if(!token){
            throw new Error('user not found')
        }else{
            const verifyToken = jwt.verify(token, process.env.KEY);
        const rootuser = await User.findOne({_id:verifyToken._id, "tokens.token": token});

        if(!rootuser) {throw new Error('user not found')}

        req.token = token;
        req.rootuser = rootuser;
        req.userid = rootuser._id;
        }

        next();

    } catch (error) {
        res.status(401).send({error: "no user"});
        console.log(error);
    }
}

module.exports = Authenticate;
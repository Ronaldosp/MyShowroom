const jwt = require("jsonwebtoken")
const JWT_SCRET = 'secret'

const signToken= (payload) =>{
    return jwt.sign(payload, JWT_SCRET);
}

const verifyToken=(verify)=>{
    return jwt.verify(verify , JWT_SCRET)
}

module.exports = { signToken , verifyToken }
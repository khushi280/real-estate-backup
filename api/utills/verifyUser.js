import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken'
export const verifyToken=(req, res, next)=>{
    const token = req.header('Authorization')
     if(!token) return next(errorHandler(401, 'Unauthorized User'))
    let jwttoken = token.split(" ")[1];

     try {
                let decodedData = jwt.verify(jwttoken, process.env.JWT_SECRET)
                req.user = decodedData.user
                next()
    }
    catch (error) {
        return next(errorHandler(403,'Forbidden'))
            } 
}

// const jwt = require('jsonwebtoken')

// const authenticateUser = (req, res, next) => {
//     const token = req.header('Authorization')
//     // console.log(token);
//     if(!token){
//         return res.status(401).json({"message": "Unauthorized User"})
//     }
//     let jwttoken = token.split(" ")[1]
//     // console.log(jwttoken);
//     try {
//         let decodedData = jwt.verify(jwttoken, process.env.JWT_SECRET)
//         req.user = decodedData.user
//         next()
//     } catch (error) {
//         res.status(400).json({"message": "Invalid Token"})
//     }
// }

// module.exports = authenticateUser
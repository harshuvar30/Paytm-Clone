import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config.js"

const authMiddleware  = (req,res,next)=>{
    console.log("inside auth ")
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});    
    }

    const token = authHeader.split(' ')[1]
   try{ const decodedUser = jwt.verify(token,JWT_SECRET)
    req.userId = decodedUser.userId
    next();
    }
    catch(error){
        return res.status(403).json({})
    }
}

export default authMiddleware;
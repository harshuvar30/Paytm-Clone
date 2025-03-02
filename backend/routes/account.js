import  express  from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import{ Account} from "../models/user.model.js"
import mongoose from "mongoose";
const router = express.Router()
router.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })
    if(!account)
        return res.status(403).json({message:"Account not found"})

    res.json({
        balance:account.balance
    })
})


router.post("/transfer",authMiddleware,async(req,res)=>{
    console.log("isnide transfer",req.body)
    const session = await mongoose.startSession();
    session.startTransaction()
    const {amount,to} = req.body
    const account = await Account.findOne({
        userId:req.userId
    }).session(session);
    if(!account || account.balance < amount){
        return res.status(403).json({message:"Not sufficienct amount in your account"})
    }

    const toAccount = await Account.findOne({
        userId:to
    }).session(session);

    if(!toAccount)
        return res.status(400).json({
            message:"User not found"
    })
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    await session.commitTransaction();

    res.json({message:'Transfer successfull'});
})
export default router
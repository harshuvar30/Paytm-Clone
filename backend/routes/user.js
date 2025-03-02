// import express from "express";
// import User from "../models/User.js"; // Import the User model

// const router = express.Router();

// // ✅ **Signup Route**
// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// });

// export default router;

import express from "express"
const router = express.Router()

import zod from "zod"
import {User,Account} from "../models/user.model.js"

import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config.js"
import authMiddleware from "../middleware/AuthMiddleware.js"

const signupBody = zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

router.post("/signup",async (req,res)=>{
    const {success} = signupBody.safeParse(req.body)
    console.log("checking body",req.body, "and succes", success)
    if(!success){
        return res.status(411).json({
            message:"Email alreday taken/invalid inputs"
        })
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })
    if(existingUser){
        return res.status(411).json({
            message:"user aleady exists"
        })
    }
    const user = await User.create({
        username:req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    },JWT_SECRET)

    await Account.create({
        userId,
        balance:1 + Math.random()*10000
    })

    res.json({
        message:"User created successfully",
        token:token
    })
})


const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin",async (req,res) =>{
    const {success} = signinBody.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            message:"incorrect inputs"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId:user._id
        },JWT_SECRET)
        res.json({
            token:token
        })
        return
    }

    res.status(411).json({
        message:"error occured while loggin in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName:zod.string().optional()
})

router.put("/update-profile",authMiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success)
        return res.status(411).json({message:'Error while updating the info'})

   try{ await User.updateOne({_id:req.userId},req.body)
    res.json({message:'details updated successfully'});}
    catch(err){
        return res.status(411).json({message:"eerorr while updating profile details"})
    }
})

router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter;
    const users = await User.find({
        $or:[
            { firstName:{"$regex":filter}},
        {lastName:{"$regex":filter}}]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



export default router
// import mongoose from "mongoose";
// import bcrypt from "bcrypt"; // For password hashing

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     unique: true,
//     trim: true,
//     minlength: [3, "Username must be at least 3 characters"],
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//     minlength: [6, "Password must be at least 6 characters"],
//     select: false, // Prevent password from being returned in queries
//   },
// });

// // 🔹 **Pre-save hook to hash the password before saving**
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // 🔹 **Method to compare hashed passwords during login**
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);

// export default User;

import mongoose, { mongo } from "mongoose";
import { number } from "zod";

const userSchema = new mongoose.Schema({
    username:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    minLength:3,
    maxlength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    lastName:
    {
        type:String,
        required:true,
        maxlength:50,
        trim:true
    }
})

const User = mongoose.model('User',userSchema);

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const Account = mongoose.model('Account',accountSchema)
export  {
    User,
    Account,
}
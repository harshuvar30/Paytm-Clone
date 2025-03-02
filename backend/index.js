// const express = require("express");
// import express from "express"


import express from "express";

import connectDB from "./db/db.js";

import rootRouter from "./routes/index.js"

import cors from "cors"

const app = express();
app.use(cors())
app.use(express.json())

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("MongoDB Connected!");
});
app.use("/api/v1",rootRouter);

app.listen(3000, () => console.log("Server running on port 3000"));
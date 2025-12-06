const express = require('express');
const cors = require('cors');
const cookiesParser =require('cookie-parser');
const router = require('./routes/index');
require('dotenv').config();

const app=express();

app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true,
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.json({message:"Server running ", port: process.env.PORT});
});

app.use((req, res, next) => {
  console.log("➡ Incoming:", req.method, req.url);
  next();
});

app.use('/api',router);

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});


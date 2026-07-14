const express = require('express')

const welcomeRouter = express.Router();

welcomeRouter.get('/',(req,res)=>{
  res.json("hello from welcome");
})

module.exports = welcomeRouter;

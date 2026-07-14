const express = require('express');
const {exec, spawn} = require('child_process');
const { run } = require('../services/commandRunner');
const { BADHINTS } = require('dns');

const setupRouter = express.Router();

setupRouter.get('/',(req,res)=>{
  const cmds = `
    cd ~ &&
    mkdir duranta &&
    cd duranta &&
    git clone https://github.com/duranta-project/openairinterface5g
    `;
    try{
      const child = spawn('bash', ['-c', cmds])
      child.stdout.on("data",(data)=>{
        console.log(data.toString());
      })
    child.stderr.on("data",(data)=>{
      console.log(data.toString());
    })
    child.on("error",(error)=>{
      console.log(error.message);
    })
    child.on("close", (code) => {
    if (code === 0) {
      return res.json({
        success: true,
        message: "repo cloned",
      });
    }

    return res.status(500).json({
      success: false,
      message: `cloning failed`,
    });
  });

  }catch(e){
    res.json({
      success: false,
      error: e
    })
  }
});

module.exports = setupRouter
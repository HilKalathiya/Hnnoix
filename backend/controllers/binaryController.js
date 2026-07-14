const processManager = require("../services/processManager");
const {exec} = require("child_process");

exports.startgnb = async (req, res) => {
  try {
    const result = await processManager.startGNB();

    return res.status(200).json({
      success: true,
      message: result.message,
      status: result.status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.stopgnb = async (req, res) => {
  try {
    const result = await processManager.stopGNB();

    return res.status(200).json({
      success: true,
      message: result.message,
      status: result.status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.statusgnb = (req, res) => {
  try {
    const status = processManager.getGNBStatus();

    return res.status(200).json({
      success: true,
      status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.startue = async (req, res) => {
  try {
    const result = await processManager.startUE();

    return res.status(200).json({
      success: true,
      message: result.message,
      status: result.status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.stopue = async (req, res) => {
  try {
    const result = await processManager.stopUE();

    return res.status(200).json({
      success: true,
      message: result.message,
      status: result.status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.statusue = (req, res) => {
  try {
    const status = processManager.getUEStatus();

    return res.status(200).json({
      success: true,
      status,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.corestart = (req,res)=>{
  const cmd = `
    sudo systemctl start open5gs-amfd &&
    sudo systemctl start open5gs-upfd &&
    sudo systemctl start open5gs-smfd
  `
  try{
    exec(cmd,(err, stdout, stderr)=>{
      if(err){
        return res.json({
          success: false,
          error: err.message
        })
      }
      if(stderr){
        return res.json({
          success: false,
          error: stderr
        })
      }
      return res.json({
        success: true
      })
    })
  } catch(e){
    return res.json({
      success: false,
      error: e.message
    })
  }
}

exports.corestop = (req,res)=>{
  const cmd = `
    sudo systemctl stop open5gs-amfd &&
    sudo systemctl stop open5gs-upfd &&
    sudo systemctl stop open5gs-smfd
  `
  try{
    exec(cmd,(err, stdout, stderr)=>{
      if(err){
        return res.json({
          success: false,
          error: err.message
        })
      }
      if(stderr){
        return res.json({
          success: false,
          error: stderr
        })
      }
      return res.json({
        success: true
      })
    })
  } catch(e){
    return res.json({
      success: false,
      error: e.message
    })
  }
}

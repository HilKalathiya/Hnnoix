const fs = require("fs").promises;

const os = require('os');
const path = require('path');
const syncSubscriber = require("../utils/syncSubscriber");
const {uePath, gnbPath, amfPath} = require('../config/path')

const UE_CONFIG = uePath;
const GNB_CONFIG = gnbPath;
const AMF_CONFIG = amfPath;

// GET 
exports.getAllConfigs = async (req, res) => {
  try {
    const [ue, gnb, amf] = await Promise.all([
      fs.readFile(UE_CONFIG, "utf8"),
      fs.readFile(GNB_CONFIG, "utf8"),
      fs.readFile(AMF_CONFIG, "utf8"),
    ]);

    res.json({
      success: true,
      ue,
      gnb,
      amf,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to read configuration files.",
      error: err.message,
    });
  }
};

// POST 
exports.saveAllConfigs = async (req, res) => {
  try {
    const { ue, gnb, amf } = req.body;

    if (
      typeof ue !== "string" ||
      typeof gnb !== "string" ||
      typeof amf !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body.",
      });
    }

    await Promise.all([
      fs.writeFile(UE_CONFIG, ue, "utf8"),
      fs.writeFile(GNB_CONFIG, gnb, "utf8"),
      fs.writeFile(AMF_CONFIG, amf, "utf8"),
    ]);

    await syncSubscriber(ue);

    res.json({

      success: true,

      message: "Configuration files updated successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update configuration files.",
      error: err.message,
    });
  }
};
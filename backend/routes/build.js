const express = require('express');
const {exec, spawn} = require('child_process');

const buildRouter = express.Router() 

let str = `
  sudo debconf-set-selections <<< "iperf3 iperf3/start_daemon  boolean false" 
  sudo debconf-set-selections <<< "wireshark-common wireshark-common/install-setuid boolean true" 
  export DEBIAN_FRONTEND=noninteractive 
`

buildRouter.get("/", (req, res) => {
  const command = `
    cd ~/duranta/openairinterface5g/cmake_targets &&
    ./build_oai -I &&
    sudo apt update && 
    sudo apt install -y libgl1-mesa-dev libglu1-mesa-dev libulfius-dev libdpdk-dev &&
    cd ~/duranta/openairinterface5g/cmake_targets &&
    ./build_oai --gNB -w SIMU &&
    ./build_oai --nrUE -w SIMU  
  `;

  const child = spawn("bash", ["-c", command]);

  child.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  child.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  child.on("close", (code) => {
    if (code === 0) {
      return res.json({
        success: true,
        message: "Dependencies installed successfully.",
      });
    }

    return res.status(500).json({
      success: false,
      message: `Installation failed with exit code ${code}`,
    });
  });
});

module.exports = buildRouter
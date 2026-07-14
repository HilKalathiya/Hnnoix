const os = require('os');
const path = require('path');

const getHomeDir = () => {
  if (process.env.SUDO_USER && process.env.SUDO_USER !== 'root') {
    return `/home/${process.env.SUDO_USER}`;
  }
  return os.homedir();
};

const homeDir = getHomeDir();

const uePath = path.join(homeDir, "duranta/openairinterface5g/targets/PROJECTS/GENERIC-NR-5GC/CONF/ue.conf");

const gnbPath = path.join(homeDir, "duranta/openairinterface5g/targets/PROJECTS/GENERIC-NR-5GC/CONF/gnb.sa.band78.fr1.106PRB.pci0.rfsim.conf");

const amfPath = "/etc/open5gs/amf.yaml";

const binaryPath = path.join(homeDir, "duranta/openairinterface5g/cmake_targets/ran_build/build");

module.exports = {
  uePath,
  gnbPath,
  amfPath,
  binaryPath
}
const os = require('os');
const path = require('path');

// When run via sudo, os.homedir() is /root. We want the real user's home dir.
const getHomeDir = () => {
  if (process.env.SUDO_USER && process.env.SUDO_USER !== 'root') {
    // Basic fallback for linux systems
    return `/home/${process.env.SUDO_USER}`;
  }
  // If the user ran without sudo, or if there's no SUDO_USER, just use homedir
  return os.homedir();
};

const home = getHomeDir();

const uePath = path.join(home,"duranta/openairinterface5g/targets/PROJECTS/GENERIC-NR-5GC/CONF/ue.conf");
const gnbPath = path.join(home,"duranta/openairinterface5g/targets/PROJECTS/GENERIC-NR-5GC/CONF/gnb.sa.band78.fr1.106PRB.pci0.rfsim.conf");
const amfPath = "/etc/open5gs/amf.yaml";
const binaryPath = path.join(home, "duranta/openairinterface5g/cmake_targets/ran_build/build");

module.exports = {
  uePath,
  gnbPath,
  amfPath,
  binaryPath
}
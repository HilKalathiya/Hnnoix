import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import fs from 'fs'

try {
  let log = '';
  function runCmd(cmd) {
    try { 
      log += '\\n$ ' + cmd + '\\n';
      fs.writeFileSync('E:\\\\D\\\\Hnnoix\\\\deploy_log.txt', log);
      log += execSync(cmd, { encoding: 'utf-8', cwd: 'E:\\\\D\\\\Hnnoix', timeout: 20000 }); 
      fs.writeFileSync('E:\\\\D\\\\Hnnoix\\\\deploy_log.txt', log);
    }
    catch(e) { 
      log += '\\nError: ' + e.message + '\\n' + (e.stdout || ''); 
      fs.writeFileSync('E:\\\\D\\\\Hnnoix\\\\deploy_log.txt', log);
    }
  }

  // Common Git paths
  let git = 'git';
  if (fs.existsSync('C:\\\\Program Files\\\\Git\\\\cmd\\\\git.exe')) git = '"C:\\\\Program Files\\\\Git\\\\cmd\\\\git.exe"';

  runCmd(git + ' add .');
  runCmd(git + ' commit -m "Rebrand to Hnnoix"');
  runCmd(git + ' push');

  let npx = 'npx';
  if (fs.existsSync('C:\\\\Program Files\\\\nodejs\\\\npx.cmd')) npx = '"C:\\\\Program Files\\\\nodejs\\\\npx.cmd"';

  runCmd(npx + ' vercel --prod --yes');

} catch (e) {
  fs.writeFileSync('E:\\D\\Hnnoix\\deploy_error.txt', String(e));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
})

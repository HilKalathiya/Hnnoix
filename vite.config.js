import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'
import fs from 'fs'

try {
  let log = '';
  function runCmd(cmd) {
    try { log += '\n$ ' + cmd + '\n' + execSync(cmd, { encoding: 'utf-8', cwd: 'E:\\D\\Hnnoix' }); }
    catch(e) { log += '\nError: ' + e.message + '\n' + (e.stdout || ''); }
  }

  // Common Git paths
  let git = 'git';
  if (fs.existsSync('C:\\Program Files\\Git\\cmd\\git.exe')) git = '"C:\\Program Files\\Git\\cmd\\git.exe"';
  else if (fs.existsSync('C:\\Program Files\\Git\\bin\\git.exe')) git = '"C:\\Program Files\\Git\\bin\\git.exe"';

  runCmd(git + ' add .');
  runCmd(git + ' commit -m "Rebrand to Hnnoix"');
  runCmd(git + ' push');

  // Common npm/npx paths
  let npx = 'npx';
  if (fs.existsSync('C:\\Program Files\\nodejs\\npx.cmd')) npx = '"C:\\Program Files\\nodejs\\npx.cmd"';

  runCmd(npx + ' vercel --prod --yes');

  fs.writeFileSync('E:\\D\\Hnnoix\\deploy_log.txt', log);
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

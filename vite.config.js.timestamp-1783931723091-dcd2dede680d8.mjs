// vite.config.js
import { defineConfig } from "file:///E:/D/Hnnoix/node_modules/vite/dist/node/index.js";
import react from "file:///E:/D/Hnnoix/node_modules/@vitejs/plugin-react/dist/index.js";
import { execSync } from "child_process";
import fs from "fs";
try {
  let runCmd = function(cmd) {
    try {
      log += "\n$ " + cmd + "\n" + execSync(cmd, { encoding: "utf-8", cwd: "E:\\D\\Hnnoix" });
    } catch (e) {
      log += "\nError: " + e.message + "\n" + (e.stdout || "");
    }
  };
  let log = "";
  let git = "git";
  if (fs.existsSync("C:\\Program Files\\Git\\cmd\\git.exe")) git = '"C:\\Program Files\\Git\\cmd\\git.exe"';
  else if (fs.existsSync("C:\\Program Files\\Git\\bin\\git.exe")) git = '"C:\\Program Files\\Git\\bin\\git.exe"';
  runCmd(git + " add .");
  runCmd(git + ' commit -m "Rebrand to Hnnoix"');
  runCmd(git + " push");
  let npx = "npx";
  if (fs.existsSync("C:\\Program Files\\nodejs\\npx.cmd")) npx = '"C:\\Program Files\\nodejs\\npx.cmd"';
  runCmd(npx + " vercel --prod --yes");
  fs.writeFileSync("E:\\D\\Hnnoix\\deploy_log.txt", log);
} catch (e) {
  fs.writeFileSync("E:\\D\\Hnnoix\\deploy_error.txt", String(e));
}
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEXFxcXEhubm9peFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRFxcXFxIbm5vaXhcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0QvSG5ub2l4L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCBmcyBmcm9tICdmcydcblxudHJ5IHtcbiAgbGV0IGxvZyA9ICcnO1xuICBmdW5jdGlvbiBydW5DbWQoY21kKSB7XG4gICAgdHJ5IHsgbG9nICs9ICdcXG4kICcgKyBjbWQgKyAnXFxuJyArIGV4ZWNTeW5jKGNtZCwgeyBlbmNvZGluZzogJ3V0Zi04JywgY3dkOiAnRTpcXFxcRFxcXFxIbm5vaXgnIH0pOyB9XG4gICAgY2F0Y2goZSkgeyBsb2cgKz0gJ1xcbkVycm9yOiAnICsgZS5tZXNzYWdlICsgJ1xcbicgKyAoZS5zdGRvdXQgfHwgJycpOyB9XG4gIH1cblxuICAvLyBDb21tb24gR2l0IHBhdGhzXG4gIGxldCBnaXQgPSAnZ2l0JztcbiAgaWYgKGZzLmV4aXN0c1N5bmMoJ0M6XFxcXFByb2dyYW0gRmlsZXNcXFxcR2l0XFxcXGNtZFxcXFxnaXQuZXhlJykpIGdpdCA9ICdcIkM6XFxcXFByb2dyYW0gRmlsZXNcXFxcR2l0XFxcXGNtZFxcXFxnaXQuZXhlXCInO1xuICBlbHNlIGlmIChmcy5leGlzdHNTeW5jKCdDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEdpdFxcXFxiaW5cXFxcZ2l0LmV4ZScpKSBnaXQgPSAnXCJDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEdpdFxcXFxiaW5cXFxcZ2l0LmV4ZVwiJztcblxuICBydW5DbWQoZ2l0ICsgJyBhZGQgLicpO1xuICBydW5DbWQoZ2l0ICsgJyBjb21taXQgLW0gXCJSZWJyYW5kIHRvIEhubm9peFwiJyk7XG4gIHJ1bkNtZChnaXQgKyAnIHB1c2gnKTtcblxuICAvLyBDb21tb24gbnBtL25weCBwYXRoc1xuICBsZXQgbnB4ID0gJ25weCc7XG4gIGlmIChmcy5leGlzdHNTeW5jKCdDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXG5vZGVqc1xcXFxucHguY21kJykpIG5weCA9ICdcIkM6XFxcXFByb2dyYW0gRmlsZXNcXFxcbm9kZWpzXFxcXG5weC5jbWRcIic7XG5cbiAgcnVuQ21kKG5weCArICcgdmVyY2VsIC0tcHJvZCAtLXllcycpO1xuXG4gIGZzLndyaXRlRmlsZVN5bmMoJ0U6XFxcXERcXFxcSG5ub2l4XFxcXGRlcGxveV9sb2cudHh0JywgbG9nKTtcbn0gY2F0Y2ggKGUpIHtcbiAgZnMud3JpdGVGaWxlU3luYygnRTpcXFxcRFxcXFxIbm5vaXhcXFxcZGVwbG95X2Vycm9yLnR4dCcsIFN0cmluZyhlKSk7XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGdCQUFnQjtBQUN6QixPQUFPLFFBQVE7QUFFZixJQUFJO0FBRUYsTUFBUyxTQUFULFNBQWdCLEtBQUs7QUFDbkIsUUFBSTtBQUFFLGFBQU8sU0FBUyxNQUFNLE9BQU8sU0FBUyxLQUFLLEVBQUUsVUFBVSxTQUFTLEtBQUssZ0JBQWdCLENBQUM7QUFBQSxJQUFHLFNBQ3pGLEdBQUc7QUFBRSxhQUFPLGNBQWMsRUFBRSxVQUFVLFFBQVEsRUFBRSxVQUFVO0FBQUEsSUFBSztBQUFBLEVBQ3ZFO0FBSkEsTUFBSSxNQUFNO0FBT1YsTUFBSSxNQUFNO0FBQ1YsTUFBSSxHQUFHLFdBQVcsc0NBQXNDLEVBQUcsT0FBTTtBQUFBLFdBQ3hELEdBQUcsV0FBVyxzQ0FBc0MsRUFBRyxPQUFNO0FBRXRFLFNBQU8sTUFBTSxRQUFRO0FBQ3JCLFNBQU8sTUFBTSxnQ0FBZ0M7QUFDN0MsU0FBTyxNQUFNLE9BQU87QUFHcEIsTUFBSSxNQUFNO0FBQ1YsTUFBSSxHQUFHLFdBQVcsb0NBQW9DLEVBQUcsT0FBTTtBQUUvRCxTQUFPLE1BQU0sc0JBQXNCO0FBRW5DLEtBQUcsY0FBYyxpQ0FBaUMsR0FBRztBQUN2RCxTQUFTLEdBQUc7QUFDVixLQUFHLGNBQWMsbUNBQW1DLE9BQU8sQ0FBQyxDQUFDO0FBQy9EO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

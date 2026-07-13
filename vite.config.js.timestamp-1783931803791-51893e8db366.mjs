// vite.config.js
import { defineConfig } from "file:///E:/D/Hnnoix/node_modules/vite/dist/node/index.js";
import react from "file:///E:/D/Hnnoix/node_modules/@vitejs/plugin-react/dist/index.js";
import { execSync } from "child_process";
import fs from "fs";
try {
  let runCmd = function(cmd) {
    try {
      log += "\\n$ " + cmd + "\\n";
      fs.writeFileSync("E:\\\\D\\\\Hnnoix\\\\deploy_log.txt", log);
      log += execSync(cmd, { encoding: "utf-8", cwd: "E:\\\\D\\\\Hnnoix", timeout: 2e4 });
      fs.writeFileSync("E:\\\\D\\\\Hnnoix\\\\deploy_log.txt", log);
    } catch (e) {
      log += "\\nError: " + e.message + "\\n" + (e.stdout || "");
      fs.writeFileSync("E:\\\\D\\\\Hnnoix\\\\deploy_log.txt", log);
    }
  };
  let log = "";
  let git = "git";
  if (fs.existsSync("C:\\\\Program Files\\\\Git\\\\cmd\\\\git.exe")) git = '"C:\\\\Program Files\\\\Git\\\\cmd\\\\git.exe"';
  runCmd(git + " add .");
  runCmd(git + ' commit -m "Rebrand to Hnnoix"');
  runCmd(git + " push");
  let npx = "npx";
  if (fs.existsSync("C:\\\\Program Files\\\\nodejs\\\\npx.cmd")) npx = '"C:\\\\Program Files\\\\nodejs\\\\npx.cmd"';
  runCmd(npx + " vercel --prod --yes");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxEXFxcXEhubm9peFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcRFxcXFxIbm5vaXhcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0QvSG5ub2l4L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcbmltcG9ydCBmcyBmcm9tICdmcydcblxudHJ5IHtcbiAgbGV0IGxvZyA9ICcnO1xuICBmdW5jdGlvbiBydW5DbWQoY21kKSB7XG4gICAgdHJ5IHsgXG4gICAgICBsb2cgKz0gJ1xcXFxuJCAnICsgY21kICsgJ1xcXFxuJztcbiAgICAgIGZzLndyaXRlRmlsZVN5bmMoJ0U6XFxcXFxcXFxEXFxcXFxcXFxIbm5vaXhcXFxcXFxcXGRlcGxveV9sb2cudHh0JywgbG9nKTtcbiAgICAgIGxvZyArPSBleGVjU3luYyhjbWQsIHsgZW5jb2Rpbmc6ICd1dGYtOCcsIGN3ZDogJ0U6XFxcXFxcXFxEXFxcXFxcXFxIbm5vaXgnLCB0aW1lb3V0OiAyMDAwMCB9KTsgXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKCdFOlxcXFxcXFxcRFxcXFxcXFxcSG5ub2l4XFxcXFxcXFxkZXBsb3lfbG9nLnR4dCcsIGxvZyk7XG4gICAgfVxuICAgIGNhdGNoKGUpIHsgXG4gICAgICBsb2cgKz0gJ1xcXFxuRXJyb3I6ICcgKyBlLm1lc3NhZ2UgKyAnXFxcXG4nICsgKGUuc3Rkb3V0IHx8ICcnKTsgXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKCdFOlxcXFxcXFxcRFxcXFxcXFxcSG5ub2l4XFxcXFxcXFxkZXBsb3lfbG9nLnR4dCcsIGxvZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tbW9uIEdpdCBwYXRoc1xuICBsZXQgZ2l0ID0gJ2dpdCc7XG4gIGlmIChmcy5leGlzdHNTeW5jKCdDOlxcXFxcXFxcUHJvZ3JhbSBGaWxlc1xcXFxcXFxcR2l0XFxcXFxcXFxjbWRcXFxcXFxcXGdpdC5leGUnKSkgZ2l0ID0gJ1wiQzpcXFxcXFxcXFByb2dyYW0gRmlsZXNcXFxcXFxcXEdpdFxcXFxcXFxcY21kXFxcXFxcXFxnaXQuZXhlXCInO1xuXG4gIHJ1bkNtZChnaXQgKyAnIGFkZCAuJyk7XG4gIHJ1bkNtZChnaXQgKyAnIGNvbW1pdCAtbSBcIlJlYnJhbmQgdG8gSG5ub2l4XCInKTtcbiAgcnVuQ21kKGdpdCArICcgcHVzaCcpO1xuXG4gIGxldCBucHggPSAnbnB4JztcbiAgaWYgKGZzLmV4aXN0c1N5bmMoJ0M6XFxcXFxcXFxQcm9ncmFtIEZpbGVzXFxcXFxcXFxub2RlanNcXFxcXFxcXG5weC5jbWQnKSkgbnB4ID0gJ1wiQzpcXFxcXFxcXFByb2dyYW0gRmlsZXNcXFxcXFxcXG5vZGVqc1xcXFxcXFxcbnB4LmNtZFwiJztcblxuICBydW5DbWQobnB4ICsgJyB2ZXJjZWwgLS1wcm9kIC0teWVzJyk7XG5cbn0gY2F0Y2ggKGUpIHtcbiAgZnMud3JpdGVGaWxlU3luYygnRTpcXFxcRFxcXFxIbm5vaXhcXFxcZGVwbG95X2Vycm9yLnR4dCcsIFN0cmluZyhlKSk7XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDUxNzMsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLGdCQUFnQjtBQUN6QixPQUFPLFFBQVE7QUFFZixJQUFJO0FBRUYsTUFBUyxTQUFULFNBQWdCLEtBQUs7QUFDbkIsUUFBSTtBQUNGLGFBQU8sVUFBVSxNQUFNO0FBQ3ZCLFNBQUcsY0FBYyx1Q0FBdUMsR0FBRztBQUMzRCxhQUFPLFNBQVMsS0FBSyxFQUFFLFVBQVUsU0FBUyxLQUFLLHFCQUFxQixTQUFTLElBQU0sQ0FBQztBQUNwRixTQUFHLGNBQWMsdUNBQXVDLEdBQUc7QUFBQSxJQUM3RCxTQUNNLEdBQUc7QUFDUCxhQUFPLGVBQWUsRUFBRSxVQUFVLFNBQVMsRUFBRSxVQUFVO0FBQ3ZELFNBQUcsY0FBYyx1Q0FBdUMsR0FBRztBQUFBLElBQzdEO0FBQUEsRUFDRjtBQVpBLE1BQUksTUFBTTtBQWVWLE1BQUksTUFBTTtBQUNWLE1BQUksR0FBRyxXQUFXLDhDQUE4QyxFQUFHLE9BQU07QUFFekUsU0FBTyxNQUFNLFFBQVE7QUFDckIsU0FBTyxNQUFNLGdDQUFnQztBQUM3QyxTQUFPLE1BQU0sT0FBTztBQUVwQixNQUFJLE1BQU07QUFDVixNQUFJLEdBQUcsV0FBVywwQ0FBMEMsRUFBRyxPQUFNO0FBRXJFLFNBQU8sTUFBTSxzQkFBc0I7QUFFckMsU0FBUyxHQUFHO0FBQ1YsS0FBRyxjQUFjLG1DQUFtQyxPQUFPLENBQUMsQ0FBQztBQUMvRDtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

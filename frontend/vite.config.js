import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; 
//add plugin

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/api": {
            target: "http://localhost:5000",
         },
      },
   },
});

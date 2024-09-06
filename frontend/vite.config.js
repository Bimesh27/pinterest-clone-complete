import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/api": {
            target: "http://localhost:5000",
            changeOrigin: true, // Ensures proper handling of CORS issues
            // Optional: Log proxy errors
            onError(err, req, res) {
               console.log("Error in proxy:", err);
               res.writeHead(500, {
                  "Content-Type": "text/plain",
               });
               res.end("Something went wrong. Proxy error.");
            },
         },
      },
   },
});

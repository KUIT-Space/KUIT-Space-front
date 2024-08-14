import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import vitePluginSvgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr(), mkcert()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // external: ["react", "react-dom", "styled-components"],
    },
  },
  base: "/KUIT-Space-front/",
  server: {
    https: {
    },
    proxy: {
      "/api": {
        target: "https://project-space.xyz/",
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

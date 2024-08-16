import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { defineConfig } from "vite";
import vitePluginSvgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
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
    proxy: {
      "/api": {
        target: "https://project-space.xyz",
        //changeOrigin: true, //false여야 proxy 정상 작동
        // 요청 경로에서 '/api' 제거
        rewrite: (path) => path.replace(/^\/api/, ""),
        // SSL 인증서 검증 무시
        secure: false,
        // WebSocket 프로토콜 사용
        ws: true,
      },
    },
  },
});

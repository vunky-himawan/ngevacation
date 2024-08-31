import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "./.env",
  envPrefix: "REACT_APP_",
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src/" }],
  },
});

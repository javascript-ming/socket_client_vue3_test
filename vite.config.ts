import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(resolve(__dirname, "./cert/localhost-key.pem")),
      cert: fs.readFileSync(resolve(__dirname, "./cert/localhost.pem"))
    },
    port: 6000
  },
  plugins: [vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});

import reactRefresh from "@vitejs/plugin-react-refresh";
import electron from "vite-plugin-electron";
import { VitePWA } from "vite-plugin-pwa";
import { rmSync } from "fs";
import { join } from "path";
import { defineConfig, Plugin, UserConfig } from "vite";
import { theme } from "./src/app/theme";
// import pkg from "./package.json";

rmSync("dist", { recursive: true, force: true }); // v14.14.0

// let commitHash = "";

// try {
//   commitHash = require("child_process")
//     .execSync("git rev-parse --short HEAD")
//     .toString();
// } catch (e) {
//   // do nothing
// }

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  return defineConfig({
    assetsInclude: ["**/*.gltf"],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          ws: true,
        },
        "/socket.io": {
          target: "http://localhost:8080",
          ws: true,
        },
      },
    },
    plugins: [
      reactRefresh(),
      VitePWA({
        // CQ TODO: figure out what these do
        // registerType: "autoUpdate",
        // devOptions: {
        //   enabled: true, // disable
        // },

        // all below are from https://adueck.github.io/blog/caching-everything-for-totally-offline-pwa-vite-react/
        // add this to cache all the imports
        workbox: {
          globPatterns: ["**/*"],
        },
        // add this to cache all the
        // static assets in the public folder
        includeAssets: ["**/*"],
        manifest: {
          theme_color: theme.light.colors.html.primaryAccent,
          background_color: theme.light.colors.html.primaryAccent,
          display: "standalone",
          scope: "/",
          start_url: "/",
          short_name: "Buzzwords",
          description: "Hexagonal word game",
          name: "Buzzwords.gg",
          // CQ TODO: do icons
          // icons: [
          //   {
          //     src: "/icon-192x192.png",
          //     sizes: "192x192",
          //     type: "image/png",
          //   },
          //   {
          //     src: "/icon-256x256.png",
          //     sizes: "256x256",
          //     type: "image/png",
          //   },
          //   {
          //     src: "/icon-384x384.png",
          //     sizes: "384x384",
          //     type: "image/png",
          //   },
          //   {
          //     src: "/icon-512x512.png",
          //     sizes: "512x512",
          //     type: "image/png",
          //   },
          // ],
        },
      }),
      process.env.DESKTOP
        ? electron({
            main: {
              entry: "electron/main/index.ts",
              vite: withDebug({
                build: {
                  outDir: "dist/electron/main",
                },
              }),
            },
            preload: {
              input: {
                // You can configure multiple preload here
                index: join(__dirname, "electron/preload/index.ts"),
              },
              vite: {
                build: {
                  // For Debug
                  sourcemap: "inline",
                  outDir: "dist/electron/preload",
                },
              },
            },
            // Enables use of Node.js API in the Renderer-process
            // renderer: {},
          })
        : null,
    ],
    build: {
      sourcemap: mode !== "production",
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      // __COMMIT_HASH__: JSON.stringify(commitHash.trim()),
    },
  });
};

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    if (!config.build) config.build = {};
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: "electron-vite-debug",
      configResolved(config) {
        const index = config.plugins.findIndex(
          (p) => p.name === "electron-main-watcher"
        );
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins as Plugin[]).splice(index, 1);
      },
    });
  }
  return config;
}

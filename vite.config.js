import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    root: "src/",
    define: {
      "import.meta.env.VITE_SERVER_URL": JSON.stringify(env.VITE_SERVER_URL),
    },
    build: {
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "src/index.html"),
          cart: resolve(__dirname, "src/cart/index.html"),
          checkout: resolve(__dirname, "src/checkout/index.html"),
          product: resolve(__dirname, "src/product_pages/index.html"),
          product_listing: resolve(__dirname, "src/product_listing/index.html"),
        },
      },
    },
  };
});

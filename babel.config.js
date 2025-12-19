module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["module-resolver", {
        root: ["."],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
          "@src": "./src",
          "@components": "./src/components",
          "@features": "./src/features",
          "@services": "./src/services",
          "@store": "./src/store",
          "@types": "./src/types",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@assets": "./assets"

        }
      }],
    ]
  };
};

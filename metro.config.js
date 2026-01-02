const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
  "@components": path.resolve(__dirname, "src/components"),
  "@constants": path.resolve(__dirname, "src/constants"),
  "@hooks": path.resolve(__dirname, "src/hooks"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@store": path.resolve(__dirname, "src/store"),
};

module.exports = config;

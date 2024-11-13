import type { NextConfig } from "next";
// import UnpluginIcons from 'unplugin-icons/webpack'

const nextConfig: NextConfig = {
  trailingSlash: true,
  output: 'standalone'
};

export default nextConfig;

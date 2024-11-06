import type { NextConfig } from "next";
// import UnpluginIcons from 'unplugin-icons/webpack'

const nextConfig: NextConfig = {
  /* config options here */
  // webpack(config) {
  //   config.plugins.push(
  //     UnpluginIcons({
  //       compiler: 'jsx',
  //       jsx: 'react'
  //     })
  //   )
  //   return config
  // }
  trailingSlash: true
};

export default nextConfig;

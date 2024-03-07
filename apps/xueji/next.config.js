//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'images.xxx.com' }],
  },
  webpack: (config, { isServer, dev }) => {
    config.output.webassemblyModuleFilename =
      isServer && !dev ? '../static/wasm/[modulehash].wasm' : 'static/wasm/[modulehash].wasm'
    // this will override the experiments
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      asyncWebAssembly: true,
    }
    return config
  },
  nx: {
    svgr: false,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 's3.amazonaws.com',
  //       port: '',
  //       pathname: '/my-bucket/**',
  //     },
  //   ],
  // },
}

const plugins = [withNx, withBundleAnalyzer]

module.exports = composePlugins(...plugins)(nextConfig)

import path from "node:path"

const projectRoot = path.resolve()

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
}

export default nextConfig

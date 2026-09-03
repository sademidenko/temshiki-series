import type { NextConfig } from 'next';

// Empty locally; "/temshiki-series" in CI. Only assetPrefix is used: vinext
// keeps index.html at the export root, and GitHub Pages serves that root
// under the repository path, so hashed assets must carry the prefix.
const pagesBasePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: pagesBasePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

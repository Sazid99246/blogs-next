import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import type { MDXComponents } from "mdx/types"

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    ...components,
  }
}

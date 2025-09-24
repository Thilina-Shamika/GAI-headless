import type { NextConfig } from "next";

function getHostnamesFromEnv(): string[] {
  const hosts = new Set<string>();
  // Keep local dev host
  hosts.add("gai.local");
  const candidates = [
    process.env.WP_GRAPHQL_ENDPOINT,
    process.env.WP_REST_BASE,
    process.env.WP_HEADER_URL,
    process.env.WP_SERVICES_URL,
    process.env.WP_MEDIA_HOSTS, // comma-separated list of media hostnames
  ].filter(Boolean) as string[];
  for (const raw of candidates) {
    try {
      if (raw.includes(",")) {
        for (const part of raw.split(",")) {
          const h = part.trim();
          if (h) hosts.add(h.replace(/^https?:\/\//, "").split("/")[0]);
        }
      } else {
        const url = new URL(raw);
        if (url.hostname) hosts.add(url.hostname);
      }
    } catch {}
  }
  return Array.from(hosts);
}

const allowedHosts = getHostnamesFromEnv();

const nextConfig: NextConfig = {
  // Silence workspace root inference when parent has another lockfile
  outputFileTracingRoot: process.cwd(),
  images: {
    // In dev, avoid optimization to prevent 400s when hostnames aren't yet configured
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: allowedHosts.flatMap((hostname) => [
      { protocol: "http", hostname, pathname: "**" as const },
      { protocol: "https", hostname, pathname: "**" as const },
    ]),
  },
};

export default nextConfig;

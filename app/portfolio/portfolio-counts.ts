import { readdirSync } from "node:fs";
import path from "node:path";

/**
 * SERVER-ONLY helper (uses node:fs) - import it only from server
 * components such as app/portfolio/page.tsx, never from a "use client" file.
 *
 * It counts the samples of a category exactly the way that category's own
 * page does: <prefix>-1.<ext> ... <prefix>-500.<ext> inside
 * public/portfolio/<slug>/ (one sample per number, first match only).
 */

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const VIDEO_EXTENSIONS = ["mp4", "mov", "webm", "m4v"];

const MAX_SLOTS = 500;

type CountRule = {
  prefix: string;
  extensions: string[];
};

// Keep prefix / extensions in sync with IMAGE_PREFIX / VIDEO_PREFIX and
// EXTENSIONS at the top of each category's page.tsx.
const COUNT_RULES: Record<string, CountRule> = {
  "brand-identity-design": { prefix: "brand", extensions: IMAGE_EXTENSIONS },
  "stationery-design": { prefix: "stationery", extensions: IMAGE_EXTENSIONS },
  "website-design-&-development": {
    prefix: "website",
    extensions: IMAGE_EXTENSIONS,
  },
  "presentation-design": {
    prefix: "presentation",
    extensions: IMAGE_EXTENSIONS,
  },
  "social-media-post-design": { prefix: "social", extensions: IMAGE_EXTENSIONS },
  "logo-design": { prefix: "logo", extensions: IMAGE_EXTENSIONS },
  "video-editing": { prefix: "video", extensions: VIDEO_EXTENSIONS },
  "social-media-cover-&-banner-design": {
    prefix: "social",
    extensions: IMAGE_EXTENSIONS,
  },
  "product-image-editing": { prefix: "product", extensions: IMAGE_EXTENSIONS },
  "thumbnail-design": { prefix: "thumbnail", extensions: IMAGE_EXTENSIONS },
  "flyer-&-brochure-design": { prefix: "flyer", extensions: IMAGE_EXTENSIONS },
  "vector-tracing": { prefix: "vector", extensions: IMAGE_EXTENSIONS },
};

export function getProjectCount(slug: string): number {
  const rule = COUNT_RULES[slug];
  if (!rule) return 0;

  const folder = path.join(process.cwd(), "public", "portfolio", slug);

  let names: Set<string>;

  try {
    // One directory read instead of thousands of existsSync calls
    names = new Set(readdirSync(folder));
  } catch {
    return 0; // folder does not exist yet
  }

  let count = 0;

  for (let i = 1; i <= MAX_SLOTS; i++) {
    if (rule.extensions.some((ext) => names.has(`${rule.prefix}-${i}.${ext}`))) {
      count++;
    }
  }

  return count;
}

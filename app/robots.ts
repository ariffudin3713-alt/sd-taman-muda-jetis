import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/school";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Rute /m/* adalah versi mobile internal yang disajikan lewat rewrite pada
      // alamat aslinya. Diblokir agar tidak muncul sebagai URL duplikat.
      disallow: ["/m", "/m/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

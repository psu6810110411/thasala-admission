import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thasala-admission.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/apply", "/status"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

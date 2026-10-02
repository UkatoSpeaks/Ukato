import { isTodo, site } from "@/content/data";

/**
 * Origin for absolute URLs (canonical, Open Graph, sitemap). Until `site.url`
 * is filled in, this is the local dev address.
 */
export const siteUrl = isTodo(site.url) ? "http://localhost:3000" : site.url;

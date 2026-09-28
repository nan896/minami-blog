import type { APIRoute } from 'astro'

import { siteConfig } from '../../site.config'
import { localizePath } from '../lib/i18n'

// sitemap 的地址随 site.config.ts 里的部署地址变化，
// 所以这里动态生成，而不是放一个写死域名的 public/robots.txt
export const GET: APIRoute = () => {
  const sitemap = new URL(
    localizePath(siteConfig.defaultLocale, '/sitemap-index.xml'),
    siteConfig.siteUrl,
  ).href

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

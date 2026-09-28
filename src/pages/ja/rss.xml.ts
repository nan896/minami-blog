import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'

import { siteConfig } from '../../../site.config'
import { localizePath } from '../../lib/i18n'
import { getPosts, postPath } from '../../lib/posts'

const locale = 'ja'

export const GET: APIRoute = async (context) => {
  const posts = await getPosts(locale)

  return rss({
    title: `${siteConfig.name} · ${siteConfig.tagline[locale]}`,
    description: siteConfig.bio[locale],
    site: context.site ?? siteConfig.siteUrl,
    trailingSlash: true,
    customData: `<language>ja-jp</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: localizePath(locale, postPath(post)),
      categories: post.data.tags,
    })),
  })
}

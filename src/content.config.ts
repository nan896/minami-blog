import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

import { siteConfig, type Locale } from '../site.config'

const localeCodes = Object.keys(siteConfig.locales) as [Locale, ...Locale[]]
const categorySlugs = siteConfig.categories.map((category) => category.slug) as [string, ...string[]]

/**
 * 文章。文件放在 src/content/posts/ 下，中译文的文件名形如 hello.ja.md。
 * 网址用的是 front matter 里的 slug，与文件路径无关。
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    /** 语言，必须是 site.config.ts 里 locales 的键 */
    lang: z.enum(localeCodes),
    /**
     * 文章的身份标识，同时决定网址：/posts/<key>/。
     * 同一篇的中译两版请用同一个 key——两版靠语言前缀区分，互不冲突，
     * 而这个 key 也是「这两篇是同一篇」的配对依据。
     * 只能用小写字母、数字与连字符。
     */
    key: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string(),
    date: z.coerce.date(),
    /** 分类，必须是 site.config.ts 里 categories 的 slug */
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    /** 出现在列表、搜索结果与分享卡片上的摘要 */
    description: z.string(),
    /** 为真时只在 pnpm dev 里可见，构建时整篇跳过 */
    draft: z.boolean().default(false),
  }),
})

/** 独立页面（关于页等）。文件放在 src/content/pages/ 下。 */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    lang: z.enum(localeCodes),
    key: z.string(),
    title: z.string(),
    description: z.string().optional(),
  }),
})

export const collections = { posts, pages }

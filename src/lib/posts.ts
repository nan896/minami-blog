import { getCollection, type CollectionEntry } from 'astro:content'

import { siteConfig, type Locale } from '../../site.config'
import { categoryPath, localizePath, tagPath } from './i18n'

export type Post = CollectionEntry<'posts'>
export type PageEntry = CollectionEntry<'pages'>

/** 草稿只在本地预览（pnpm dev）里出现，pnpm build 时整篇跳过 */
const showDrafts = import.meta.env.DEV

/** 全部文章，按日期从新到旧 */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => showDrafts || !data.draft)
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/** 某个语言的全部文章 */
export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.lang === locale)
}

/** 取独立页面（关于页等） */
export async function getPage(key: string, locale: Locale): Promise<PageEntry | undefined> {
  const pages = await getCollection('pages')
  return pages.find((page) => page.data.key === key && page.data.lang === locale)
}

/** 文章的逻辑路径（不含语言前缀），也是语言切换的配对依据 */
export function postPath(post: Post): string {
  return `/posts/${post.data.key}/`
}

/** 文章的完整站内链接 */
export function postUrl(post: Post): string {
  return localizePath(post.data.lang, postPath(post))
}

/** 同一篇的另一种语言版本；没有译文时返回 undefined */
export async function getTranslation(post: Post): Promise<Post | undefined> {
  const posts = await getAllPosts()
  return posts.find((item) => item.data.key === post.data.key && item.data.lang !== post.data.lang)
}

/** 语言切换按钮该跳到哪儿；返回空对象表示这篇没有译文，由页面决定回首页 */
export async function getAlternates(post: Post): Promise<Partial<Record<Locale, string>>> {
  const translation = await getTranslation(post)
  if (!translation) return {}
  return { [translation.data.lang]: postUrl(translation) }
}

/** 同一语言里的前后篇：newer 是更新的那篇，older 是更旧的 */
export function getSiblings(posts: Post[], current: Post): { newer?: Post; older?: Post } {
  const index = posts.findIndex((post) => post.data.key === current.data.key)
  if (index < 0) return {}
  return { newer: posts[index - 1], older: posts[index + 1] }
}

export interface TermCount {
  term: string
  count: number
  url: string
}

/** 统计标签出现次数，按次数从多到少 */
export function collectTags(posts: Post[]): TermCount[] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([term, count]) => ({ term, count, url: tagPath(term) }))
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term))
}

export interface CategoryCount {
  slug: string
  name: string
  count: number
  url: string
}

/** 统计分类下的文章数。没有文章的分类也会保留，方便刚开站时看到整套骨架 */
export function collectCategories(posts: Post[], locale: Locale): CategoryCount[] {
  return siteConfig.categories.map((category) => ({
    slug: category.slug,
    name: category.name[locale],
    count: posts.filter((post) => post.data.category === category.slug).length,
    url: categoryPath(category.slug),
  }))
}

export interface YearGroup {
  year: number
  posts: Post[]
}

/** 归档页用：按年份分组，年份从新到旧 */
export function groupByYear(posts: Post[]): YearGroup[] {
  const groups = new Map<number, Post[]>()
  for (const post of posts) {
    const year = post.data.date.getFullYear()
    const list = groups.get(year)
    if (list) list.push(post)
    else groups.set(year, [post])
  }
  return [...groups.entries()]
    .map(([year, list]) => ({ year, posts: list }))
    .sort((a, b) => b.year - a.year)
}

/** 分页。没有文章时也返回一个空页，保证首页与列表页始终能构建出来 */
export function paginate<T>(items: T[], perPage: number): T[][] {
  const result: T[][] = []
  for (let index = 0; index < items.length; index += perPage) {
    result.push(items.slice(index, index + perPage))
  }
  return result.length > 0 ? result : [[]]
}

/** 按当前语言格式化日期 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/** 只要月日，归档页里年份已经分组显示过了 */
export function formatMonthDay(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'zh-CN', {
    month: 'long',
    day: 'numeric',
  }).format(date)
}

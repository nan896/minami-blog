import { siteConfig, type Locale } from '../../site.config'

export type { Locale }

export const defaultLocale: Locale = siteConfig.defaultLocale
export const locales = Object.keys(siteConfig.locales) as Locale[]

export function localeMeta(locale: Locale) {
  return siteConfig.locales[locale]
}

/** 除当前语言以外的语言，用于渲染语言切换按钮 */
export function otherLocales(locale: Locale): Locale[] {
  return locales.filter((item) => item !== locale)
}

/**
 * 生成站内链接：自动带上部署子路径（base）与语言前缀，并统一补上末尾斜杠。
 * 例：localizePath('ja', '/posts/hello/') → '/ja/posts/hello/'
 *     localizePath('zh', '/posts/hello/') → '/posts/hello/'
 */
export function localizePath(locale: Locale, path = '/'): string {
  const base = siteConfig.base.replace(/\/+$/, '')
  const prefix = siteConfig.locales[locale].path ? `/${siteConfig.locales[locale].path}` : ''
  let target = path.startsWith('/') ? path : `/${path}`

  // 形如 /rss.xml 的文件不加末尾斜杠
  const isFile = /\.[a-z0-9]+$/i.test(target)
  if (!isFile && !target.endsWith('/')) target += '/'

  const joined = `${base}${prefix}${target}`
  return joined.startsWith('/') ? joined : `/${joined}`
}

/** 生成完整网址，用于 canonical、OG、RSS 与 sitemap */
export function absoluteUrl(locale: Locale, path = '/'): string {
  return toAbsolute(localizePath(locale, path))
}

/**
 * 把站内路径补成完整网址。hreflang 必须用绝对网址，而站内链接用相对路径更自然，
 * 所以这里单独提供一个转换点；已经是完整网址的原样返回。
 */
export function toAbsolute(href: string): string {
  if (/^https?:\/\//i.test(href)) return href
  const site = siteConfig.siteUrl.replace(/\/+$/, '')
  return `${site}${href.startsWith('/') ? href : `/${href}`}`
}

/** 标签网址：标签是中文/日文，需要转义后才能放进 href */
export function tagPath(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`
}

/** 分类网址 */
export function categoryPath(slug: string): string {
  return `/categories/${slug}/`
}

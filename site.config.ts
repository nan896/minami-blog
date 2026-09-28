/**
 * 站点身份配置。改站名、导航、分类、语言、评论都在这里，不用碰组件。
 *
 * 部署地址不在这里改：推到 GitHub 后会自动推导（见 .github/workflows/deploy.yml）。
 *
 * 这份配置要和 src/content/ 下文章的 front matter 对得上：
 * - category 填下面 categories 里的 slug（essay / tech / collection）
 * - lang 填 locales 里的键（zh / ja）
 */

export type Locale = 'zh' | 'ja'

export interface LocaleMeta {
  /** URL 前缀。默认语言留空，直接挂在根路径 */
  path: string
  /** 写进 <html lang>，Pagefind 靠它分中/日索引，别乱改 */
  htmlLang: string
  /** 语言切换按钮上的文字 */
  label: string
  /** RSS 与 OG 用的 locale 值 */
  ogLocale: string
}

export interface CategoryMeta {
  /** 会写进网址 /categories/<slug>/，定下后尽量别改，否则旧链接会失效 */
  slug: string
  name: Record<Locale, string>
  /** 分类页标题下的一行说明 */
  description: Record<Locale, string>
}

export interface NavItem {
  /** 站内路径，不含语言前缀，组件会按当前语言补上 */
  path: string
  label: Record<Locale, string>
}

/**
 * 部署地址。CI 会自动推导并注入这两个环境变量（见 .github/workflows/deploy.yml），
 * 所以平时不用管；下面的回退值只在本地构建时用。
 */
const deploySite = process.env.SITE_URL ?? 'https://example.com'
const deployBase = process.env.BASE_PATH ?? ''

export const siteConfig = {
  name: 'minami',
  author: 'minami',
  tagline: {
    zh: 'minami 的院子',
    ja: 'minami の庭',
  },
  /** 侧栏个人资料卡与关于页用 */
  bio: {
    zh: '在这里写点随笔，偶尔记一点技术。',
    ja: 'ここに日々のことを少々、たまに技術の話を。',
  },
  /** 头像路径，如 '/avatar.jpg'。留空则显示首字母占位头像 */
  avatar: '',
  /** 分享卡片图，如 '/og.png'（1200×630）。留空则不输出 og:image */
  ogImage: '',
  /** 仓库地址，如 'https://github.com/你/minami-blog'。留空则页脚不显示源码链接 */
  repoUrl: '',

  siteUrl: deploySite,
  base: deployBase,

  defaultLocale: 'zh' as Locale,
  locales: {
    zh: { path: '', htmlLang: 'zh-Hans', label: '中文', ogLocale: 'zh_CN' },
    ja: { path: 'ja', htmlLang: 'ja', label: '日本語', ogLocale: 'ja_JP' },
  } as Record<Locale, LocaleMeta>,

  /** 分类。三个够用，想加减就改这里，记得同步改各语言显示名 */
  categories: [
    {
      slug: 'essay',
      name: { zh: '随笔', ja: '随筆' },
      description: { zh: '想到哪儿写到哪儿。', ja: '思いつくままに。' },
    },
    {
      slug: 'tech',
      name: { zh: '技术', ja: '技術' },
      description: { zh: '踩过的坑与记下的解法。', ja: 'つまずいた話と、その覚え書き。' },
    },
    {
      slug: 'collection',
      name: { zh: '收藏', ja: 'コレクション' },
      description: { zh: '读过、看过、想再提起的东西。', ja: '読んだもの、見たもの、また触れたいもの。' },
    },
  ] as CategoryMeta[],

  /** 页头导航。右上角另有搜索与语言切换，不在这里配 */
  nav: [
    { path: '/', label: { zh: '首页', ja: 'ホーム' } },
    { path: '/categories/', label: { zh: '分类', ja: 'カテゴリ' } },
    { path: '/archive/', label: { zh: '归档', ja: 'アーカイブ' } },
    { path: '/tags/', label: { zh: '标签', ja: 'タグ' } },
    { path: '/about/', label: { zh: '关于', ja: 'このサイト' } },
  ] as NavItem[],

  /** 首页每页文章数 */
  postsPerPage: 10,
  /** 侧栏「最新文章」条数 */
  sidebarLatestPosts: 5,
  /** 侧栏标签云最多几个 */
  tagCloudLimit: 20,

  /**
   * 评论（giscus），默认关闭。
   * 想开启：仓库开启 Discussions，然后到 https://giscus.app 拿到 repoId 与 categoryId 填在这里。
   */
  comments: {
    enabled: false,
    repo: '',
    repoId: '',
    category: 'Announcements',
    categoryId: '',
  },

  /** Cloudflare Web Analytics 的 token。留空则不注入任何统计脚本 */
  analyticsToken: '',
} as const

export type SiteConfig = typeof siteConfig

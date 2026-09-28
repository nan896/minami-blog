import type { Locale } from './i18n'

/**
 * 界面文案。想改导航、按钮、空状态这些字，改这里。
 * 文章内容不在这里，那些在 src/content/ 下。
 */
export interface Dict {
  skipToContent: string
  search: string
  searchPlaceholder: string
  searchEmpty: string
  searchUnavailable: string
  searchHint: string
  latestPosts: string
  categories: string
  tags: string
  archive: string
  about: string
  home: string
  readMore: string
  noPosts: string
  newerPost: string
  olderPost: string
  toc: string
  backToHome: string
  notFoundTitle: string
  notFoundBody: string
  comments: string
  commentsPending: string
  previousPage: string
  nextPage: string
  pageOf: (current: number, total: number) => string
  allTags: string
  allCategories: string
  languageSwitch: string
  rss: string
  sourceCode: string
  draftBadge: string
  postsInCategory: (count: number) => string
  postsWithTag: (count: number) => string
  totalPosts: (count: number) => string
  yearsAgo: (year: number, count: number) => string
  authorBio: string
}

export const ui: Record<Locale, Dict> = {
  zh: {
    skipToContent: '跳到正文',
    search: '搜索',
    searchPlaceholder: '搜索文章…',
    searchEmpty: '什么都没找到。换个词试试？',
    searchUnavailable: '搜索索引还没生成。本地开发时请运行一次 pnpm build，再用 pnpm preview 打开此页。',
    searchHint: '输入关键词后按回车。搜索只在本语言的文章里进行。',
    latestPosts: '最新文章',
    categories: '分类',
    tags: '标签',
    archive: '归档',
    about: '关于',
    home: '首页',
    readMore: '阅读全文',
    noPosts: '这里还没有文章。',
    newerPost: '上一篇',
    olderPost: '下一篇',
    toc: '目录',
    backToHome: '回到首页',
    notFoundTitle: '这个页面不存在',
    notFoundBody: '链接可能写错了，或者这篇文章已经被我删掉。',
    comments: '评论',
    commentsPending: '评论功能还没开启（需要在 site.config.ts 里填上 giscus 配置）。',
    previousPage: '上一页',
    nextPage: '下一页',
    pageOf: (current, total) => `第 ${current} / ${total} 页`,
    allTags: '全部标签',
    allCategories: '全部分类',
    languageSwitch: '语言',
    rss: '订阅',
    sourceCode: '源码',
    draftBadge: '草稿',
    postsInCategory: (count) => `共 ${count} 篇`,
    postsWithTag: (count) => `共 ${count} 篇`,
    totalPosts: (count) => `共 ${count} 篇文章`,
    yearsAgo: (year, count) => `${year} 年（${count} 篇）`,
    authorBio: '简介',
  },
  ja: {
    skipToContent: '本文へ',
    search: '検索',
    searchPlaceholder: '記事を検索…',
    searchEmpty: '何も見つかりませんでした。別の言葉で試してみてください。',
    searchUnavailable:
      '検索インデックスがまだ生成されていません。ローカルでは一度 pnpm build を実行し、pnpm preview でこのページを開いてください。',
    searchHint: 'キーワードを入力して Enter。検索は同じ言語の記事だけを対象にします。',
    latestPosts: '最新の記事',
    categories: 'カテゴリ',
    tags: 'タグ',
    archive: 'アーカイブ',
    about: 'このサイト',
    home: 'ホーム',
    readMore: '続きを読む',
    noPosts: 'まだ記事がありません。',
    newerPost: '新しい記事',
    olderPost: '古い記事',
    toc: '目次',
    backToHome: 'ホームへ戻る',
    notFoundTitle: 'このページはありません',
    notFoundBody: 'リンクが違っているか、記事が削除された可能性があります。',
    comments: 'コメント',
    commentsPending: 'コメントはまだ有効になっていません（site.config.ts に giscus の設定が必要です）。',
    previousPage: '前のページ',
    nextPage: '次のページ',
    pageOf: (current, total) => `${current} / ${total} ページ`,
    allTags: 'すべてのタグ',
    allCategories: 'すべてのカテゴリ',
    languageSwitch: '言語',
    rss: '購読',
    sourceCode: 'ソース',
    draftBadge: '下書き',
    postsInCategory: (count) => `全 ${count} 件`,
    postsWithTag: (count) => `全 ${count} 件`,
    totalPosts: (count) => `全 ${count} 件の記事`,
    yearsAgo: (year, count) => `${year} 年（${count} 件）`,
    authorBio: 'プロフィール',
  },
}

export function t(locale: Locale): Dict {
  return ui[locale]
}

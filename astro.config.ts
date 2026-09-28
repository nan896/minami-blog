import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

import { siteConfig, type Locale } from './site.config'

const locales = Object.keys(siteConfig.locales) as Locale[]

// 部署地址由 site.config.ts 统一给出（它会读 CI 注入的 SITE_URL / BASE_PATH），
// 所以推送到 GitHub 后不需要改任何文件。
export default defineConfig({
  site: siteConfig.siteUrl,
  ...(siteConfig.base ? { base: siteConfig.base } : {}),

  output: 'static',
  trailingSlash: 'always',

  // 代码块默认是深色主题（github-dark），与这个站的暖白底色冲突，换成浅色
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },

  // 中文是默认语言，直接挂在根路径；日文在 /ja/ 下。
  // 因此页面放在 src/pages/ 与 src/pages/ja/ 两处，但真正的实现都在 src/views/ 里共用。
  i18n: {
    defaultLocale: siteConfig.defaultLocale,
    locales,
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: siteConfig.defaultLocale,
        locales: { zh: 'zh-CN', ja: 'ja-JP' },
      },
    }),
  ],

  // Tailwind CSS v4 走 Vite 插件，不需要 @astrojs/tailwind
  vite: {
    plugins: [tailwindcss()],
  },
})

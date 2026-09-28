---
lang: zh
key: markdown-guide
title: 这个站支持的写作格式
date: 2026-09-26
category: tech
tags:
  - Markdown
  - 写作
description: 一份给自己看的排版备忘：标题、代码、表格、引用、脚注在这里分别长什么样。
---

这篇是排版备忘兼样式检查页。写新文章时如果忘了某种语法怎么写，回来抄一段就行。

## 标题与目录

文章开头会根据二、三级标题自动生成目录，所以标题层级尽量别跳级。

### 三级标题长这样

#### 四级标题就有点小了，少用

## 代码

行内代码写成 `pnpm build` 这样。

带语法的代码块：

```ts
interface Post {
  slug: string
  lang: 'zh' | 'ja'
  translationKey: string
  date: Date
}

export function isTranslated(post: Post): boolean {
  return Boolean(post.translationKey)
}
```

终端命令用 `bash`：

```bash
pnpm install
pnpm dev      # 本地预览
pnpm build    # 构建到 dist/
```

## 列表

无序列表：

- 文章是纯文本，放在 `src/content/posts/` 下
- 中译文的文件名形如 `hello.ja.md`
- 写作时把 `draft: true` 写上，构建时就会跳过这篇

有序列表：

1. 打开编辑器
2. 写
3. 推送

## 引用

> 写作最难的部分从来不是写，而是决定今天写什么。

## 表格

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `key` | 是 | 文章的标识，同时决定网址；中译两版写同一个值 |
| `lang` | 是 | `zh` 或 `ja` |
| `title` | 是 | 标题 |
| `date` | 是 | 写成 `2026-09-28` |
| `category` | 是 | `essay` / `tech` / `collection` |
| `tags` | 否 | 标签，写成列表 |
| `description` | 是 | 列表页、搜索结果与分享卡片上的摘要 |
| `draft` | 否 | 为真则只在本地预览里出现 |

## 分隔线与强调

用三个短横线画分隔线：

---

**粗体**、*斜体*、~~删除线~~、[链接](https://example.com)都可以用。

## 图片

图片和文章放在一起：新建一个与文章 key 同名的文件夹放图，然后用相对路径引用。

```markdown
![海边的照片](./markdown-guide/beach.jpg)
```

构建时会自动压缩成 WebP、写入 `width`/`height` 并加上懒加载，所以不必手工转格式。不过原图还是建议先压一道——仓库太大，克隆会变慢。

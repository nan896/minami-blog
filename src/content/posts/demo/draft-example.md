---
lang: zh
key: draft-example
title: 这是一篇草稿（不该出现在线上）
date: 2026-09-28
category: essay
tags:
  - 草稿
description: draft 为真时，这篇只在本地预览可见，构建产物里不会有它，列表、归档、RSS 里也不会。
draft: true
---

如果你在线上看到了这一篇，说明草稿机制坏掉了，请来提一个 issue。

## 草稿怎么用

在 front matter 里写 `draft: true`：

- 本地 `pnpm dev` 时能看到，方便预览排版
- 执行 `pnpm build` 时整篇跳过，不会生成页面
- 也不会出现在首页、分类页、标签页、归档页和 RSS 里

想发布时，把这一行删掉或改成 `draft: false` 即可。

import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/liteblog/',
  title: '我的技术站点',
  description: '记录前端开发的点滴',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/yourname' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/quickstart' }
          ]
        }
      ]
    }
  }
})

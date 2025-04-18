---
layout: home

hero:
  name: 我的技术博客
  text: 记录技术成长的点滴
  tagline: 分享前端开发经验 | 技术文章 | 学习笔记
  image:
    src: /logo.svg
    alt: Logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/yourname

features:
  - icon: 🚀
    title: 最新技术
    details: 分享最新的前端技术栈和开发实践
  - icon: 📚
    title: 学习笔记
    details: 记录学习过程中的重点和难点
  - icon: 💡
    title: 经验分享
    details: 分享实际项目中的经验和解决方案
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style> 
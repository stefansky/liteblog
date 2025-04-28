import { defineConfig } from 'vitepress'

export default defineConfig({
    base: '/liteblog/',
    logo: '/logo.svg',
  title: '我的技术站点',
  description: '记录前端开发的点滴',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '前端', link: '/frontend/' },
      { text: '服务端', link: '/backend/' },
      { text: '项目', link: '/projects/' },
      { text: '面试', link: '/interview/' },
      { text: '前端面试宝典', link: '/interview/practice/all' },
      { text: '创业', link: '/startup/' },
      { text: '人生经历', link: '/life/' },
      { text: 'GitHub', link: 'https://github.com/yourname' }
    ],
    sidebar: {
      '/frontend/': [
        {
          text: 'web基础',
          items: [
            { text: '1.html基础语法', link: '/frontend/web/base' },
            { text: '2.css基础语法', link: '/frontend/web/css' },
            { text: '3.响应式布局', link: '/frontend/web/bootstrap' },
            { text: '4.移动端布局', link: '/frontend/web/mobile' },
            { text: '5.布局应用', link: '/frontend/web/less' }
          ]
        },
        {
          text: 'js基础',
          items: [
            { text: '1.js基础语法', link: '/frontend/js/base' },
            { text: '2.js高级语法', link: '/frontend/js/senior' }
          ]
        },
        {
          text: '其他技术',
          items: [
            { text: '1.测试', link: '/frontend/other/jest' },
            { text: '2.开发规范', link: '/frontend/other/standard' },
            { text: '3.构建工具', link: '/frontend/other/tool' },
            { text: '4.开发自己的npm包', link: '/frontend/other/npm' },
            { text: '5.网络请求', link: '/frontend/other/axios' },
            { text: '6.webpack', link: '/frontend/other/webpack' },
            { text: '7.微前端', link: '/frontend/other/mico' }
          ]
        },
        {
          text: 'vue2技术栈',
          items: [
            { text: '1.基本语法', link: '/frontend/vue2/base' },
            { text: '2.高级知识', link: '/frontend/vue2/senior' },
            { text: '3.vue-router', link: '/frontend/vue2/router' },
            { text: '4.vuex', link: '/frontend/vue2/vuex' },
            { text: '5.服务端SSR', link: '/frontend/vue2/ssr' },
            { text: '6.vue源码及原理', link: '/frontend/vue2/source' },
            { text: '7.项目实战', link: '/frontend/vue2/project' }
          ]
        },
        {
          text: 'vue3技术栈',
          items: [
            { text: '1.vue3基础语法', link: '/frontend/vue3/base' },
            { text: '2.vue-router', link: '/frontend/vue3/router' },
            { text: '3.pinia使用', link: '/frontend/vue3/pinia' },
            { text: '4.ts的使用', link: '/frontend/vue3/ts' },
            { text: '5.vue3源码及原理', link: '/frontend/vue3/source' },
            { text: '6.vue3项目实战', link: '/frontend/vue3/project' }
          ]
        },
        {
          text: 'React技术栈',
          items: [
            { text: '1.React基础语法', link: '/frontend/react/base' },
            { text: '2.React-router', link: '/frontend/react/router' },
            { text: '3.状态管理', link: '/frontend/react/redux' },
            { text: '4.React高级', link: '/frontend/react/senior' },
            { text: '5.React源码及原理', link: '/frontend/react/source' },
            { text: '6.React项目实战', link: '/frontend/react/project' }
          ]
        },
        {
          text: '前端常用UI框架使用',
          items: [
            { text: '1.基本语法', link: '/frontend/ui-frameworks' },
         
          ]
        },
        {
          text: '应用开发',
          items: [
            { text: '1.原生微信小程序', link: '/frontend/weapp/wx' },
            { text: '2.微信小程序高级', link: '/frontend/weapp/senior' },
            { text: '3.跨端小程序开发', link: '/frontend/weapp/uni' },
            { text: '4.React Native', link: '/frontend/weapp/RN' },
            { text: '5.Flutter', link: '/frontend/weapp/Flutter' },
            { text: '6.Electron', link: '/frontend/weapp/Electron' }
          ]
        }
      ],
      '/backend/': [
        {
          text: 'node技术栈',
          items: [
            { text: 'Node.js 基础', link: '/backend/node/base' },
            { text: 'Express/Koa', link: '/backend/node/express' },
            { text: 'Node.js 实战', link: '/backend/node/practice' }
          ]
        },
        {
          text: '数据库',
          items: [
            { text: '数据库基础', link: '/backend/db/base' },
            { text: 'MySQL', link: '/backend/db/mysql' },
            { text: 'MongoDB', link: '/backend/db/mongodb' },
            { text: 'Redis', link: '/backend/db/redis' },
            { text: 'PostgreSQL', link: '/backend/db/postgresql' }
          ]
        },
        {
          text: 'docker',
          items: [
            { text: 'Docker 基础', link: '/backend/docker/base' },
            { text: 'Docker Compose', link: '/backend/docker/compose' },
            { text: 'Docker 实战', link: '/backend/docker/practice' }
          ]
        },
        {
          text: '微服务',
          items: [
            { text: '微服务基础', link: '/backend/micro/base' },
            { text: '服务发现', link: '/backend/micro/discovery' },
           
          ]
        },
        {
          text: '项目架构',
          items: [
            { text: '架构设计', link: '/backend/architecture/design' },
            { text: '性能优化', link: '/backend/architecture/performance' },
            { text: '设计模式', link: '/backend/architecture/design-pattern' },
            { text: '数据结构', link: '/backend/architecture/data-structure' },
            { text: '算法', link: '/backend/architecture/algorithm' }
          ]
        },
        {
          text: '其他技术',
          items: [
            { text: 'Git 使用', link: '/backend/other/git' },
            { text: 'CI/CD', link: '/backend/other/cicd' },
            { text: 'DevOps', link: '/backend/other/devops' }
          ]
        }
      ],
      '/projects/': [
        {
          text: '项目经验',
          items: [
            { text: '介绍', link: '/projects/' },
            { text: '开源项目', link: '/projects/open-source' },
            { text: '商业项目', link: '/projects/commercial' }
          ]
        }
      ],
      '/interview/': [
        {
          text: '面试经验',
          items: [
            { text: '介绍', link: '/interview/' },
            { text: '简历编写', link: '/interview/base' },
            { text: 'h5c3面试题', link: '/interview/practice/h5c3' },
            { text: 'js面试题', link: '/interview/practice/js' },
            { text: 'vue面试题', link: '/interview/practice/vue' },
            { text: 'react面试题', link: '/interview/practice/react' },
            { text: '小程序面试题', link: '/interview/practice/wx' },
            { text: '笔试及手写代码', link: '/interview/practice/code' },
            { text: '算法题解', link: '/interview/algorithms/base' }
          ]
        }
      ],     
      '/startup/': [
        {
          text: '创业经历',
          items: [
            { text: '介绍', link: '/startup/' },
            { text: '创业故事', link: '/startup/stories' },
            { text: '经验分享', link: '/startup/experience' }
          ]
        }
      ],
      '/life/': [
        {
          text: '人生经历',
          items: [
            { text: '介绍', link: '/life/' },
            { text: '成长历程', link: '/life/growth' },
            { text: '生活感悟', link: '/life/thoughts' }
          ]
        }
      ]
    }
  }
})

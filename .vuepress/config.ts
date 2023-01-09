import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'awesome-notes',
  description: 'Awesome Notes',
  // dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  theme: recoTheme({
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'lalifeier',
    docsRepo: 'https://github.com/lalifeier/awesome-notes',
    docsBranch: 'next',
    docsDir: 'awesome-notes',
    lastUpdatedText: '',
    // series 为原 sidebar
    // series: {
      // '/docs/theme-reco/': [
      //   {
      //     text: 'module one',
      //     children: ['home', 'theme']
      //   },
      //   {
      //     text: 'module two',
      //     children: ['api', 'plugin']
      //   }
      // ]
    // },
    navbar:
    [
      { text: '留言板', link: '/docs/message-board', icon: 'Message2' },
      { text: 'GitHub', link: 'https://github.com/lalifeier' },
    ],
    autoSetBlogCategories: true,         // 自动设置分类
    autoAddCategoryToNavbar: true,  // 自动将首页、分类和标签添加至头部导航条
    // bulletin: {
    //   body: []
    // },
    commentConfig: {
      type: 'valine',
      options: {
        serverURLs: 'https://aubga8t2.api.lncldglobal.com',
        appId: 'aUbga8t2lFNgfabTX4N2HYbh-MdYXbMMI',
        appKey: 'dmwfSfLk85mZPDDx8SNHEKVh',
        placeholder: '填写邮箱可以收到回复提醒哦！',
        verify: true, // 验证码服务
        // notify: true,
        recordIP: true,
        // hideComments: true // 隐藏评论
        visitor: true
      }
    },
    // password: ['e10adc3949ba59abbe56e057f20f883e']
  }),
  lang: 'zh-CN',
  // debug: true,
})

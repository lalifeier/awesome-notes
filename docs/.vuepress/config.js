module.exports = {
  title: 'awesome-notes',
  description: '笔记',
  head: [
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' },
    ],
    [
      'script',
      {
        src:
          'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js',
      },
    ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' },
    ],
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/zrender@4.3.0/dist/zrender.js' },
    ],
    ['script', { src: 'https://d3js.org/d3.v5.js' }],
    [
      // https://unpkg.com/three
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.js' },
    ],
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#3eaf7c',
      },
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/icons/apple-touch-icon-152x152.png',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#000000',
      },
    ],
  ],
  serviceWorker: true,
  base: '/',
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    ['@vuepress/back-to-top'],
    [
      'demo-block',
      {
        settings: {
          // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
          // cssLib: ['http://xxx'], // 在线示例中的css依赖
          // vue: 'http://xxx', // 在线示例中的vue依赖
          // react: 'http://xxx', // 在线示例中的react依赖
          // reactDOM: 'http://xxx', // 在线示例中的reactDOM依赖
          jsfiddle: true, // 是否显示 jsfiddle 链接
          codepen: true, // 是否显示 codepen 链接
          horizontal: false, // 是否展示为横向样式
        },
      },
    ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    [
      '@vssue/vuepress-plugin-vssue',
      {
        // 设置 `platform` 而不是 `api`
        platform: 'github',
        locale: 'zh', // 语言设置

        // 其他的 Vssue 配置
        owner: 'OWNER_OF_REPO',
        repo: 'https://lalifeier.github.io',
        clientId: '10eb1f99442d5c53795f',
        clientSecret: '53cce22df6a32da9aae18e50b8e25b12849d9f12',
      },
    ],
  ],
  themeConfig: {
    // logo: "/assets/img/logo.png",
    repo: 'https://github.com/lalifeier/awesome-notes',
    repoLabel: 'Github',
    docsRepo: 'lalifeier/awesome-notes',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新',
    sidebarDepth: 3,
    nav: [
      {
        text: '主页',
        link: '/',
      },
      /*{
        text: '基础',
        items: [
          {
            text: "计算机网络",
            link: "/basis/network/"
          },
          {
            text: "操作系统",
            link: "/basis/system/"
          },
          {
            text: '数据结构与算法',
            link: '/basis/algorithm/',
          },
        ],
      },*/
      {
        text: '前端',
        items: [
          /*{
            text: '基础',
            items: [
              {
                text: 'HTML',
                link: '/fontend/basis/HTML/',
              },
              {
                text: 'CSS',
                link: '/fontend/basis/CSS/',
              },
              {
                text: 'JavaScript',
                link: '/fontend/basis/JavaScript/',
              },
              {
                text: 'ECMAScript',
                link: '/fontend/basis/ECMAScript/',
              },
            ],
          },*/
          {
            text: '',
            items: [
              {
                text: '笔记',
                link: '/fontend/note/',
              },
            ],
          },
          {
            text: '框架',
            link: '/fontend/frame/',
            items: [
              {
                text: 'Vue',
                link: '/fontend/frame/vue/',
              },
            ],
          },
          {
            text: '',
            items: [
              {
                text: '数据可视化',
                link: '/fontend/data-visualization/',
              },
            ],
          },
        ],
      },
      {
        text: '后端',
        items: [
          {
            text: '基础',
            items: [
              {
                text: 'Go',
                link: '/backend/basis/Go/',
              },
              {
                text: 'PHP',
                link: '/backend/basis/PHP/',
              },
              {
                text: 'Java',
                link: '/backend/basis/Java/',
              },
              {
                text: 'Node',
                link: '/backend/basis/Node/',
              },
              {
                text: 'Python',
                link: '/backend/basis/Python/',
              },
            ],
          },
          {
            text: '数据库',
            items: [
              {
                text: 'MySQL',
                link: '/backend/database/MySQL/',
              },
              {
                text: 'Redis',
                link: '/backend/database/Redis/',
              },
              {
                text: 'MongoDB',
                link: '/backend/database/MongoDB/',
              },
            ],
          },
          {
            text: '中间件',
            items: [
              {
                text: 'RabbitMQ',
                link: '/backend/middleware/RabbitMQ/',
              },
              {
                text: 'HAProxy ',
                link: '/backend/middleware/HAProxy/',
              },
              {
                text: 'Nginx',
                link: '/backend/middleware/Nginx/',
              },
            ],
          },
        ],
      },
      {
        text: '工具',
        items: [
          {
            text: 'Git',
            link: '/tool/Git/',
          },
          {
            text: 'Docker',
            link: '/tool/Docker/',
          },
          {
            text: '正则表达式',
            link: '/tool/Regular Expression/',
          },
        ],
      },
      {
        text: '系统',
        items: [
          {
            text: 'CentOS',
            link: '/system/CentOS/',
          },
          {
            text: 'Ubuntu',
            link: '/system/Ubuntu/',
          },
        ],
      },
      {
        text: '库',
        link: '/repository/',
      },
      {
        text: '零星笔记',
        link: '/note/',
      },
    ],
  },
}

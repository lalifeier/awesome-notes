module.exports = {
  title: "blog",
  description: "博客",
  head: [
    ['link', {
      rel: 'icon',
      href: '/icon.png'
    }]
  ],
  serviceWorker: true,
  base: "/",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    // logo: "/assets/img/logo.png",
    repo: 'https://github.com/lalifeier/blog',
    repoLabel: 'Github',
    editLinks: true,
    editLinkText: '编辑此页',
    lastUpdated: '上次更新',
    nav: [{
        text: "主页",
        link: "/"
      },
      {
        text: "基础",
        items: [{
            text: "计算机网络",
            link: "/basis/network/"
          },
          {
            text: "操作系统",
            link: "/basis/system/"
          },
          {
            text: "数据结构与算法",
            link: "/basis/algorithm/"
          }
        ]
      },
      {
        text: "前端",
        items: [{
            text: "基础",
            items: [{
                text: "HTML",
                link: "/fontend/basis/HTML/"
              },
              {
                text: "CSS",
                link: "/fontend/basis/CSS/"
              },
              {
                text: "JavaScript",
                link: "/fontend/basis/JavaScript/"
              }
            ]
          },
          {
            text: "框架",
            items: [{
              text: "Vue",
              link: "/fontend/frame/Vue/"
            }]
          }
        ]
      },
      {
        text: "后端",
        items: [{
            text: "基础",
            items: [{
                text: "Java",
                link: "/backend/basis/Java/"
              },
              {
                text: "Golang",
                link: "/backend/basis/Golang/"
              },
              {
                text: "PHP",
                link: "/backend/basis/PHP/"
              }
            ]
          },
          {
            text: "框架",
            items: [{
              text: "Hyperf",
              link: "/backend/frame/Hyperf/"
            }]
          },
          {
            text: "数据库",
            items: [{
                text: "MySQL",
                link: "/database/frame/MySQL/"
              },
              {
                text: "Redis",
                link: "/database/frame/Redis/"
              },
              {
                text: "MongoDB",
                link: "/database/frame/MongoDB/"
              }
            ]
          }
        ]
      },
      {
        text: "工具",
        items: [{
            text: "Git",
            link: "/tool/Git/"
          },
          {
            text: "Docker",
            link: "/tool/Docker/"
          }
        ]
      },
      {
        text: "零星笔记",
        link: "/note/"
      },
    ],
  }
};
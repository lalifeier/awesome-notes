#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
npm install -g vuepress@next
# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

#git push -f git@github.com:lalifeier/lalifeier.github.io.git master

git push -f https://${GITHUB_TOKEN}@${GITHUB_REPO} master:master

cd -

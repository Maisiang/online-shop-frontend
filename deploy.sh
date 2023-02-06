#!/usr/bin/env sh

# 當發生錯誤時終止腳本運行
set -e

# 建立輸出檔案(打包編譯)
npm run build

# dist目錄初始化git並commit
cd dist
cp index.html 404.html
git init 
git add -A
git commit -m 'deploy'


# dist資料夾強制推送至遠端 gh-pages分支
git push -f https://github.com/Maisiang/online-shop-frontend.git master:gh-pages

cd -
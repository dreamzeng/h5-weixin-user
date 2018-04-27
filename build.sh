#!/bin/bash
####
###编译打包脚本 执行 sh ./build.sh [push to git [version]] 进行打包
###  push to git 是否推送到git仓库   true false
###  version  打包版本
###
version="WEIXIN_H5_V1.2.0"
zipName="WEIXIN_H5_USER"
echo "编译开始，请等待..."
rm -rf ./dist  

echo "start build WEIXIN_H5_USER project..."
npm run build:prod

echo 'zip WEIXIN_H5_USER project'

#if [ -n "$2" ] ;then
#    version=$2
#fi

cd ./dist
#执行打包
rm -rf ../build_zip
mkdir ../build_zip
node ../config/zipProject.js "$zipName"
###创建 jekins编译文件 build.sh 开始
sh ../config/createBuild.sh $zipName
###创建 jekins编译文件 build.sh 结束
# 默认不推送到git仓库
if [ "$1" = "true" ] ;then
    echo 'push to git'
    git init
    git remote add origin http://fywebpc:fywebpc123@192.168.10.81/H5/userline/weixinuserRelease.git
    # 编译的分支需提前创建
    git clean  -d  -fx

    ##先清空远程仓库
    git pull origin $version --allow-unrelated-histories
    git checkout $version
    rm -rf *
    git add .
    git commit -m "clear branch file"
    git push origin $version 

    cp ../build_zip/$zipName.zip ./
    cp -rf ../build_zip/build.sh ./
    git add ./$zipName.zip ./build.sh
    git commit -m "add builded version $version WEIXIN_H5_USER project"
    git push origin $version

    ###合并到master
    git checkout master
    git pull origin master --allow-unrelated-histories
    rm -rf *
    git add .
    git commit -m "clear branch file"
    git push origin master
    git merge $version
    cp ../build_zip/build.sh ./
    git add .
    git commit -m "合并 $version 分支"
    git push origin master
    echo "打包好的文件已推送到git仓库  $version 分支"
    
    #rm -rf ../build_zip
else
    cp ../build_zip/$zipName.zip ../build_zip/build.sh ./
fi
rm -rf ../build_zip

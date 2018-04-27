## 创建jekins编译文件V1 start   ###
zipName=$1
touch ../build_zip/build.sh
cat >  ../build_zip/build.sh << EOF
scp /data/jenkins/workspace/weixin-h5-user/$zipName.zip admin@192.168.10.217:/home/admin/static/front/weixin/$zipName.zip
sshpass -p tester123  ssh -o StrictHostKeyChecking=no admin@192.168.10.217 "cd /home/admin/static/front/weixin;unzip -o $zipName.zip;mv ./$zipName.zip /opt/www/fayi/normal/zip/h5weixinfysn.zip " &>>/dev/null
EOF
## 创建jekins编译文件 end ###
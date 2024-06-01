如果安装electron超时，需要设置NPM镜像
```
npm config set registry https://registry.npmmirror.com
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```

先启动react项目，启动命令：
```
npm start
```

再启动electron项目，本地环境中，react项目是在http://localhost:3000运行，实际就是把原先在浏览器中运行的加载到electron的窗口中，启动命令为：
```
npm run els
```
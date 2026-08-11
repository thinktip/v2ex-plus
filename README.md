# V2EX Plus

V2EX Plus 是一个轻量的 V2EX 浏览体验增强项目。仓库只维护同一套 Lite 功能的三个分发版本：油猴脚本、Chrome 扩展和 Safari Web Extension。

## 功能

- 浅色、深色和跟随系统的主题切换，并尽量减少首屏闪烁
- 导航排序与显示控制、节点图标、页面密度和圆角设置
- 长回复折叠、回复预览、楼层显示、嵌套回复和表情选择
- 图片粘贴、拖放、压缩、预览与远端删除
- 自动签到、回复定位、侧边栏工具和 Base64 辅助工具
- 默认隐藏广告，可在设置中恢复显示

## 目录结构

```text
.
├── userscript/              # 油猴脚本，也是唯一功能源码
│   ├── v2ex-plus.user.js
│   └── safari-dark-prepaint.css
├── chrome/                  # Chrome Manifest V3 扩展
│   └── build.sh
├── safari/                  # Safari Web Extension 与 macOS 宿主工程
│   ├── web-extension/
│   ├── xcode/
│   └── build-local.sh
└── scripts/
    └── sync.mjs             # 从油猴源码生成 Chrome/Safari 运行资源
```

`userscript/v2ex-plus.user.js` 是功能实现的唯一来源。`chrome/lite.js`、`chrome/lite.css`、`safari/web-extension/` 及 Xcode 工程中的扩展资源由同步脚本生成，不要直接修改。

## 安装

### 油猴脚本

先安装 Tampermonkey 或其他兼容的用户脚本管理器，然后打开：

[安装 V2EX Plus 用户脚本](https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js)

Safari 使用油猴脚本时，浏览器可能在脚本执行前先绘制浅色页面。需要严格压制深色模式首帧闪白时，可在 Safari 设置的高级选项中选择 `userscript/safari-dark-prepaint.css` 作为样式表，或改用 Safari 扩展版。

### Chrome 扩展

1. 下载或克隆本仓库。
2. 打开 `chrome://extensions/` 并启用开发者模式。
3. 选择“加载已解压的扩展程序”，指向 `chrome/`。

打包发布文件：

```sh
./chrome/build.sh
```

压缩包会生成在 `chrome/build/`，该目录不会提交到 Git。

### Safari 扩展

使用 Xcode 打开 `safari/xcode/V2EX Plus/V2EX Plus.xcodeproj`，为 App 和 Extension 目标选择自己的 Personal Team 后运行 macOS App 目标。

也可以生成仅供本机开发使用的 ad-hoc 签名版本：

```sh
./safari/build-local.sh
```

未使用 Apple Developer 身份签名的 Safari 扩展只适合本机测试。正常分发仍需要 Apple 签名和公证。

油猴脚本、Chrome 扩展和 Safari 扩展会初始化相同的页面组件，同一浏览器中请只启用一个版本。

## 开发

修改 `userscript/v2ex-plus.user.js` 或 `chrome/` 中的弹窗、预加载脚本和图标后，运行：

```sh
node scripts/sync.mjs
```

该命令会：

1. 从油猴脚本提取主题 CSS 和运行逻辑。
2. 更新 Chrome 与 Safari 的 Manifest 版本。
3. 同步 Safari Web Extension 和 Xcode 工程资源。
4. 更新 Xcode 工程的 `MARKETING_VERSION`。

提交前建议至少执行：

```sh
node scripts/sync.mjs
./chrome/build.sh
```

## 隐私与安全

- 仓库不包含上传令牌、Imgur Client ID、Apple Team ID、证书或本机用户配置。
- 图床凭据仅保存在浏览器本地存储中，不会写入仓库。
- 不要提交 `.env`、证书、描述文件、Xcode `xcuserdata` 或构建产物。
- 自建上传服务时，应使用自己的 HTTPS 地址和访问令牌，并定期轮换凭据。

## 致谢

项目基于 [V2EX Polish](https://github.com/coolpace/V2EX_Polish) 的设计与实现思路持续精简和扩展。

# V2EX Plus

为 V2EX 提供主题、布局、导航和阅读增强，支持单文件油猴脚本、Chrome 扩展和 Safari Web Extension。

[安装油猴版](https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js) · [下载扩展](https://github.com/thinktip/v2ex-plus/releases/latest)

## 功能

- 浅色、深色及跟随系统主题，适配桌面和移动页面。
- 导航与图标优化、通知入口、侧栏工具。
- 长回复折叠、回复预览与定位、嵌套回复、表情选择。
- 图片选择、粘贴及拖放上传。
- 登录后每日自动检查并领取奖励，默认隐藏广告。

## 安装油猴版

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或兼容的用户脚本管理器。
2. 点击[安装脚本](https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js)，确认安装后刷新 V2EX。
3. Chrome 用户按脚本管理器提示启用“允许用户脚本”或开发者模式。iOS Safari 用户需在脚本管理器中启用脚本并允许访问 V2EX。

油猴版没有扩展设置面板，使用默认参数；页面内的主题切换和导航操作仍可使用。默认启用回复增强、表情和侧栏工具，图片压缩与远端删除默认关闭。

**同一浏览器只启用一种版本。** 从旧版迁移时，请停用旧的 `v2ex.polish.style.js`、`v2ex.polish.plus.js` 及其他 V2EX 美化脚本，再安装新版单文件脚本。

## 安装 Chrome 扩展

1. 在 [Releases](https://github.com/thinktip/v2ex-plus/releases/latest) 下载最新的 `V2EX-Plus-Chrome-版本号.zip` 并解压。
2. 打开 `chrome://extensions/`，开启“开发者模式”。
3. 点击“加载已解压的扩展程序”，选择包含 `manifest.json` 的目录。
4. 刷新 V2EX，点击扩展图标打开设置。

更新时用新版文件替换原目录，再到扩展管理页点击重新加载。也可下载仓库 ZIP，直接加载其中的 `chrome/` 目录。

## 安装 Safari 版

[Releases](https://github.com/thinktip/v2ex-plus/releases/latest) 提供 `V2EX-Plus-Safari-Source-版本号.zip`。这是源码包，不是已签名安装包。

1. 在 Mac 安装完整 Xcode，解压源码包。
2. 打开 `safari/xcode/V2EX Plus/V2EX Plus.xcodeproj`。
3. 在 App 和 Extension 两个目标的 Signing & Capabilities 中选择自己的 Team，启用自动签名。
4. 选择 `V2EX Plus` scheme 和本机 Mac，运行 App。
5. 在 Safari 设置 → 扩展中启用 V2EX Plus，并允许访问 V2EX。

Safari 原生扩展带设置面板；iOS Safari 可使用上面的油猴版安装方式。

移动端调整导航顺序时，打开自定义导航菜单，拖动节点左侧的六点把手；拖到列表上下边缘可自动滚动。滑动节点文字区域可正常滚动列表。

## 图片上传

默认使用项目专用 Imgur Client ID 匿名上传，无需配置，不绑定个人 Imgur 账户。使用默认 ID 的用户共享应用额度。

Chrome / Safari 扩展可填写自己的 Imgur Client ID，留空使用默认值；也可选择 Cloudflare R2，填写兼容上传服务的 HTTPS 地址和访问令牌。自定义地址可能需要额外站点权限。图片上传后插入原始 URL，由 V2EX 解析。

HEIC/HEIF 会在浏览器支持解码时自动转为 JPEG；不支持 HEIC 解码的浏览器需先导出为 JPEG/PNG。图片压缩默认关闭，开启后 Imgur 使用 JPEG 或保留透明背景的 PNG，避免上传不被接受的 WebP。

## 开发与打包

共同源码为 `userscript/v2ex-plus.user.js`，修改后同步生成扩展文件：

```sh
node scripts/sync.mjs
node --test tests/*.test.mjs
./chrome/build.sh
```

需要 Node.js 和 zip，Chrome 包输出到 `chrome/build/`。Safari 本机构建需要完整 Xcode 和自己的签名团队，可使用 `safari/build-local.sh`。

## 隐私与权限

- 扩展设置保存在浏览器本地；签到使用 V2EX 登录状态。
- 图片仅在主动上传时发送到所选图床，表情图片从 Imgur 加载。
- 公开源码包含用于匿名上传的 Client ID，不包含 Client Secret、私人上传令牌、证书或签名资料。
- 请勿将个人凭据、浏览器存储导出或本机配置提交到仓库。

## 致谢

基于 [coolpace / V2EX Polish](https://github.com/coolpace/V2EX_Polish) 的设计与实现思路持续调整。

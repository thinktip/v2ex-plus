# V2EX Plus

为 V2EX 提供主题、布局、导航和阅读增强。当前版本 **1.13.42**，提供 **单文件油猴脚本**、**Chrome 扩展**和 **Safari Web Extension**。

[安装油猴版](https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js) · [下载 Chrome 扩展](https://github.com/thinktip/v2ex-plus/releases/latest) · [Safari 安装说明](#安装-safari-版) · [查看 Chrome 源码](chrome/)

## 1.13.42 更新

- 补齐 V2EX 移动模板适配：顶部 Logo、搜索、主题切换和原生导航菜单共用移动布局。
- 修复移动端回复头像超出表格列宽、遮挡文字的问题，恢复长回复折叠与嵌套回复的共同内容根节点。
- 适配窄屏、横屏与深色主题；移动端以网站实际模板识别，不仅依赖屏幕宽度。

## 1.13.41 更新

- 图床地址、令牌和服务类型一起校验保存；授权失败不会混用旧地址和新令牌。
- 修复回复预览清空、重复内容及请求乱序问题，离开预览时取消旧请求。
- 修复长回复折叠后切换嵌套回复时的内容识别问题。
- 图片统一插入原始 URL，由 V2EX 自身解析，不自动包装 Markdown。
- 原生扩展批量读取并缓存设置，通过存储变化通知更新页面。
- 普通请求最多等待 15 秒，图片上传 60 秒，可选余额查询 5 秒；超时不会自动重试上传或领取奖励。签到经服务器确认后立即记录成功。

## 从旧版迁移

以前需要同时安装 `v2ex.polish.style.js` 和 `v2ex.polish.plus.js`（或对应的 `.user.js` 文件）。现在只安装 **`v2ex-plus.user.js` 一个文件**，样式和功能已经合并。

1. 在油猴管理面板停用或删除旧的 **V2EX Plus - style**、**V2EX Plus - plus**，以及旧 Lite 脚本。
2. 点击上方“安装油猴版”，确认安装后刷新 V2EX。
3. 同一浏览器只启用油猴版或 Chrome 扩展版中的一种，避免重复处理页面。

旧双脚本位于之前的 V2ex-Polish-Plus 仓库，本仓库只维护新版单文件脚本。旧双脚本不会自动合并升级，需要手动完成上述迁移；新版包含自动更新地址。旧版独立设置不会导入新版。

## 功能

- 浅色、深色、跟随系统主题，优化页面布局与阅读宽度。
- 导航排序、节点图标、通知入口和侧边栏工具。
- 长回复折叠、回复预览、回复定位、楼层及嵌套回复。
- 表情选择、Base64 辅助工具。
- 登录后每日首次打开页面自动检查并领取每日奖励。
- 默认隐藏广告。
- Chrome 版可配置图片选择、粘贴、拖放上传，以及压缩、预览和远端删除。

## 安装油猴版

1. 安装 [Tampermonkey](https://www.tampermonkey.net/)。
2. Chrome 用户在扩展详情中启用“允许用户脚本”，或按 [Tampermonkey 官方说明](https://www.tampermonkey.net/faq.php?locale=zh&q=Q209)启用开发者模式。
3. 点击[安装单文件油猴脚本](https://raw.githubusercontent.com/thinktip/v2ex-plus/main/userscript/v2ex-plus.user.js)，在 Tampermonkey 页面确认安装。
4. 打开或刷新 [V2EX](https://www.v2ex.com/)。若链接只显示源码，可在油猴管理面板新建脚本，将完整内容粘贴进去并保存。

iOS Safari 用户需在所用脚本管理器中启用本脚本，并允许访问 V2EX。更新后重新载入页面；若仍显示旧布局，请确认旧双脚本与其他 V2EX 美化扩展已停用。移动端采用紧凑顶部与原生下拉菜单，沿用桌面端主题配色。

油猴版**没有扩展设置面板，相关设置固定使用当前 Chrome 版的默认参数**。页面内的主题切换和导航操作仍可使用，主题初始为跟随系统。

| 设置 | 默认值 |
| --- | --- |
| 列表间距 / 回复行高 / 卡片圆角 | 标准 / 1.6 / 18px |
| 长回复折叠 / 回复预览 / 自动定位回复 | 开启 |
| 楼层 / 嵌套回复 / 节点图标 / 表情 | 开启 |
| 固定侧栏工具 / 上传预览 | 开启 |
| 默认展开回复工具栏 / 显示广告 | 关闭 |
| 图片压缩 / 远端删除 | 关闭 |
| 压缩质量（开启压缩时） | 82% |
| 图床 | Imgur，Client ID 默认为空 |

**油猴版未附带图床凭据，默认不能直接上传图片。** 可手动粘贴图片链接；需要上传功能时，请使用 Chrome 扩展并填写自己的图床配置。脚本不会读取旧油猴版保存的图床凭据。

用户脚本的注入时间由浏览器和脚本管理器决定，无法保证深色模式首帧完全无闪烁。

## 安装 Chrome 扩展

1. 在 [Releases](https://github.com/thinktip/v2ex-plus/releases/latest) 下载 `V2EX-Plus-Chrome-1.13.41.zip`，解压到一个固定目录。
2. 打开 `chrome://extensions/`，开启右上角“开发者模式”。
3. 点击“加载已解压的扩展程序”，选择解压后包含 `manifest.json` 的目录。
4. 刷新 V2EX。点击浏览器工具栏的 V2EX Plus 图标即可修改设置。

也可下载本仓库 ZIP，解压后选择其中的 `chrome/` 文件夹。此分发方式是本地加载扩展，并非 Chrome 应用商店安装；更新时用新版文件替换原目录，再到扩展管理页点击重新加载。

### 图片上传

在扩展设置中选择 Imgur 或 Cloudflare R2：Imgur 需要填写自己的 Client ID；R2 需要填写与本扩展上传协议兼容的 HTTPS 服务地址和访问令牌。源码保留当前 Chrome 版默认的 R2 服务地址，但不包含访问令牌，也不代表提供公共上传额度。自定义域名可能触发额外站点权限请求。

## 安装 Safari 版

[Releases](https://github.com/thinktip/v2ex-plus/releases/latest) 提供 `V2EX-Plus-Safari-Source-1.13.41.zip`，包含 Safari 扩展资源、Xcode 工程及构建所需的共同源码。**这是源码包，不是双击即可安装的已签名 App。**

1. 在 Mac 安装完整 Xcode，解压 Safari 源码包（也可克隆本仓库）。
2. 用 Xcode 打开 `safari/xcode/V2EX Plus/V2EX Plus.xcodeproj`。
3. 在 App 和 Extension 两个目标的 Signing & Capabilities 中选择你自己的 Team，启用自动签名。
4. 选择 `V2EX Plus` scheme 和本机 Mac，运行 App。
5. 在 Safari 设置 → 扩展中启用 V2EX Plus，并允许访问 V2EX。

Safari 原生扩展带设置弹窗，使用方法与 Chrome 版类似。个人开发签名受账号和有效期限制，对外分发 App 需要适当的签名与公证；本项目不公开上传个人开发签名包、证书或描述文件。

也可把自己的 Team ID 写入本机 `safari/.development-team`（已被 Git 忽略），在源码包根目录运行：

```sh
./safari/build-local.sh
```

该脚本生成本机开发签名归档，默认目标架构为 Apple Silicon（arm64）。本次公开发布验证 Xcode 编译和扩展资源同步，不包含个人签名安装验证。

## 开发与打包

`userscript/v2ex-plus.user.js` 是共同功能源码。修改后运行同步脚本生成 Chrome、Safari Web Extension 和 Xcode 资源，不要直接修改生成文件。

```sh
node --check userscript/v2ex-plus.user.js
node scripts/sync.mjs
node --test tests/*.test.mjs
./chrome/build.sh
```

需要 Node.js 和 `zip`。Chrome ZIP 位于 `chrome/build/`。Safari 本机构建另外需要完整 Xcode 和自己的签名团队。油猴版在无扩展运行环境时使用默认设置，并内置页面编辑器桥接；Chrome/Safari 保留原生设置面板及独立 MAIN-world 桥接。

```text
userscript/          单文件油猴脚本与共同功能源码
chrome/              Chrome 扩展、设置面板和打包脚本
safari/web-extension/ Safari 扩展资源
safari/xcode/        macOS 宿主 App 与扩展工程
scripts/sync.mjs     三个版本的资源同步脚本
tests/               行为与分发回归检查
```

## 隐私与权限

- 本次分发不包含浏览器个人配置、上传令牌、私钥、证书或 Safari 本机签名信息。
- Chrome 图床配置保存在扩展本地存储中；主题、导航及签到状态使用浏览器本地存储。
- 签到请求使用你在 V2EX 的登录状态；图片上传仅在主动操作时发送到所选图床；表情图片从 Imgur 加载。
- Chrome 申请 V2EX、默认图床访问权限，以及设置存储和当前标签页操作权限；自定义图床使用可选站点权限。油猴版只匹配 V2EX HTTPS 页面，无外部脚本依赖。
- 请勿将 `.env`、浏览器存储导出、Token、证书或本机配置提交到仓库。

## 致谢

基于 [coolpace / V2EX Polish](https://github.com/coolpace/V2EX_Polish) 的设计与实现思路持续调整。

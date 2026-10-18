# InstaCourse · 多平台刷课助手官网

根据 InstaCourse-Portable-1.0.0-x64-P3Rv2.zip 中的项目说明制作的中文宣传网站。

## 下载 Windows 便携版

**[下载 InstaCourse v1.0.0 / P3Rv2（Windows x64，约 110 MB）](https://instacourse.gaiqi7564.chatgpt.site/download.html)**

[自定义域名下载入口](https://insta.qigai.de5.net/download.html)（该入口需完成 Cloudflare Pages 与域名绑定后生效）

打开下载页后点击「下载 Windows 便携包」。下载的是完整 ZIP；完整解压后运行 `InstaCourse.exe`，保留 `resources`、`locales` 等同目录文件，不提供缺少依赖的独立 EXE。

## 视觉风格

深海蓝夜底（#020716）、品牌蓝（#1D4CFF）、青色（#4FE3FF）；粗斜体标题与数字、-12° 斜切、真实边框与折角、硬阴影。背景网格与扫描线仅作为边缘装饰。仅借用设计语言，不使用官方 Persona 素材或 Logo。

## 文件

- `index.html`：网站入口，位于仓库根目录。
- `style.css`：P3R 风格的深海蓝夜、斜切、硬阴影与青色高光，适配桌面与移动端。
- `app.js`：仪表盘、平台、题库、日志的交互演示。
- `download.html`：可独立打开的便携包下载入口。
- `download.js`：下载进度、原版 ZIP 分片重组与 SHA-256 校验。
- `icon.svg`：网站图标。
- `使用说明.txt`、`LICENSE.txt`：便携包附带的说明与许可证；不修改仓库已有的 LICENSE。
- `functions/release/[[path]].js`：Cloudflare Pages 下载资源代理，仅允许 manifest.json 与 part-XX.bin。

无前端构建步骤，无 npm 依赖。网站介绍的是 Windows 桌面软件，并没有把桌面程序改成在线刷课工具。

## 发布到 Cloudflare Pages

1. Cloudflare 控制台 → Workers & Pages → 创建应用 → Pages → 连接 GitHub。
2. 授权并选择 `GaiQi-NJUST/insta-course`。
3. 生产分支 `main`，框架预设 `None`，构建命令 `exit 0`，输出目录 `/`，根目录保持默认。
4. 点击保存并部署，等待项目显示成功，先检查 Cloudflare 实际分配的 `*.pages.dev` 地址。
5. 到该 Pages 项目的 Custom domains，添加 `insta.qigai.de5.net`，按提示完成 DNS 绑定。
6. 如果 DNS 中已存在名为 `insta` 的旧 CNAME，修改为此次 Pages 分配的地址；不要为同名主机叠加多条 CNAME。
7. 等待域名与 HTTPS 证书状态生效。后续推送到 main 会触发自动部署。

只修改 insta 子域名，不要改动主域名 qigai.de5.net 已有的 edgetunnel Worker 绑定。

## 下载资源

原版 ZIP 为 114,683,393 字节，未提交到此代码仓库。下载资源来自已发布的公共站点：

`https://instacourse.gaiqi7564.chatgpt.site/release/`

Pages Function 对上述资源做同源转发，前端将分片重组为原始 ZIP，校验 SHA-256：

`ec09f23505182d1a4d2bcf3367d5704e2acb9c2e16591ebd009d0a04006d1b0d`

因此要保持该资源站点可用；以后可将安装包上传到自己的 GitHub Releases 或 R2，再修改下载方式。

本地静态预览（`python -m http.server 8000`）可查看页面和演示，但不运行 Pages Function，下载需在 Cloudflare Pages 上验证。GitHub Pages 也不执行此 Function；推荐使用上面的 Cloudflare Pages 部署方式。

## 验证与说明

已检查脚本语法、链接和页面锚点；已验证交互逻辑以及原始 ZIP 的分片重组与校验。浏览器视觉检查未完成，Pages Function 需在目标托管环境验证。

平台清单来自安装包，收录入口不等于所有课程已经过实测。软件使用应遵守相应平台协议与学校规定。

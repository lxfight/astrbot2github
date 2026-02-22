# astrbot2github

[![Visitors](https://visitor-badge.laobi.icu/badge?page_id=lxfight.astrbot2github)](https://visitor-badge.laobi.icu)

为 [AstrBot](https://github.com/AstrBotDevs/AstrBot) 用户打造的 GitHub 加速代理服务，基于免费且强大的 [Deno Deploy](https://deno.com/deploy) 平台。

[![Powered by DartNode](https://dartnode.com/branding/DN-Open-Source-sm.png)](https://dartnode.com "Powered by DartNode - Free VPS for Open Source")

## 你是否遇到过这种情况？

> *   在服务器上部署了心爱的 AstrBot
> *   兴冲冲地打开插件市场，准备扩展功能
> *   精心挑选了几个看起来很棒的插件
> *   点击“安装”... 却无情地看到...
> *   **安装失败！** 😭

更令人沮丧的是，即使尝试了 AstrBot 设置中提供的官方 GitHub 代理地址，问题依旧无法解决？这通常是因为网络环境复杂，导致你的服务器无法稳定连接到 GitHub 或其资源。

## 解决方案：astrbot2github ✨

本项目 `astrbot2github` 提供了一个简单、免费且有效的解决方案：

利用 Deno Deploy 的全球边缘网络为你创建一个专属的 GitHub 资源代理。只需简单几步部署，即可显著提高 AstrBot 插件的下载和安装成功率。

## 主要特性

*   🚀 **加速访问**: 通过 Deno Deploy 全球节点代理 GitHub 请求，有效解决网络问题。
*   🆓 **免费部署**: 利用 Deno Deploy 的慷慨免费套餐，零成本搭建和运行。
*   🔧 **一键部署**: 提供 Deno Deploy 按钮，简化部署流程。
*   🎯 **精准适配**: 专门针对 AstrBot 获取插件列表 (`market.json`) 和下载插件 `.zip` 包的模式进行了优化。
*   🔒 **专属服务**: 你将拥有一个自己控制的、独立的代理服务地址。

## 部署与使用教程

> 在现在的Deno的个人面板中，已经移除了“New Project”按钮，由“New App”替代。其URL也发生了变化 [参考这里](#验证部署)

按照以下步骤，轻松部署你自己的 AstrBot GitHub 加速服务：

1.  **(可选但推荐)** 给本项目点个 [**Star ⭐**](https://github.com/lxfight/astrbot2github)，你的支持是作者更新和维护的动力！
2.  **Fork 本项目**: 点击页面右上角的 [**Fork**](https://github.com/lxfight/astrbot2github/fork) 按钮，将此项目复刻到你自己的 GitHub 账号下。
3.  **登录 Deno Deploy**: 访问 [Deno Deploy](https://dash.deno.com/) 并使用你的 GitHub 账号登录（如果尚未注册，会自动引导注册）。
4.  **创建新项目**:
    *   点击 **New Project** (或 **新建项目**)。
    *   选择 **Deploy from GitHub repository** (带有 GitHub 图标的那个选项)。
    *   授权 Deno Deploy 访问你的 GitHub 仓库。
5.  **选择仓库**: 在仓库列表中，找到并选择你刚刚 Fork 的 `astrbot2github` 项目。
6.  **配置部署**:
    *   **Production Branch**: 保持默认 (`main`) 即可。
    *   **Entrypoint**: **这是关键步骤！** 点击下拉框，找到并选择 `deno_index.ts` 文件作为入口点。
    *   **Project Name**: Deno 会自动生成一个项目名称，这将是你的服务地址的一部分。你可以保留自动生成的名称 (例如 `fluffy-donkey-12`)，也可以自定义一个**全局唯一**的名称 (例如 `my-astrbot-proxy`)。 记下这个名称，你的服务最终地址将是 `https://<你的项目名>.deno.dev`。
7.  **开始部署**: 确认设置无误后，点击 **Link** 或 **Deploy** 按钮。Deno 将自动拉取代码、构建并部署你的服务。稍等片刻即可完成。
8.  **获取服务地址**: 部署成功后，页面会显示你的服务地址，格式为 `https://<第6步设置的项目名>.deno.dev`。复制这个地址。
9.  **配置 AstrBot**:
    *   回到你的 AstrBot WebUI。
    *   进入 **设置 (Settings)** 页面。
    *   找到 **GitHub 加速地址 (GitHub Proxy)**
    *   将**第 8 步**复制的 Deno 服务地址完整粘贴进去。

🎉 **完成！** 现在 AstrBot 在访问插件市场和下载插件时，将会通过你刚刚部署的 Deno 服务进行代理。

## 验证部署

部署完成后，你可以通过直接在浏览器中访问你的 Deno 服务地址来验证是否成功：

`https://<你的项目名>.deno.dev`

如果页面显示 `此地址只用于为astrbot提供更快速的github访问服务` 的信息，则表示你的代理服务已成功部署并正在运行。

在新版本的astrbot中，需要在 **插件市场** 配置插件源，源地址格式：

`https://<App名称>.<组织别名>.deno.net/https://raw.githubusercontent.com/AstrBotDevs/AstrBot_Plugins_Collection/refs/heads/main/plugins.json`

> `https://raw.githubusercontent.com/AstrBotDevs/AstrBot_Plugins_Collection/refs/heads/main/plugins.json`是官方仓库提供的插件列表。

## 注意事项

*   **专为 AstrBot 设计**: 本项目主要解决了 AstrBot 在下载插件 `.zip` 包 (`/raw/` 或 `/archive/`) 时可能遇到的网络问题。它针对 AstrBot 的特定请求路径进行了优化，并非一个通用的 GitHub 网站或 API 代理。
*   **Deno Deploy 免费额度**: Deno Deploy 提供非常慷慨的免费套餐（包括每月大量的请求数和数据传输量），对于 AstrBot 的使用场景通常绰绰有余。但仍需注意，超出免费额度可能会产生费用或服务受限，请自行查阅 [Deno Deploy Pricing](https://deno.com/deploy/pricing)。
*   **更新**: 如果本项目有重要更新，你可能需要同步你 Fork 的仓库，Deno Deploy 通常会自动重新部署更新后的代码。

---

希望这个 `astrbot2github` 项目能帮助你顺畅地使用 AstrBot 插件市场！如果遇到问题，欢迎提出 Issue。

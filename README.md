# DSH Workspace Colors

给 DeepSeek Harness 工作区设置颜色标识，适配 **v0.1.7-alpha.1**。侧栏底部的调色板按钮打开设置；每个工作区可选择红、橙、绿、蓝、紫、粉色或恢复默认。颜色显示为工作区行左侧色条与文件夹图标颜色，支持深色/浅色主题。插件不更改会话状态、置顶、排序、文件或模型请求。

## 安装

将发行包下载至运行 DSH 的主机。Web 版执行以下命令，把路径替换为实际绝对路径：

```sh
dsh plugin --profile web add /absolute/path/dsh-workspace-colors-0.1.0.tgz
```

如果使用 npx 启动 DSH：

```sh
npx @deepseek-ai/dsh@0.1.7-alpha.1 plugin --profile web add /absolute/path/dsh-workspace-colors-0.1.0.tgz
```

刷新 DSH 页面后，点击侧栏底部的“工作区颜色”按钮。如果禁用了 HMR，先重新启动 DSH。自定义 profile 用其名称替换 `web`。Electron 的保留 `desktop` profile 由桌面应用管理，请在应用的插件安装界面填写包的绝对路径，不要用 CLI 修改它。

## 保存范围与兼容性

- 颜色按 `workspaceId` 保存在当前浏览器来源的 `localStorage`，键为 `dsh.workspace-colors.v1`；刷新与重命名后保留。
- 不跨浏览器、设备或端口同步。无痕模式或存储被禁用时，当前页面仍可设置，但浏览器可能不保存。
- 按工作区与工作区树分组时显示标识；单列表没有工作区行，因此没有着色目标。
- 插件通过公开的 `sidebar.footer.action` 插槽注册设置入口。v0.1.7-alpha.1 没有工作区行颜色扩展点，因此着色使用该版本的 `data-row-key="workspace:<id>"` 和首个图标容器。后续 DSH 改动这段 DOM 后，需要重新验证兼容性。
- 页面重新渲染、工作区重命名和工作区树嵌套不需要轮询或 MutationObserver。卸载插件会移除其样式；已保存的颜色保留，以便重新安装后恢复。需要完全清理时删除上述 localStorage 键。
- 只接受六个预设颜色；不把存储内容当成任意 CSS。工作区 ID 在构造 CSS 选择器时逐字符转义。

## 卸载

```sh
dsh plugin --profile web remove dsh-workspace-colors
```

重新加载页面即可恢复原始外观。

## 开发

源码包包含 TypeScript 源码与预构建产物。安装开发依赖后执行：

```sh
npm install
npm run typecheck
npm test
npm run build
npm pack
```

`lib/client.js` 使用 DSH 的 ModuleLoader factory 格式，React、store 和 UI primitives 使用宿主提供的模块身份。安装发行包不需要构建脚本。

## English

An additive workspace color plugin for DeepSeek Harness **v0.1.7-alpha.1**. Open **Workspace colors** beside Settings to choose one of six colors or Default. Preferences are browser-origin-local and keyed by workspace identity. The plugin adds a sidebar stripe and colors the folder icon; it does not change session pinning, status, ordering, or model inputs. The footer control uses the public slot API, while row styling depends on the tested release's DOM. Revalidate the selectors before upgrading DSH. Built tarballs need no installation scripts.

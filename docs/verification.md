# 验证记录

测试宿主：`@deepseek-ai/dsh@0.1.7-alpha.1`，Web profile。

- 插件 TypeScript 检查通过。
- 五项插件测试通过：选择与恢复默认、非法存储颜色与继承属性、特殊 ID 的 CSS 转义、面板重载和卸载样式清理、中英文界面与 Escape 关闭。
- 从生成的 `dsh-workspace-colors-0.1.0.tgz` 通过 DSH CLI 安装成功。
- 真实 DSH Web + Chromium 检查通过：设置红色、侧栏色条生效、页面刷新保留、恢复默认清除色条，页面 JavaScript 错误数为 0。
- 测试使用隔离 DSH_HOME，无 API key，不发送模型请求。

兼容性边界：只验证上述 Web 版本；Electron、后续 DSH 版本、跨浏览器同步不在本次验证范围。行着色依赖该版本的 DOM，详见 README。

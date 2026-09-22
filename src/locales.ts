/** Plugin-owned UI text; no model prompts or Session events are added. */
export const zh = {
  title: '工作区颜色', close: '关闭',
  description: '为工作区设置颜色标识。选择保存在当前浏览器，不影响会话状态。',
  empty: '暂无工作区', loading: '正在加载工作区…',
  default: '恢复默认', red: '红色', orange: '橙色', green: '绿色',
  blue: '蓝色', purple: '紫色', pink: '粉色',
  choice: '{name}：{color}', current: '当前颜色：{color}',
}
export type ColorKey = keyof typeof zh
export const en: Record<ColorKey, string> = {
  title: 'Workspace colors', close: 'Close',
  description: 'Label workspaces with colors. Choices stay in this browser and do not change Session status.',
  empty: 'No workspaces', loading: 'Loading workspaces…',
  default: 'Default', red: 'Red', orange: 'Orange', green: 'Green',
  blue: 'Blue', purple: 'Purple', pink: 'Pink',
  choice: '{name}: {color}', current: 'Current color: {color}',
}

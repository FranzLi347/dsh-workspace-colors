window.__ModuleLoader__.load({id:"dsh-workspace-colors",factory:(require)=>{var module={exports:{}};var exports=module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);

// src/ColorPanel.tsx
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/colors.ts
var COLORS = ["red", "orange", "green", "blue", "purple", "pink"];
function readColor(value) {
  return typeof value === "string" && COLORS.some((color) => color === value) ? value : void 0;
}
function colorFor(colors, id) {
  if (colors === null || typeof colors !== "object" || !Object.hasOwn(colors, id)) return void 0;
  return readColor(Reflect.get(colors, id));
}
function cssString(value) {
  return '"' + Array.from(value, (char) => `\\${char.codePointAt(0).toString(16)} `).join("") + '"';
}
function rowStyles(colors, workspaceIds) {
  return workspaceIds.flatMap((id) => {
    const color = colorFor(colors, id);
    if (color === void 0) return [];
    const row = `[data-row-key=${cssString(`workspace:${id}`)}]`;
    return [
      `${row}{box-shadow:inset 3px 0 var(--dsh-wc-${color});}`,
      `${row}>span:first-of-type{color:var(--dsh-wc-${color});}`
    ];
  }).join("\n");
}

// src/styles.css?inline
var styles_default = 'body {\n  --dsh-wc-red: #dc2626; --dsh-wc-orange: #c2410c; --dsh-wc-green: #15803d;\n  --dsh-wc-blue: #2563eb; --dsh-wc-purple: #7c3aed; --dsh-wc-pink: #be185d;\n}\nbody[data-ds-dark-theme] {\n  --dsh-wc-red: #f87171; --dsh-wc-orange: #fb923c; --dsh-wc-green: #4ade80;\n  --dsh-wc-blue: #60a5fa; --dsh-wc-purple: #a78bfa; --dsh-wc-pink: #f472b6;\n}\n.dsh-wc-trigger {\n  display: inline-flex; align-items: center; justify-content: center;\n  width: 36px; height: 36px; border: 0; border-radius: 8px;\n  background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer;\n}\n.dsh-wc-trigger:hover, .dsh-wc-choice:hover { background: var(--dsw-alias-interactive-bg-hover); }\n.dsh-wc-trigger:focus-visible, .dsh-wc-choice:focus-visible {\n  outline: 2px solid var(--dsw-alias-link); outline-offset: 2px;\n}\n.dsh-wc-content { max-height: 65vh; overflow: auto; }\n.dsh-wc-workspace { margin: 0 0 18px; padding: 0; border: 0; min-width: 0; }\n.dsh-wc-workspace legend { display: flex; align-items: center; gap: 8px; font-weight: 600; overflow-wrap: anywhere; }\n.dsh-wc-path { color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 18px; margin: 4px 0 8px; overflow-wrap: anywhere; }\n.dsh-wc-choices { display: flex; flex-wrap: wrap; gap: 6px; }\n.dsh-wc-choice {\n  display: flex; align-items: center; gap: 5px; padding: 5px 8px;\n  border: 0.5px solid var(--dsw-alias-border-l3); border-radius: 6px;\n  background: transparent; color: var(--dsw-alias-label-primary); font: inherit;\n  font-size: 12px; line-height: 18px; cursor: pointer;\n}\n.dsh-wc-choice[aria-pressed="true"] { outline: 2px solid var(--dsw-alias-link); outline-offset: -2px; }\n.dsh-wc-swatch {\n  display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px;\n  background: var(--dsh-wc-swatch); border: 0.5px solid var(--dsw-alias-border-l3);\n  border-radius: 4px; color: var(--dsw-alias-bg-base); text-shadow: 0 0 2px var(--dsw-alias-label-primary);\n}\n';

// src/ColorPanel.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function ColorPanel({ useWorkspaces, useStore, actions, t }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const snapshot = useWorkspaces((state) => state);
  const colors = useStore((state) => state.colors);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: styles_default + "\n" + rowStyles(colors, snapshot.items.map((workspace) => workspace.workspaceId)) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: "dsh-wc-trigger",
        title: t("title"),
        "aria-label": t("title"),
        "aria-haspopup": "dialog",
        onClick: () => setOpen(true),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { width: "20", height: "20", viewBox: "0 0 24 24", "aria-hidden": "true", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.3 1.3 0 0 1 .7-2.3H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8Z", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "7", cy: "10", r: "1.5", fill: "currentColor" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "11", cy: "7", r: "1.5", fill: "currentColor" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "16", cy: "9", r: "1.5", fill: "currentColor" })
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_dsh_client_ui_primitives.Modal,
      {
        open,
        onClose: () => setOpen(false),
        title: t("title"),
        closeLabel: t("close"),
        description: t("description"),
        contentClassName: "dsh-wc-content",
        children: [
          snapshot.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(snapshot.phase === "ready" ? "empty" : "loading") }),
          snapshot.items.map((workspace) => {
            const color = colorFor(colors, workspace.workspaceId);
            const title = t("current", { color: t(color ?? "default") });
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { className: "dsh-wc-workspace", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { title: workspace.path, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconFolderCloseRegular, { size: 16 }),
                workspace.title
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-wc-path", title: workspace.path, children: workspace.path }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-wc-choices", role: "group", "aria-label": title, children: [void 0, ...COLORS].map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "button",
                {
                  type: "button",
                  className: "dsh-wc-choice",
                  "aria-pressed": choice === color,
                  "aria-label": t("choice", { name: workspace.title, color: t(choice ?? "default") }),
                  title: t(choice ?? "default"),
                  onClick: () => actions.setColor(workspace.workspaceId, choice),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "span",
                      {
                        className: "dsh-wc-swatch",
                        "aria-hidden": "true",
                        style: { "--dsh-wc-swatch": choice === void 0 ? "transparent" : `var(--dsh-wc-${choice})` },
                        children: choice === color ? "\u2713" : choice === void 0 ? "\u2205" : ""
                      }
                    ),
                    t(choice ?? "default")
                  ]
                },
                choice ?? "default"
              )) })
            ] }, workspace.workspaceId);
          })
        ]
      }
    )
  ] });
}

// src/store.ts
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
function createColorStore() {
  return (0, import_dsh_client_store.defineStore)({
    init: () => ({ colors: {} }),
    persist: "dsh.workspace-colors.v1",
    actions: {
      setColor: (draft, id, color) => {
        if (!draft.colors || typeof draft.colors !== "object" || Array.isArray(draft.colors)) draft.colors = {};
        draft.colors = Object.fromEntries([
          ...Object.entries(draft.colors).filter(([key]) => key !== id),
          ...color === void 0 ? [] : [[id, color]]
        ]);
      }
    }
  });
}

// src/locales.ts
var zh = {
  title: "\u5DE5\u4F5C\u533A\u989C\u8272",
  close: "\u5173\u95ED",
  description: "\u4E3A\u5DE5\u4F5C\u533A\u8BBE\u7F6E\u989C\u8272\u6807\u8BC6\u3002\u9009\u62E9\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\uFF0C\u4E0D\u5F71\u54CD\u4F1A\u8BDD\u72B6\u6001\u3002",
  empty: "\u6682\u65E0\u5DE5\u4F5C\u533A",
  loading: "\u6B63\u5728\u52A0\u8F7D\u5DE5\u4F5C\u533A\u2026",
  default: "\u6062\u590D\u9ED8\u8BA4",
  red: "\u7EA2\u8272",
  orange: "\u6A59\u8272",
  green: "\u7EFF\u8272",
  blue: "\u84DD\u8272",
  purple: "\u7D2B\u8272",
  pink: "\u7C89\u8272",
  choice: "{name}\uFF1A{color}",
  current: "\u5F53\u524D\u989C\u8272\uFF1A{color}"
};
var en = {
  title: "Workspace colors",
  close: "Close",
  description: "Label workspaces with colors. Choices stay in this browser and do not change Session status.",
  empty: "No workspaces",
  loading: "Loading workspaces\u2026",
  default: "Default",
  red: "Red",
  orange: "Orange",
  green: "Green",
  blue: "Blue",
  purple: "Purple",
  pink: "Pink",
  choice: "{name}: {color}",
  current: "Current color: {color}"
};

// src/client.ts
var inject = ["slots", "locale", "workspaces"];
function apply(ctx) {
  ctx.effect(() => ctx.locale.register("workspaceColors", { en, zh }), "workspace-colors: locale");
  const store = createColorStore();
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "workspace-colors",
    order: 300,
    locale: "workspaceColors",
    store
  }, ColorPanel));
}
return module.exports;}});

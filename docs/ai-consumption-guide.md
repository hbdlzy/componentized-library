# AI Consumption Guide

这个文档用来告诉新项目里的 AI，应该按什么方式读取组件库文档，才能稳定复用公共组件。

## 推荐原则

- 优先读取统一入口 `@hbdlzy/ui`
- 对外只保留一个固定入口文件
- 优先读取机器清单，再读取组件详细 README
- 优先复用现有组件，不要重复实现相同能力
- 页面实现前，先确认是否已有公共组件或工具可用

## 在新项目里的推荐做法

如果新项目已经安装了 `@hbdlzy/ui`，外部只需要让 AI 先读取一个固定文件：

1. `node_modules/@hbdlzy/ui/AI-USAGE.md`

然后 AI 必须自行继续：

1. 读取 `node_modules/@hbdlzy/ui/package.manifest.json`
2. 按 `package.manifest.json` 里的 `aiReadOrder` 继续读取
3. 建立当前组件清单和导入方式

## 推荐给 AI 的指令

可以直接在新项目里对 AI 说：

```text
本项目使用 @hbdlzy/ui 组件库。开始实现前，请先读取 node_modules/@hbdlzy/ui/AI-USAGE.md，并按其中规则建立组件清单。后续优先复用已有公共组件和工具，新增页面默认从 @hbdlzy/ui 导入。
```

## 更稳的做法

把这段规则直接放进新项目根目录的 `AGENTS.md`。模板见：

- [templates/new-project-ai-consumer/AGENTS.md](../templates/new-project-ai-consumer/AGENTS.md)

## 组件库维护时的模板入口

如果 AI 需要继续维护组件库本身，而不是业务项目，优先再读取：

- [component-authoring-guide.md](./component-authoring-guide.md)
- [README.template.md](../templates/component-authoring/README.template.md)
- [component-manifest-item.template.json](../templates/component-authoring/component-manifest-item.template.json)
- [component-checklist.md](../templates/component-authoring/component-checklist.md)

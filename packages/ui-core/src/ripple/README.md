# Ripple

`Ripple` 是组件库提供的全局点击涟漪效果，用来统一按钮、类按钮元素和 Element Plus 按钮的点击反馈。

## 解决的问题

- 统一项目里按钮的点击反馈，不需要在每个按钮里写动画 DOM
- 支持原生 `button`、`[role="button"]`、Element Plus `el-button`
- 支持 `el-radio-button`、`el-checkbox-button` 的按钮态
- 自动忽略禁用、加载中和显式关闭 ripple 的元素
- 支持鼠标、触控和键盘 Enter / Space 触发

## 全局启用

推荐在业务项目入口统一导入 `@hbdlzy/ui`，会自动安装 ripple：

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import '@hbdlzy/ui'

createApp(App).use(ElementPlus).mount('#app')
```

如果项目只安装 `@hbdlzy/ui-core`，导入 `@hbdlzy/ui-core` 也会自动安装：

```ts
import '@hbdlzy/ui-core'
```

如果只想引入涟漪能力，可以使用细粒度入口：

```ts
import { Ripple, installRipple, uninstallRipple } from '@hbdlzy/ui/ripple'
```

只安装 `@hbdlzy/ui-core` 时，对应入口为：

```ts
import { Ripple, installRipple, uninstallRipple } from '@hbdlzy/ui-core/ripple'
```

## 手动安装

如果希望显式控制安装时机，可以调用 `installRipple`：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { installRipple } from '@hbdlzy/ui'

const app = createApp(App)
installRipple()
app.mount('#app')
```

也可以按 Vue 插件形式使用：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { Ripple } from '@hbdlzy/ui/ripple'

createApp(App).use(Ripple).mount('#app')
```

## 局部关闭

如果某个按钮或某块区域不需要涟漪效果，添加 `data-hbdl-ripple="false"`：

```vue
<template>
  <el-button data-hbdl-ripple="false">
    不显示涟漪
  </el-button>

  <div data-hbdl-ripple="false">
    <el-button>这块区域内也不显示涟漪</el-button>
  </div>
</template>
```

## 自定义颜色

涟漪默认使用当前文本色 `currentColor`，可通过 CSS 变量覆盖：

```vue
<template>
  <el-button class="danger-ripple">
    自定义涟漪颜色
  </el-button>
</template>

<style scoped>
.danger-ripple {
  --hbdl-ripple-color: #f56c6c;
}
</style>
```

## 手动卸载

极少数微前端或临时挂载场景需要主动卸载时，可以调用：

```ts
import { uninstallRipple } from '@hbdlzy/ui'

uninstallRipple()
```

`installRipple()` 会返回卸载函数：

```ts
const teardown = installRipple()
teardown()
```

## AI 使用指引

AI 在接入业务项目时，如果项目使用 `@hbdlzy/ui`，应把 ripple 视为已内置的全局交互能力，不要再复制实现点击水波纹指令或按钮动画。

推荐优先从统一入口导入：

```ts
import '@hbdlzy/ui'
```

需要显式控制时再导入：

```ts
import { Ripple, installRipple, uninstallRipple } from '@hbdlzy/ui'
```

或者从细粒度入口导入：

```ts
import { Ripple, installRipple, uninstallRipple } from '@hbdlzy/ui/ripple'
```

AI 生成代码时按下面顺序判断：

1. 新项目入口已经导入 `@hbdlzy/ui` 时，不需要额外写任何 ripple 初始化代码
2. 只想手动启用时，使用 `installRipple()`
3. 想按 Vue 插件语义接入时，使用 `app.use(Ripple)`
4. 局部关闭时，给按钮或父级容器添加 `data-hbdl-ripple="false"`
5. 自定义颜色时，设置 `--hbdl-ripple-color`

AI 不应该做这些事：

- 不要在页面里重复写 `v-ripple` 指令
- 不要为每个按钮手动插入 ripple 动画节点
- 不要给禁用或加载中的按钮强行添加涟漪
- 不要把业务按钮封装成新组件只为实现点击反馈

生成代码前建议同时读取：

- `packages/ui-core/components.manifest.json`
- `packages/ui-core/src/ripple/index.ts`
- 本 README 的 `全局启用 / 局部关闭 / 自定义颜色` 部分

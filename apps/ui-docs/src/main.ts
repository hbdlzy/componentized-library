import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import HbdlUI from '@hbdlzy/ui'
import App from './App.vue'

createApp(App).use(ElementPlus, { locale: zhCn }).use(HbdlUI).mount('#app')

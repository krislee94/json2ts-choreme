import { createApp } from "vue";
import App from "./App.vue";
//全局注册组件 vant 更多组件注册参考（https://vant-contrib.gitee.io/vant/v3/#/zh-CN/advanced-usage#zu-jian-zhu-ce）
import { Search, Field, Form, CellGroup, Button, Popup, Dialog } from "vant";

createApp(App)
  .use(Search)
  .use(Field)
  .use(Form)
  .use(CellGroup)
  .use(Button)
  .use(Popup)
  .use(Dialog)
  .mount("#app");

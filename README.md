# vue-min-picker

vue-min-picker一共有三种选择器Picker/PickerDate/PickerRegion，【普通选择器】【日期选择器】【省市区选择器】。【日期选择器】与【省市区选择器】是基于【普通选择器】进行开发的出来的。

如果需要修改字体颜色，可以用全局的css样式覆盖。

**安装**：

```js
npm install vue-min-picker -S
```

**使用方式一：全局注册（main.js）**

```js
import Vue from 'vue';

import 'vue-min-picker/lib/picker.css';//导入样式
import picker from "vue-min-picker";
Vue.use(picker);//注册（Picker,PickerDate,PickerRegion）

Vue.config.productionTip = false;
new Vue({
    render: h => h(App),
}).$mount('#app');
```

**使用方式二：局部注册（组件内注册）**

```js
<template>
    <div></div>
</template>
<script>
import 'vue-min-picker/lib/picker.css';//导入样式(建议全局导入)
import pickers from "vue-min-picker";
let {Picker,PickerDate,PickerRegion} = pickers;
export default {
    name: "Message",
    components:{
        Picker,
        PickerDate,
        PickerRegion,
    },
    data() {
        return {
            visible:true,
        };
    },
};
</script>
```

**picker普通选择器的使用**

```js

```

**picker普通选择器-属性参数**

| 参数         | 说明                                                         | 是否必须 | 类型                     | 默认值 |
| :----------- | :----------------------------------------------------------- | :------- | :----------------------- | :----- |
| visible      | 显示/隐藏picker                                              | 是       | Boolean                  | false  |
| data         | 必须是二维数组[[{label:"",value:""}], [{label:"",value:""}]] | 是       | Array                    | [[]]   |
| layer        | 联动显示列数                                                 | 否       | Number                   | 0      |
| defaultIndex | 默认显示的index                                              | 否       | Number/Array(多列用数组) | 无     |
| cancelText   | 取消按钮文字                                                 | 否       | String                   | '取消' |
| confirmText  | 去确认按钮文字                                               | 否       | String                   | '确认' |
| title        | picker标题                                                   | 否       | String                   | ''     |
| showToolbar  | 显示头部                                                     | 否       | Boolean                  | false  |
| maskClick    | 遮罩层是否可以点击关闭                                       | 否       | Boolean                  | false  |
| itemHeight   | 每一行的高度                                                 | 否       | Number, String           | '44px' |
| rowNumber    | 显示多少行(建议单数)                                         | 否       | Number                   | 5      |
| appendToBody | 是否插入到body中                                             | 否       | Boolean                  | false  |



**picker普通选择器-事件说明**

| 参数    | 说明         | 是否必须 | 类型          | 默认值 |
| :------ | :----------- | :------- | :------------ | :----- |
| change  | 数据变化事件 | 否       | function(val) | 无     |
| cancel  | 取消选择     | 否       | function      | 无     |
| confirm | 确认选择     | 否       | function(val) | 无     |
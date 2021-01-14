# vue-min-picker

vue-min-picker一共有三种选择器Picker/PickerDate/PickerRegion，【普通选择器】【日期选择器】【省市区选择器】。【日期选择器】与【省市区选择器】是基于【普通选择器】进行开发的出来的。

注：如果需要修改按钮字体颜色，可以用全局的css样式覆盖。

**安装**：

```js
npm install vue-min-picker -S
```

**使用方式一：全局注册（main.js）**

```js
import Vue from 'vue';

import 'vue-min-picker/lib/picker.css';//导入样式
import picker from "vue-min-picker";
Vue.use(picker);//注册3个组件（Picker,PickerDate,PickerRegion）

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
            
        };
    },
};
</script>
```



------



### **1.Picker普通选择器的使用**

```js
<template>
    <div class="Button1">
        <div class="button" @click="visible = true">普通-选择器</div>
        <Picker
            :visible.sync="visible"
            :data="pickData"
            :defaultIndex="defaultIndex"
            title="普通选择器"
            cancelText="取消"
            confirmText=" 确定"
            :maskClick="true"
            @change="change"
            @cancel="cancel"
            @confirm="confirm"
        />
    </div>
</template>
<script>
export default {
    name: "Button1",
    data() {
        return {
            visible:false,
            //pickData:[[{label:`男`,value:0},{label:`女`,value:1}]],
            pickData:[],
            defaultIndex:[0],
        };
    },
    created() {
    },
    mounted() {
        this.$nextTick(function() {
            let arr = [{label:`男`,value:0},{label:`女`,value:1}];
            this.$set(this.pickData, 0, arr);//组件挂载后赋值
            this.$set(this.defaultIndex, 0, 1);//设置默认值（女）
        });
    },
    methods: {
        change(e){
            console.log('e: ', e);
        },
        confirm(e){
            console.log('e: ', JSON.stringify(e));
        },
        cancel(){
            console.log("取消了");
        }
    },
};
</script>
```

**普通选择器-属性参数**

| 参数         | 说明                                                         | 是否必须 | 类型    | 默认值 |
| :----------- | ------------------------------------------------------------ | :------- | :------ | :----- |
| visible      | 显示/隐藏picker                                              | 是       | Boolean | false  |
| data         | 必须是二维数组[[{label:"",value:""}], [{label:"",value:""}]]。<br />注：如果数据是在Picker组件挂载后或异步生成的，要用this.$set();赋值，否则组件数据不会刷新 | 是       | Array   | [[]]   |
| defaultIndex | 默认显示的index。Picker组件挂载后或异步获取数据，要用this.$set();赋值 | 否       | Array   | []     |
| cancelText   | 取消按钮文字                                                 | 否       | String  | '取消' |
| confirmText  | 确认按钮文字                                                 | 否       | String  | '确认' |
| title        | picker标题                                                   | 否       | String  | ''     |
| maskClick    | 点击透明遮罩层是否可以关闭                                   | 否       | Boolean | false  |

**普通选择器-事件说明**

| 参数    | 说明         | 是否必须 | 类型          | 默认值 |
| :------ | :----------- | :------- | :------------ | :----- |
| change  | 数据变化事件 | 否       | function(val) | 无     |
| cancel  | 取消选择     | 否       | function      | 无     |
| confirm | 确认选择     | 否       | function(val) | 无     |



------



### **2.PickerDate日期选择器的使用**

```js
<template>
    <div class="Button2">
        <div class="button" @click="visible = true">日期-选择器</div>
        <PickerDate
            :visible.sync="visible"
            :initDate="defaults"
            start="1980-06-12"
            end="2000-12-11"
            format="YYYY-MM-DD"
            title="日期选择器"
            cancelText="取消"
            confirmText=" 确定"
            :maskClick="false"
            @cancel="cancel"
            @confirm="confirm"
        />
    </div>
</template>
<script>
export default {
    name: "Button2",
    data() {
        return {
            defaults:'',
            visible:false,
        };
    },
    mounted() {
        this.$nextTick(function() {
            this.defaults = '1993-06-12';
        });
    },
    methods: {
        confirm(e){
            console.log('确定: ', JSON.stringify(e));
        },
        cancel(){
            console.log("取消了");
        }
    },
};
</script>
```

**日期选择器-属性参数**

| 参数        | 说明                                          | 是否必须 | 类型    | 默认值       |
| :---------- | :-------------------------------------------- | :------- | :------ | :----------- |
| visible     | 显示/隐藏picker                               | 是       | Boolean | false        |
| initDate    | 默认显示的日期                                | 否       | String  | 开始的日期   |
| start       | 开始的日期                                    | 否       | String  | '1900-01-01' |
| end         | 结束的日期                                    | 否       | String  | '2100-12-31' |
| format      | 日期格式可以为'YYYY'或'YYYY-MM'或'YYYY-MM-DD' | 否       | String  | 'YYYY-MM-DD' |
| cancelText  | 取消按钮文字                                  | 否       | String  | '取消'       |
| confirmText | 确认按钮文字                                  | 否       | String  | '确认'       |
| title       | picker标题                                    | 否       | String  | ''           |
| maskClick   | 点击透明遮罩层是否可以关闭                    | 否       | Boolean | false        |

**日期选择器-事件说明**

| 参数    | 说明     | 是否必须 | 类型          | 默认值 |
| :------ | :------- | :------- | :------------ | :----- |
| cancel  | 取消选择 | 否       | function      | 无     |
| confirm | 确认选择 | 否       | function(val) | 无     |



------



### **3.PickerRegion省市区选择器的使用**

```js
<template>
    <div class="Button3">
        <div class="button" @click="visible = true">省市区-选择器</div>
        <PickerRegion
            :visible.sync="visible"
            :defaultRegion="defaultRegion"
            customItem="全部"
            title="省市区选择器"
            cancelText="取消"
            confirmText=" 确定"
            :maskClick="false"
            @cancel="cancel"
            @confirm="confirm"
        />
    </div>
</template>
<script>
export default {
    name: "Button3",
    data() {
        return {
            visible:false,
            defaultRegion:"",
        };
    },
    mounted() {
        this.$nextTick(function() {
            this.defaultRegion = "广东省,茂名市,化州市";
        });
    },
    methods: {
        confirm(e){
            console.log('确定: ', JSON.stringify(e));
        },
        cancel(){
            console.log("取消了");
        }
    },
};
```

**省市区选择器-属性参数**

| 参数          | 说明                                           | 是否必须 | 类型    | 默认值                 |
| :------------ | :--------------------------------------------- | :------- | :------ | :--------------------- |
| visible       | 显示/隐藏picker                                | 是       | Boolean | false                  |
| defaultRegion | 默认显示的省市区                               | 否       | String  | '北京市,北京市,东城区' |
| customItem    | 可以在每列的顶部，添加一个定义选项【如：全部】 | 否       | String  | ''                     |
| cancelText    | 取消按钮文字                                   | 否       | String  | '取消'                 |
| confirmText   | 确认按钮文字                                   | 否       | String  | '确认'                 |
| title         | picker标题                                     | 否       | String  | ''                     |
| maskClick     | 点击透明遮罩层是否可以关闭                     | 否       | Boolean | false                  |

**省市区选择器-事件说明**

| 参数    | 说明     | 是否必须 | 类型          | 默认值 |
| :------ | :------- | :------- | :------------ | :----- |
| cancel  | 取消选择 | 否       | function      | 无     |
| confirm | 确认选择 | 否       | function(val) | 无     |


import Picker from "./Picker/Picker.vue"; //普通-选择器
import PickerDate from "./PickerDate/Date.vue"; //日期-选择器
import PickerRegion from "./PickerRegion/Region.vue"; //省市区-选择器


// 以数组的结构保存组件，便于遍历
const components = [
    Picker,
    PickerDate,
    PickerRegion,
];
// 定义 install 方法
const install = function(Vue) {
    if (install.installed) return;
    install.installed = true;
    // 遍历并注册全局组件
    components.map((component) => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

let obj = {};
components.map((component) => {
    obj[component.name] = component;
});

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表（可用于局部注册）
    ...obj,
};
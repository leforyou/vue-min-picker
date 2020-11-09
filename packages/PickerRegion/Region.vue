<template>
    <div class="Region">
        <Picker 
            :visible="visible"
            :data="region"
            :defaultIndex="defaultIndex"
            :title="title"
            :cancelText="cancelText"
            :confirmText="confirmText"
            :maskClick="maskClick"
            @change="change"
            @cancel="cancel"
            @confirm="confirm"
        />
    </div>
</template>
<script>
import Picker from './../Picker/Picker';
import data from "./data.js";
export default {
    name: "PickerRegion",
    components:{
        Picker,
    },
    props: {
        visible: {
            //显示与隐藏
            type: Boolean,
            default: false,
        },
        defaultRegion: {
            type: String,
            default: "北京市,北京市,东城区",//广东省,广州市,天河区
        },
        customItem: {
            type: String,
            default: '',//可以在每列的顶部，添加一个定义选项【如：全部】
        },
        title: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: '',
        },
        confirmText: {
            type: String,
            default: '',
        },
        maskClick: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        defaultRegion(){
            if(this.once === 0){
                //初始化默认值，只执行一次
                this.once = 1;
                this.setDefaultIndex();
            } 
        },
    },
    data() {
        return {
            once:0,
            region:[[],[],[]],
            defaultIndex:[0,0,0],
        };
    },
    created() {
        this.setDefaultIndex();
    },
    mounted() {
        this.$nextTick(function() {
            
        });
    },
    methods: {
        change(e){
            let {position,selectedIndex} = e;
            if(position === 0){
                //省份-滑动了
                this.changeCityData(selectedIndex);
            }else if(position === 1){
                //城市-滑动了
                this.changeDistrictData(selectedIndex);
            }
        },
        close(){
            //关闭
            this.$emit('update:visible', false);
        },
        cancel(){
            //取消
            this.close();
            this.$emit('cancel', false);
        },
        confirm(arr){
            for (let i = arr.length - 1; i >= 0; i--) {
                if(arr[i] === null || arr[i] === undefined)arr.splice(i,1);
            }
            arr = arr.map(item=>item.label);
            this.close();
            this.$emit('confirm', arr.join(','));
        },
        setDefaultIndex(){
            //设置显示的默认地址下标，下面的代码是根据data.json数据结构编写的
            let arr = this.defaultRegion.split(',');
            let provinceName = arr[0];
            let cityName = arr[1];
            let districtName = arr[2];
            
            //省份
            let code = '';
            let i = -1;
            let provinceArr = [];
            let provinceObj = data["86"];
            if(this.customItem){
                provinceArr.push({label:this.customItem,value:this.customItem});
            }
            for (const key in provinceObj) {
                if (Object.prototype.hasOwnProperty.call(provinceObj,key)) {
                    i++;
                    provinceArr.push({
                        label:provinceObj[key],
                        value:key,
                    });
                    if(provinceName === provinceObj[key]){
                        code = key;
                        this.defaultIndex[0] = this.customItem?i+1:i;
                    }
                }
            }
            this.region[0] = provinceArr;

            //城市（地级市）
            let j = -1;
            let cityArr = [];
            let cityObj = data[code];
            if(this.customItem){
                cityArr.push({label:this.customItem,value:this.customItem});
            }
            for (const key in cityObj) {
                if (Object.prototype.hasOwnProperty.call(cityObj,key)) {
                    j++;
                    cityArr.push({
                        label:cityObj[key],
                        value:key,
                    });
                    if(cityName === cityObj[key]){
                        code = key;
                        this.defaultIndex[1] = this.customItem?j+1:j;
                    }
                }
            }
            this.region[1] = cityArr;

            //地区（县级市）
            let k = -1;
            let districtArr = [];
            let districtObj = data[code];
            if(this.customItem){
                districtArr.push({label:this.customItem,value:this.customItem});
            }
            for (const key in districtObj) {
                if (Object.prototype.hasOwnProperty.call(districtObj,key)) {
                    k++;
                    districtArr.push({
                        label:districtObj[key],
                        value:key,
                    });
                    if(districtName === districtObj[key]){
                        code = key;
                        //this.defaultIndex[2] = this.customItem?k+1:k;
                        this.$set(this.defaultIndex,2,this.customItem?k+1:k);//如果使用mounted生命周期函数调用setDefaultIndex()，必须使用$set()方法更新props的数据
                    }
                }
            }
            //this.region[2] = districtArr;
            this.$set(this.region,2,districtArr);//如果使用mounted生命周期函数调用setDefaultIndex()，必须使用$set()方法更新props的数据
        },
        changeCityData(selectedIndex){
            //修改城市的数据
            let arr = [];
            let code = this.region[0][selectedIndex].value;
            let obj = data[code];
            if(this.customItem){
                arr.push({label:this.customItem,value:this.customItem});
            }
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj,key)) {
                    arr.push({
                        label:obj[key],
                        value:key,
                    });
                }
            }
            this.$set(this.region,1,arr);
            this.changeDistrictData(0);
        },
        changeDistrictData(selectedIndex){
            //修改地区的数据
            let arr = [];
            let code = this.region[1][selectedIndex].value;
            let obj = data[code];
            if(this.customItem){
                arr.push({label:this.customItem,value:this.customItem});
            }
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj,key)) {
                    arr.push({
                        label:obj[key],
                        value:key,
                    });
                }
            }
            this.$set(this.region,2,arr);
        }
    },
};
</script>
<style scoped lang="scss">
.Region{
    
}
</style>
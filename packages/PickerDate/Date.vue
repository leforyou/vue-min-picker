<template>
    <div class="PickerDate">
        <Picker 
            :visible="visible"
            :data="data"
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
let add0 = (m) => m < 10 ? '0' + m : m;
export default {
    name: "PickerDate",
    components:{
        Picker,
    },
    props: {
        visible: {
            //显示与隐藏
            type: Boolean,
            default: false,
        },
        initDate: {
            type: String,
            default: "",
        },
        start: {
            type: String,
            default: () => {
                return `1900-01-01`;
            },
        },
        end: {
            type: String,
            default: () => {
                return `2100-12-31`;
            },
        },
        format: {
            type: String,
            default: "YYYY-MM-DD",
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
        initDate(){
            if(this.once === 0){
                //初始化默认值，只执行一次
                this.once = 1;
                this.initData();
            } 
        },
    },
    data() {
        return {
            once:0,
            data:[],
            defaultIndex:[0,0,0],
            defaultDate:"",
            startDate:"",
            endDate:"",
        };
    },
    created() {
        this.initData();
    },
    mounted() {
        this.$nextTick(function() {

        });
    },
    methods: {
        initData(){
            this.defaultDate = this.handleDate(this.initDate || this.start);
            this.startDate = this.handleDate(this.start);
            this.endDate = this.handleDate(this.end);
            this.createYear();
            this.createMonth();
            this.createDay();
        },
        handleDate(date){
            //ios只能读取YYYY/MM/DD的格式
            if(date.length === 4)date += '/01/01';
            if(date.length === 7)date += '/01';
            return date.replace(/-/g, '/');
        },
        createYear(){
            //年
            let arr = [];
            let d = new Date(this.defaultDate);
            let s = new Date(this.startDate);
            let e = new Date(this.endDate);
            for (let i = s.getFullYear(); i <= e.getFullYear(); i++) {
                arr.push({label:`${i}年`,value:`${i}`});
                if(i === d.getFullYear()){
                    let index = i - s.getFullYear();
                    this.$set(this.defaultIndex,0,index);
                }
            }
            this.$set(this.data,0,arr);
        },
        createMonth(){
            //月
            let arr = [];
            let first = 0;
            let last = 0;
            let d = new Date(this.defaultDate);
            let s = new Date(this.startDate);
            let e = new Date(this.endDate);
            if(s.getFullYear() === e.getFullYear()){
                //只有一年
                first = s.getMonth() + 1;
                last = e.getMonth() + 1;
            }else{
                //两年以上
                if(this.defaultIndex[0] === 0){
                    //第一列边界值：第一年
                    first = s.getMonth() + 1;
                    last = 12;
                }else if(this.defaultIndex[0] === (this.data[0].length - 1)){
                    //第一列边界值：最后一年
                    first = 1;
                    last = e.getMonth() + 1;
                }else{
                    first = 1;
                    last = 12;
                }
            }
            for (let i = first; i <= last; i++) {
                arr.push({label:`${i}月`,value:`${add0(i)}`});
                if(i === d.getMonth() + 1){
                    let index = i - 1;
                    this.$set(this.defaultIndex,1,index);
                }
            }
            this.$set(this.data,1,arr);
        },
        createDay(){
            //天
            let arr = [];
            let first = 0;
            let last = 0;
            let d = new Date(this.defaultDate);
            let s = new Date(this.startDate);
            let e = new Date(this.endDate);
            if(s.getFullYear() === e.getFullYear()){
                //只有一年
                if(s.getMonth() === e.getMonth()){
                    //只有一个月
                    first = s.getDate();
                    last = e.getDate();
                }else{
                    if(this.defaultIndex[1] === 0){
                        //第二列边界值，第一个月
                        first = s.getDate();
                        last = this.getCurrentMonthDays();
                    }else if(this.defaultIndex[1] === (this.data[1].length - 1)){
                        //第二列边界值，最后一个月
                        first = 1;
                        last = e.getDate();
                    }else{
                        first = 1;
                        last = this.getCurrentMonthDays();
                    }
                }
            }else{
                //两年以上
                if(this.defaultIndex[0] === 0 && this.defaultIndex[1] === 0){
                    //边界值
                    first = s.getDate();
                    last = this.getCurrentMonthDays();
                }else if(this.defaultIndex[0] === (this.data[0].length - 1) && this.defaultIndex[1] === (this.data[1].length - 1)){
                    //边界值
                    first = 1;
                    last = e.getDate();
                }else{
                    //整月
                    first = 1;
                    last = this.getCurrentMonthDays();
                }
            }
            for (let i = first; i <= last; i++) {
                arr.push({label:`${i}日`,value:`${add0(i)}`});
                if(i === d.getDate()){
                    let index = i - 1;
                    this.$set(this.defaultIndex,2,index);
                }
            }
            this.$set(this.data,2,arr);
        },
        change(e){
            let {position,selectedIndex} = e;
            if(position === 0){
                //年-滑动
                this.createMonth();
                this.createDay();
                this.defaultIndex[0] = selectedIndex;
                this.defaultIndex[1] = 0;
                this.defaultIndex[2] = 0;
            }else if(position === 1){
                //月-滑动
                this.createDay();
                this.defaultIndex[1] = selectedIndex;
                this.defaultIndex[2] = 0;
            }else if(position === 2){
                this.defaultIndex[2] = selectedIndex;
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
        confirm(){
            this.close();
            let y = (this.data[0][this.defaultIndex[0]]).value;
            let m = (this.data[1][this.defaultIndex[1]]).value;
            let d = (this.data[2][this.defaultIndex[2]]).value;
            switch (this.format) {
                case "YYYY":
                    this.$emit('confirm', `${y}`);
                    break;
                case "YYYY-MM":
                    this.$emit('confirm', `${y}-${m}`);
                    break;
                default:
                    this.$emit('confirm', `${y}-${m}-${d}`);
                    break;
            }
        },
        getCurrentMonthDays(date) {
            if(date === undefined){
                let y = (this.data[0][this.defaultIndex[0]]).value;
                let m = (this.data[1][this.defaultIndex[1]]).value;
                date = `${y}/${m}/01`;
            }
            //获取一个月的天数
            let curDate = new Date(date);
            let curMonth = curDate.getMonth(); //获取当前月份 
            curDate.setMonth(curMonth + 1); //生成实际的月份: 由于curMonth会比实际月份小1, 故需加1
            curDate.setDate(0); //将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的   
            return curDate.getDate(); //返回当月的天数
        }
    },
};
</script>
<style scoped lang="scss">
.PickerDate{
    
}
</style>
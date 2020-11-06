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
        defaultDate: {
            type: String,
            default: '',
        },
        start: {
            type: String,
            default: '',
        },
        end: {
            type: String,
            default: '',
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
        defaultDate(){
            if(this.once === 0){
                //初始化默认值，只执行一次
                this.once = 1;
                this.initDefault();
            } 
        },
    },
    data() {
        return {
            once:0,
            data:[],
            defaultIndex:[0,0,0],
            startDate:"",
            endDate:"",
        };
    },
    created() {
        this.initDefault();
    },
    mounted() {
        this.$nextTick(function() {
            
        });
    },
    methods: {
        initDefault(){

        },
        change(/* e */){
            //let {position,selectedIndex} = e;
            
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
        confirm(/* arr */){
            this.close();
            this.$emit('confirm', "");
        },
    },
};
</script>
<style scoped lang="scss">
.PickerDate{
    
}
</style>
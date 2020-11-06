<template>
    <div class="Button1">
        <div class="button" @click="visible = true">普通-选择器</div>
        <Picker
            :visible.sync="visible"
            :data="pickDataBirthday"
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
            pickDataBirthday:[[],[]],
            defaultIndex:[2,6],
            value:"",
        };
    },
    created() {
            //this.defaultIndex = [0,5];
            //this.defaultIndex = [2,5];
    },
    mounted() {
        /* setTimeout(() => {
            this.defaultIndex = [2,5];
        }, 3000); */
        this.$nextTick(function() {
            //this.defaultIndex = [2,5];
            this.createPickDataBirthday();
        });
    },
    methods: {
        createPickDataBirthday(){
            let arr = [{label:'不限',value:''}];
            for (let i = 18; i < 61; i++) {
                arr.push({label:`${i}岁`,value:i});
            }
            this.pickDataBirthday = [arr,arr];
        },
        change(e){
            console.log('e: ', e);
            let {position,selectedIndex} = e;
            if(position === 0){
                //第一列发生改变
                let num = this.pickDataBirthday[0][selectedIndex].value;
                if(num === ''){
                    let arr = [{label:'不限',value:''}];
                    for (let i = 18; i < 61; i++) {
                        arr.push({label:`${i}岁`,value:i});
                    }
                    this.$set(this.pickDataBirthday, 1, arr);
                }else{
                    let arr = [{label:'不限',value:''}];
                    for (let i = num + 1; i < 61; i++) {
                        arr.push({label:`${i}岁`,value:i});
                    }
                    this.$set(this.pickDataBirthday, 1, arr);
                }
            }
        },
        confirm(e){
            console.log('e: ', JSON.stringify(e));
            this.$emit('success', JSON.stringify(e));
        },
        cancel(){
            console.log("取消了");
        }
    },
};
</script>
<style scoped lang="scss">
.Button1{
    padding: 20px 5px;
    .button{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #409eff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
    }
}
</style>
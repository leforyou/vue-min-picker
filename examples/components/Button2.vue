<template>
    <div class="Button2">
        <div class="button">日期-选择器</div>
        <Region
            :visible.sync="visible"
            defaultDate="1990"
            start="1950"
            end="2030"
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
            visible:false,
        };
    },
    mounted() {
        this.$nextTick(function() {
            
        });
    },
    methods: {
        confirm(e){
            console.log('确定: ', JSON.stringify(e));
            this.$emit('success', JSON.stringify(e));
        },
        cancel(){
            console.log("取消了");
        }
    },
};
</script>
<style scoped lang="scss">
.Button2{
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
        padding: 12px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
    }
}
</style>
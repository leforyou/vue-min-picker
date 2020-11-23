<template>
    <transition name="fade">
        <div class="Picker" ref="picker" v-show="visible">
            <div class="close" @click="close" v-if="maskClick"></div>
            <div class="container">
                <div class="head">
                    <button class="cancel" @click="cancel">{{cancelText || "取消"}}</button>
                    <div class="title ellipsis" v-if="title">{{title}}</div>
                    <button class="confirm" @click="confirm">{{confirmText || "确认"}}</button>
                </div>
                <div class="content" :style="{height:`${itemHeight*5}px`}">
                    <div class="multi-column">
                        <PickerColumn
                            v-for="(item,index) in data"
                            :key="index"
                            :lists="item"
                            :itemHeight="itemHeight"
                            :defaultSelectedIndex="defaultIndex[index]"
                            :position="index"
                            @change="change"
                            ref="pickerColumn"
                        ></PickerColumn>
                    </div>
                    <div class="line" :style="{height:`${itemHeight}px`}"></div>
                    <div class="mask" :style="{backgroundSize: `100% ${itemHeight*2}px`}"></div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import PickerColumn from "./PickerColumn";
export default {
    name: "Picker",
    components: {
        PickerColumn,
    },
    props: {
        visible: {
            //显示与隐藏
            type: Boolean,
            default: false,
        },
        data: {
            //二维数组
            type: Array,
            default: () => [[]],//注意：处理props数据不更新，在父组件要用this.$set();设置值
        },
        defaultIndex: {
            type: [Number, Array],
            default: () => [],
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
        defaultIndex(){
            if(this.once === 0){
                //初始化默认值，只执行一次
                this.once = 1;
                this.initDefaultIndex();
            } 
        },
    },
    data() {
        return {
            once:0,
            itemHeight:45,//行高
            selectedColumnIndex:[],//保存每列选中的位置
        };
    },
    created() {
        this.initDefaultIndex();
    },
    mounted() {
        this.$nextTick(function() {
            //将组件添加到body下，降低层级z-index的影响
            let dom = document.querySelector("#app>div") || document.querySelector("body");
            dom.appendChild(this.$el);
        });
    },
    methods: {
        initDefaultIndex(){
            //设置初始值
            let {data,defaultIndex} = this;
            for (let i = 0; i < data.length; i++) {
                let index = defaultIndex[i] || 0;
                this.selectedColumnIndex[i] = index;
                let instances = this.$refs[`pickerColumn`];
                if(instances)instances[i].setTransformY(index);//设置默认值的位置
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
            //确定
            this.close();
            let arr = [];
            for (let i = 0; i < this.selectedColumnIndex.length; i++) {
                let index = this.selectedColumnIndex[i];
                let obj = this.data[i][index];
                arr.push(obj);
            }
            this.$emit('confirm', arr);
        },
        change (res) {
            let {position,selectedIndex} = res;
            let str1 = this.selectedColumnIndex.join(',');
            this.selectedColumnIndex[position] = selectedIndex;
            let str2 = this.selectedColumnIndex.join(',');
            if(str1 === str2)return;
            this.jumpTopping(position + 1);
            this.$emit('change',{position,selectedIndex});
        },
        jumpTopping(index){
            //左侧的值发生修改，右侧全部置顶
            for (let i = index; i < this.data.length; i++) {
                let instance = this.$refs[`pickerColumn`][i];
                instance.parentComponentCall();//置顶
                this.selectedColumnIndex[i] = 0;
            }
        }
    },
};
</script>
<style scoped lang="scss">
div{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
button{
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    -webkit-appearance: none;
    appearance: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
}
.fade-enter-active,.fade-leave-active{
    opacity: 1;
    transition: opacity .3s;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
.ellipsis{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.Picker{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background-color: rgba($color: #000000, $alpha: 0.6);
    display: flex;
    align-items: flex-end;
    user-select: none;
    .close{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .container{
        background-color: #fff;
        width: 100%;
        .head{
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &::after{
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                border-bottom: 1px solid #f0f0f0;
                transform: scaleY(0.5);
            }
            .title{
                font-size: 15px;
                line-height: normal;
            }
            .cancel,.confirm{
                font-size: 15px;
                color: #000;
                line-height: normal;
                padding: 12px 16px;
                cursor: pointer;
                white-space: nowrap;
                outline: none;
                &:active{
                    opacity: 0.6;
                }
            }
        }
        .content{
            height: 225px;
            position: relative;
            .multi-column{
                width: 100%;
                height: 100%;
                display: flex;
                overflow: hidden;
                z-index: 1;
            }
            .line{
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                z-index: 9;
                transform: translateY(-50%);
                pointer-events: none;
                height: 45px;
                &::before{
                    top: 0;
                }
                &::after{
                    bottom: 0;
                }
                &::before,&::after{
                    content: "";
                    pointer-events: none;
                    position: absolute;
                    right: 0;
                    left: 0;
                    border-bottom: 1px solid #f0f0f0;
                    transform: scaleY(0.5);
                }
            }
            .mask{
                position: absolute;
                top: 0;
                left: 0;
                z-index: 8;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4)), linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));
                background-repeat: no-repeat;
                background-position: top, bottom;
                background-size: 100% 90px;
                backface-visibility: hidden;
                pointer-events: none;
            }
        }
    }
}
</style>
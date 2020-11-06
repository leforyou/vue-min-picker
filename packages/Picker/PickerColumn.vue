<template>
    <div class="column">
        <div class="row-line">
            <div class="ul" :style="animationStyle">
                <div class="li ellipsis"
                    v-for="(item, index) in lists"
                    :key="index"
                    :style="{ height: `${itemHeight}px`,lineHeight: `${itemHeight}px` }"
                >
                    {{ item.label }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*
滑动惯性思路:
在手指【按下》滑动》松开】屏幕的过程，时间间隔小于 LIMIT_TIME(280毫秒) 且滑动的距离大于 LIMIT_DISTANCE(16像素) 时，执行惯性滑动。
*/
//兼容手机与电脑
const IS_PHONE = 'ontouchstart' in window;
const START_EVENT = IS_PHONE ? 'touchstart' : 'mousedown';
const MOVE_EVENT = IS_PHONE ? 'touchmove' : 'mousemove';
const END_EVENT = IS_PHONE ? 'touchend' : 'mouseup';
export default {
    name: "Picker",
    props: {
        lists: {
            type: Array,
            default: () => [], //注意：处理props数据不更新，在父组件要用this.$set();设置值
        },
        defaultSelectedIndex: {
            type: Number,
            default: 0,
        },
        position: Number,
        itemHeight: Number,
    },
    data() {
        return {
            animationStyle:{
                transform: `translate3d(0px, 0px, 0px) translateZ(0px)`,
                transitionDuration: `0ms`,
                transitionProperty: `none`,
            }
        };
    },
    mounted() {
        this.$nextTick(function () {
            this.createEvent();
            this.setTransformY(this.defaultSelectedIndex);
        });
    },
    beforeDestroy(){
        //销毁监听事件，释放系统资源
        this.$el.removeEventListener(START_EVENT, this.handleStart, false);
        if (IS_PHONE) {
            this.$el.removeEventListener(MOVE_EVENT, this.handleMove, false);
            this.$el.removeEventListener(END_EVENT, this.handleEnd, false);
        }
    },
    methods: {
        createEvent(){
            //添加监听事件
            this.$el.addEventListener(START_EVENT, this.handleStart, false);
            if (IS_PHONE) {
                this.$el.addEventListener(MOVE_EVENT, this.handleMove, false);
                this.$el.addEventListener(END_EVENT, this.handleEnd, false);
            }
        },
        parentComponentCall(){
            //父组件通过ref调用（前面选项修改，后面选项置顶）
            this.animationStyle.transitionProperty = `transform`;
            this.animationStyle.transitionDuration = `0ms`;
            this.setTransformY(0);
        } ,
        setTransformY(index = 0){
            //设置滑动的位置
            this.selectedIndex = index;
            this.transformY = this.itemHeight * index;
            this.animationStyle.transform = `translate3d(0px, ${-this.transformY}px, 0px) translateZ(0px)`;
        },
        getTransformY(){
            //获取位置
            let {transform} = this.animationStyle;
            return parseInt(transform.split(',')[1].replace(/[^0-9|\-|.]/g,""));
        },
        getDeviceInfo(e){
            //获取屏幕参数
            let y = IS_PHONE ? e.changedTouches[0].clientY : e.clientY;
            return {y};
        },
        change() {
            //获取选中的值
            let selectedIndex = this.selectedIndex;
            let obj = {
                position:this.position,
                selectedIndex:selectedIndex ,
            }
            this.$emit('change',obj);
        },
        handleStart(e){
            //按下
            if (!IS_PHONE) {
                document.addEventListener(MOVE_EVENT, this.handleMove, false)
                document.addEventListener(END_EVENT, this.handleEnd, false)
            }
            this.animationStyle.transitionDuration = `0ms`;//禁止动画
            this.animationStyle.transitionProperty = `none`;//禁止动画
            this.startY = this.getDeviceInfo(e).y;
            this.startTime = Date.now();
            this.transformY = this.getTransformY();
        },
        handleMove(e){
            //移动
            e.stopPropagation();//阻止冒泡
            e.preventDefault();//阻止浏览器默认事件
            this.distance = this.getDeviceInfo(e).y - this.startY;
            let y = this.transformY + this.distance;
            let n = 100;//弹力,值越大,到度或到顶后,可以继续拉的越远
            if(y>0){
                //滑动边界（顶部）
                y = y * n / (n + y);//弹力模拟,公式只能死记硬背,公式为:位置=位置*弹力/(弹力+位置)
            }else if(y < 0 && Math.abs(y) > this.itemHeight * (this.lists.length - 1)){
                //滑动边界（底部）,下面的也是公式
                let h = this.itemHeight * this.lists.length;//窗口高度
                y += h - this.itemHeight;
                y = y * n / (n - y) - h + this.itemHeight;
            }
            this.animationStyle.transform = `translate3d(0px, ${y}px, 0px) translateZ(0px)`;
        },
        handleEnd(){
            //松开
            if (!IS_PHONE) {
                document.removeEventListener(MOVE_EVENT, this.handleMove, false)
                document.removeEventListener(END_EVENT, this.handleEnd, false)
            }
            const LIMIT_TIME = 280;
            const LIMIT_DISTANCE = 16;
            this.duration = Date.now() - this.startTime;//时间间隔
            if(this.duration < LIMIT_TIME && Math.abs(this.distance) > LIMIT_DISTANCE){
                //满足惯性滑动条件
                this.inertanceSlide(this.distance,this.duration);
            }else{
                //非惯性
                this.slowSlide();
            }
            this.change();
        },
        inertanceSlide(distance, duration){
            //惯性滑动:设置固定值加速度，速度直线递减到零
            let v = distance / duration;//速度
            let dir = v > 0 ? 1 : -1; //加速度方向
            let a = 0.003 * dir;//设置加速度，该值是参考网络文档
            let t = v/a;//惯性结束的时间=速度/加速度
            let s = 1/2 * v * t;//位移（路程）

            let transformY = Math.abs(Math.min(this.getTransformY() + s,0));
            let index = Math.round(transformY / this.itemHeight);
            index = Math.max(index,0);
            index = Math.min(index,this.lists.length - 1);
            this.animationStyle.transitionProperty = `transform`;
            this.animationStyle.transitionDuration = `1500ms`;
            this.setTransformY(index);
        },
        slowSlide(){
            //缓慢滑动，每项回滚到双线中间位置
            this.animationStyle.transitionProperty = `transform`;
            this.animationStyle.transitionDuration = `1000ms`;

            let transformY = this.getTransformY();
            if(transformY >= 0){
                //边界：第一个
                this.setTransformY(0);
            }else if(transformY < 0 && Math.abs(transformY) >= this.itemHeight * (this.lists.length - 1)){
                //边界：最后一个
                this.setTransformY(this.lists.length - 1);
            }else{
                //中间
                let s = Math.abs(transformY) / this.itemHeight;//商
                s = Math.round(s);//四舍五入
                this.setTransformY(s);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
div{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.ellipsis{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}
.column {
    width: 100%;
    height: 100%;
    position: relative;

    .row-line {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        pointer-events: none;
        height: 45px;
        .ul {
            //transition-timing-function: cubic-bezier(0.2, 0.8, 0.3, 1);
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
            .li {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #000;
                text-align: center;
                padding: 0px 10px;
                font-size: 15px;
                line-height: 45px;
            }
        }
    }
}
</style>

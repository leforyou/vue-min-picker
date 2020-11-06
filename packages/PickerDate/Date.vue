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
    data() {
        return {
            data:[],
            defaultIndex:[0,0,0],
            startDate:"",
            endDate:"",
        };
    },
    created() {
        
    },
    mounted() {
        this.$nextTick(function() {
            
        });
    },
    methods: {
        
    },
};
</script>
<style scoped lang="scss">
.PickerDate{
    
}
</style>
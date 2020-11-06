<template>
  <div id="app">
    <div class="explain">PS：【日期picker】与【省市区picker】是基于【普通picker】进行开发的</div>
    <div class="button-ground">
      <Button1 @success="change1"/>
      <Button2 @success="change2"/>
      <Button3 @success="change3"/>
    </div>
    <div class="info">
      <p>{{value1}}</p>
      <p>{{value2}}</p>
      <p>{{value3}}</p>
    </div>
  </div>
</template>

<script>
import Button1 from "./components/Button1";
import Button2 from "./components/Button2";
import Button3 from "./components/Button3";

export default {
  name: 'App',
  components: {
    Button1,
    Button2,
    Button3,
  },
  data(){
    return {
      value1:'',
      value2:'',
      value3:'',
    }
  },
  methods: {
    change1(value){
      console.log('value: ', value);
      this.value1 = value;
    },
    change2(value){
      this.value2 = value;
    },
    change3(value){
      this.value3 = value;
    }
  },
}
</script>

<style scoped lang="scss">
#app {
  .explain{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }
  .button-ground{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info{
    font-size: 13px;
    p{
      padding: 10px 0px;
    }
  }
}
</style>

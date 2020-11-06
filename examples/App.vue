<template>
  <div id="app">
    <div class="explain">PS：【日期picker】与【省市区picker】是基于【普通picker】进行开发的</div>
    <div class="button-ground">
      <Button1 />
      <Button2 />
      <Button3 />
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
  }
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
}
</style>

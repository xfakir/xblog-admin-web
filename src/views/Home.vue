<template>
  <el-container class="test">
    <el-aside width="256px">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  components: {
    SideMenu: () => import("@/views/SideMenu")
  }
};
</script>

<style>
.test {
  height: 100%;
  background-color: #42b983;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  height: 100%;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
  body{
    margin: 0;
    padding: 0;
  }
</style>

<template>
  <div>
    <el-submenu
      v-if="item.subMenu !== undefined && item.subMenu.length !== 0"
      :index="item.path"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item
        v-for="(subitem, index) in item.subMenu"
        :key="index"
        :index="subitem.path"
      >
        {{ subitem.title }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else :index="item.path">
      <i class="el-icon-location"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>

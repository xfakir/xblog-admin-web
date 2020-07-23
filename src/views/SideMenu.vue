<template>
  <div>
    <el-menu
      :collapse="isCollapse"
      class="el-menu-vertical"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <!--<el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        v-for="(item, index) in sideMenu"
        :key="index"
        :index="item.index.toString()"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>-->
      <menu-item
        v-for="(item, index) in sideMenu"
        :key="index"
        :item="item"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SideMenu",
  components: {
    MenuItem: () => import("@/views/MenuItem")
  },
  data() {
    return {
      sideMenu: []
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  mounted: function() {
    this.getSideMenu();
  },
  methods: {
    getSideMenu() {
      let that = this;
      this.$axios
        .get("/sidemenu")
        .then(function(res) {
          that.sideMenu = res.data.sideMenu;
        })
        .catch(function(err) {
          console.log("err" + err);
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped></style>

<template>
  <div class="nav-warpper">
    <div class="nav-first">
      <side-menu-contoller
        id="side-menu-control"
        :is-active="sidebar.opened"
        class="side-menu-control"
        @toggleClick="toggleSideBar"
      ></side-menu-contoller>
      <div class="breadcrumb-container">
        <bread-crumb></bread-crumb>
      </div>
      <div class="right">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </div>
    </div>
    <el-divider class="nav-divider"></el-divider>
    <div class="nav-second"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SideMenuContoller from "@/components/SideMenuContoller/SideMenuContoller";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
export default {
  data() {
    return {
      search: ""
    };
  },
  components: {
    BreadCrumb,
    SideMenuContoller
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

<style scoped>
.nav-warpper {
  height: 100%;
  padding: 0;
}
.nav-first {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.nav-second {
  height: 38%;
}
.nav-divider {
  margin: 0;
}
.side-menu-control {
  float: left;
  width: 48px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}
.side-menu-control:hover {
  background: rgba(0, 0, 0, 0.025);
}

.breadcrumb-container {
  float: left;
}
.right {
  float: right;
}
</style>

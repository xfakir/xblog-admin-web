<template>
  <div :class="classObj" class="app-wrapper">
    <side-menu class="side-menu"></side-menu>
    <div class="app-container">
      <div>
        <navbar />
      </div>
      <div class="main-router">
        <router-view></router-view>
      </div>
      <div class="footer-container">Footer</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    SideMenu: () => import("@/views/SideMenu"),
    Navbar: () => import("@/views/Navbar")
  },
  computed: {
    ...mapState({
      sidebar: state => state.sidebar
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/basic.scss";
@import "~@/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.app-container {
}
.footer-container {
  padding-top: 5px;
}
.el-header,
.el-footer {
  background: #fff;
  text-align: center;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.hideSidebar {
  width: calc(100% - 54px);
}
.main-router {
  width: 100%;
}
</style>

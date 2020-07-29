<template>
  <div>
    <mavon-editor v-model="value" />
  </div>
</template>

<script>
export default {
  name: "new",
  data() {
    return {
      value: "",
    }
  }
};
//todo 写文章和修改共用该页面
</script>

<style scoped></style>

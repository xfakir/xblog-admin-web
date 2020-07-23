const Mock = require("mockjs");

Mock.mock("/sidemenu", "get", () => {
  let sideMenu = [
    {
      index: 2,
      title: "first",
      subMenu: [{ title: "first-1" }, { title: "first-2" }],
      path: ""
    },
    {
      index: 3,
      title: "second",
      subMenu: [],
      path: "test1"
    },
    {
      index: 4,
      title: "third",
      subMenu: [],
      path: "test2"
    }
  ];
  return {
    sideMenu: sideMenu
  };
});

Mock.mock("/vue-element-admin/article/list", "get", () => {
  let items = [
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-03",
      name: "王二虎",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-04",
      name: "王二虎",
      address: "上海市普陀区金沙江路 1516 弄"
    },
    {
      date: "2016-05-05",
      name: "王三虎",
      address: "上海市普陀区金沙江路 1518 弄"
    },
    {
      date: "2016-05-06",
      name: "王三虎",
      address: "上海市普陀区金沙江路 1517 弄"
    },
    {
      date: "2016-05-07",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄"
    },
    {
      date: "2016-05-08",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄"
    }
  ];
  return {
    items: items,
    total: items.length
  };
});

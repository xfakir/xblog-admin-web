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
      date: "2020-07-21",
      name: "王小虎",
      category: "Java"
    },
    {
      date: "2020-07-21",
      name: "王小虎",
      category: "Java"
    },
    {
      date: "2020-07-21",
      name: "王二虎",
      category: "Liunx"
    },
    {
      date: "2020-07-21",
      name: "王二虎",
      category: "Java"
    },
    {
      date: "2020-07-21",
      name: "王三虎",
      category: "HTTP"
    },
    {
      date: "2016-05-06",
      name: "王三虎",
      category: "Mysql"
    },
    {
      date: "2016-05-07",
      name: "王小虎",
      category: "Redis"
    },
    {
      date: "2016-05-08",
      name: "王小虎",
      category: "Java"
    }
  ];
  return {
    items: items,
    total: items.length
  };
});

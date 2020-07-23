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

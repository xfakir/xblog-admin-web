const Mock = require("mockjs");

Mock.mock("/sidemenu", "get", () => {
  let sideMenu = [
    {
      index: 2,
      title: "first",
      subMenu: [{ title: "first-1" }, { title: "first-2" }]
    },
    {
      index: 3,
      title: "second",
      subMenu: []
    },
    {
      index: 4,
      title: "third",
      subMenu: []
    }
  ];
  return {
    sideMenu: sideMenu
  };
});

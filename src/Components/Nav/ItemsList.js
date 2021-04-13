const ItemsList = [
  {
    title: "Nav.info",
    type: "dropdown",
    dropdown: [
      { title: "Nav.about", url: "/about", cName: "nav-links" },
      { title: "Nav.faq", url: "/faq", cName: "nav-links" },
      { title: "Nav.contact", url: "/contact", cName: "nav-links" },
    ],
    loginState: "all",
    cName: "nav-drop",
  },
  {
    title: "Nav.signLog",
    type: "dropdown",
    dropdown: [
      { title: "Nav.sign", url: "/register", cName: "nav-links" },
      { title: "Nav.log", url: "/login", cName: "nav-links" },
    ],
    loginState: "guest",
    cName: "nav-drop",
  },
  {
    title: "Nav.acc",
    type: "dropdown",
    dropdown: [
      { title: "Nav.acc", url: "/account", cName: "nav-links" },
      { title: "Nav.out", url: "/logout", cName: "nav-links" },
    ],
    loginState: "user",
    cName: "nav-drop",
  },
  {
    title: "Nav.lang",
    type: "select",
    dropdown: [
      { title: "Nav.en", value: "en", cName: "nav-links" },
      { title: "Nav.fr", value: "fr", cName: "nav-links" },
    ],
    loginState: "all",
    cName: "nav-drop",
  },
];
export default ItemsList;

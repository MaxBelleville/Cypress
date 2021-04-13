import React, { Component } from "react";
import ItemsList from "./ItemsList";
import { NavItemT } from "./NavItem";
import { Nav, Navbar } from "react-bootstrap";
import { withTranslation } from "react-i18next";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: "en",
    };
    if (sessionStorage.getItem("lang")) {
      this.state = {
        lang: sessionStorage.getItem("lang"),
      };
      const { i18n } = this.props;
      i18n.changeLanguage(this.state.lang);
    }
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(key) {
    this.setState({
      lang: key,
    });
    sessionStorage.setItem("lang", key);
    const { i18n } = this.props;
    i18n.changeLanguage(key);
  }

  render() {
    return (
      <Navbar variant="dark" expand="lg">
        <Navbar.Brand className="ml-2" href="/">
          <img
            alt=""
            src="/assets/logo.svg"
            width="144"
            height="42"
            className="d-inline-block align-top"
          />
          <h3 className="d-inline-block align-bottom m-0">CYPRESS</h3>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={this.state.lang}>
            {ItemsList.map((item, indx) => (
              <NavItemT
                {...item}
                userState={this.props.userState}
                select={this.handleSelect}
                key={indx}
              />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export const NavBarT = withTranslation("common")(NavBar);

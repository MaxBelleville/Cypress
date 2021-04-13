import React, { Component } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class NavItem extends Component {
  render() {
    const { t } = this.props;
    if (
      this.props.loginState === "all" ||
      this.props.loginState === this.props.userState
    ) {
      let DropdownTemplate;
      if (this.props.type === "dropdown") {
        DropdownTemplate = this.props.dropdown.map((item, indx) => (
          <NavDropdown.Item className={item.cName} href={item.url} key={indx}>
            {t(item.title)}
          </NavDropdown.Item>
        ));
        return (
          <NavDropdown title={t(this.props.title)} className={this.props.cName}>
            {DropdownTemplate}
          </NavDropdown>
        );
      } else if (this.props.type === "select") {
        DropdownTemplate = this.props.dropdown.map((item, indx) => (
          <NavDropdown.Item
            className={item.cName}
            eventKey={item.value}
            key={indx}
          >
            {t(item.title)}
          </NavDropdown.Item>
        ));
        return (
          <NavDropdown
            onSelect={this.props.select}
            title={t(this.props.title)}
            className={this.props.cName}
          >
            {DropdownTemplate}
          </NavDropdown>
        );
      }
      return (
        <Nav.Link className={this.props.cName} href={this.props.url}>
          {t(this.props.title)}
        </Nav.Link>
      );
    } else return <div></div>;
  }
}
export const NavItemT = withTranslation("common")(NavItem);

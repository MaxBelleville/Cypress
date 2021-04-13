import React, { Component } from "react";
import { Redirect } from "react-router-dom";
export class Logout extends Component {
  constructor(props) {
    super(props);
    sessionStorage.removeItem("sessionEmail");
    sessionStorage.removeItem("sessionPass");
    this.props.change();
  }
  render() {
    return <Redirect to="/" />;
  }
}

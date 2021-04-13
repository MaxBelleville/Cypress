import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withTranslation } from "react-i18next";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      redirect: false,
      failMessage: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    const { t } = this.props;
    const data = {
      email: this.state.email,
      password: this.state.pass,
    };
    axios
      .post("http://localhost:5000/loginUser", data)
      .then((res) => {
        this.setState({ redirect: true });
        sessionStorage.setItem("sessionEmail", data.email);
        sessionStorage.setItem("sessionPass", data.password);
        this.props.change();
      })
      .catch((err) => {
        this.setState({ failMessage: t("Reg.badP") });
      });
    event.preventDefault();
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { t } = this.props;
    return (
      <div className="main mt-5">
        <Container className="login account">
          <Form onSubmit={this.handleLogin}>
            <h5>{this.state.failMessage}</h5>

            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                placeholder="Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>{t("Reg.pass")}</Form.Label>
              <Form.Control
                value={this.state.pass}
                onChange={(e) => this.setState({ pass: e.target.value })}
                type="password"
                placeholder={t("Reg.pass")}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Nav.log")}
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export const LoginT = withTranslation("common")(Login);

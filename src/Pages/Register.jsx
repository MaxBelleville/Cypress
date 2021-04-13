import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../Styles/Account.css";
import axios from "axios";
import { withTranslation } from "react-i18next";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      addr: "",
      phone: "",
      pass: "",
      repass: "",
      failMessage: "",
      redirect: false,
      toggle: false,
    };
    this.handleReg = this.handleReg.bind(this);
  }

  handleReg(e) {
    const { t } = this.props;
    if (this.state.pass !== this.state.repass && this.state.pass !== "")
      this.setState({ failMessage: t("Reg.e1") });
    else if (!this.state.toggle) this.setState({ failMessage: t("Reg.e2") });
    else if (this.state.pass.length < 8)
      this.setState({ failMessage: t("Reg.e3") });
    else if (
      /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.state.pass) === false
    )
      this.setState({
        failMessage: t("Reg.e4"),
      });
    else if (/\d/.test(this.state.pass) === false)
      this.setState({ failMessage: t("Reg.e5") });
    else if (this.state.phone.length < 10)
      this.setState({ failMessage: t("Reg.e6") });
    else if (!this.state.email.includes("@") || !this.state.email.includes("."))
      this.setState({ failMessage: t("Reg.e7") });
    else {
      const data = {
        email: this.state.email,
        password: this.state.pass,
        firstName: this.state.fname,
        lastName: this.state.lname,
        address: this.state.addr,
        phoneNumber: this.state.phone,
      };
      axios
        .post("http://localhost:5000/createuser", data)
        .then((res) => {
          console.log(res);
          sessionStorage.setItem("sessionEmail", data.email);
          sessionStorage.setItem("sessionPass", data.password);
          this.setState({ redirect: true });
          this.props.change();
        })
        .catch((err) => {
          console.log(err);
          this.setState({ failMessage: t("Reg.e8") });
        });
    }
    e.preventDefault();
  }
  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main mt-5">
        <Container className="register account">
          <Form onSubmit={this.handleReg}>
            <h5>{this.state.failMessage}</h5>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName1">
                <Form.Label>{t("Reg.fn")}</Form.Label>
                <Form.Control
                  value={this.state.fname}
                  onChange={(e) => this.setState({ fname: e.target.value })}
                  placeholder={t("Reg.ent") + t("Reg.fn")}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridName2">
                <Form.Label>{t("Reg.ln")}</Form.Label>
                <Form.Control
                  value={this.state.lname}
                  onChange={(e) => this.setState({ lname: e.target.value })}
                  placeholder={t("Reg.ent") + t("Reg.ln")}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridAddress1">
              <Form.Label>{t("Reg.addr")}</Form.Label>
              <Form.Control
                value={this.state.addr}
                onChange={(e) => this.setState({ addr: e.target.value })}
                placeholder={t("Reg.ent") + t("Reg.addr")}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridPhone">
              <Form.Label>{t("Reg.addr")}</Form.Label>
              <Form.Control
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
                placeholder={t("Reg.ent") + t("Reg.phone")}
                required
              />
              <Form.Text id="phoneHelp" muted>
                {t("Reg.dig")}
              </Form.Text>
            </Form.Group>

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

            <Form.Group controlId="formGridPassword">
              <Form.Label>{t("Reg.pass")}</Form.Label>
              <Form.Control
                value={this.state.pass}
                onChange={(e) => this.setState({ pass: e.target.value })}
                type="password"
                placeholder={t("Reg.pass")}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGridRePass">
              <Form.Label>{"Re-" + t("Reg.ent") + t("Reg.pass")}</Form.Label>
              <Form.Control
                value={this.state.repass}
                onChange={(e) => this.setState({ repass: e.target.value })}
                type="password"
                placeholder={"Re-" + t("Reg.ent") + t("Reg.pass")}
                required
              />
            </Form.Group>

            <Form.Group id="formGridCheckbox">
              <Form.Check
                value={this.state.toggle}
                onClick={(e) => this.setState({ toggle: !this.state.toggle })}
                type="checkbox"
                label={t("Reg.terms")}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {t("Reg.reg")}
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export const RegisterT = withTranslation("common")(Register);

import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import "../Styles/Account.css";
import axios from "axios";
export class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      addr: "",
      email: sessionStorage.getItem("sessionEmail"),
      pass: sessionStorage.getItem("sessionPass"),
      phone: "",
      failMessage: "",
      redirect: false,
    };
    const data = {
      email: this.state.email,
      password: this.state.pass,
    };
    axios.post("http://localhost:5000/loginUser", data).then((res) => {
      this.setState({
        fname: res.data.firstName,
        lname: res.data.lastName,
        addr: res.data.address,
        phone: res.data.phoneNumber,
      });
    });
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(event) {
    const data = {
      email: this.state.email,
    };
    axios.post("http://localhost:5000/deleteAllReports", data);
    axios.post("http://localhost:5000/deleteProfile", data).then((res) => {
      this.setState({ redirect: true });
      sessionStorage.removeItem("sessionEmail");
      sessionStorage.removeItem("sessionPass");
      this.props.change();
    });
    event.preventDefault();
  }

  handleUpdate(event) {
    const { t } = this.props;
    if (this.state.phone.length < 10)
      this.setState({ failMessage: t("Reg.e6") });
    else {
      const data = {
        email: sessionStorage.getItem("sessionEmail"),
        firstName: this.state.fname,
        lastName: this.state.lname,
        address: this.state.addr,
        phoneNumber: this.state.phone,
      };
      axios.post("http://localhost:5000/updateProfile", data).then((res) => {
        this.setState({ redirect: true });
      });
    }
    event.preventDefault();
  }
  render() {
    const { t } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main mt-5">
        <Container className="update account">
          <Form onSubmit={this.handleUpdate}>
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
                disabled
              />
            </Form.Group>

            <Form.Group controlId="formGridPassword">
              <Form.Label>{t("Reg.pass")}</Form.Label>
              <Form.Control
                value={this.state.pass}
                onChange={(e) => this.setState({ pass: e.target.value })}
                type="password"
                placeholder={t("Reg.pass")}
                disabled
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Container>
        <Container className="delete account">
          <Form onSubmit={this.handleDelete}>
            <Button variant="danger" type="submit">
              {t("Reg.del")}
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export const AccountT = withTranslation("common")(Account);

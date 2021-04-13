import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { LocationMap } from "../../Components/LocationMap";
import axios from "axios";
import { withTranslation } from "react-i18next";
function getDefaultOpts() {
  return [
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ];
}
class Create extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      address: "",
      opt: getDefaultOpts(),
      labels: [
        [t("Post.l1"), t("Post.l2")],
        [t("Post.l3"), t("Post.l4")],
        [t("Post.l5"), t("Post.l6")],
        [t("Post.l7"), t("Post.l7")],
      ],
      issue: "",
      desc: "",

      redirect: false,
      failMessage: "",
    };
    this.createPost = this.createPost.bind(this);
    this.setLoc = this.setLoc.bind(this);
  }

  setLoc(addr) {
    console.log(addr);
    this.setState({ address: addr });
  }

  createPost(event) {
    const { t } = this.props;
    if (this.state.issue === "") {
      this.setState({ failMessage: t("Post.e1") });
    } else if (this.state.address === "") {
      this.setState({ failMessage: t("Post.e2") });
    } else {
      const data = {
        email: sessionStorage.getItem("sessionEmail"),
        address: this.state.address,
        issueType: this.state.issue,
        description: this.state.desc,
      };
      axios
        .post("http://localhost:5000/createreport", data)
        .then((res) => {
          console.log("Posted");
          this.setState({ redirect: true });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ failMessage: "Error" });
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
        <Container className="create post">
          <LocationMap setLoc={this.setLoc} />
          <Form onSubmit={this.createPost}>
            <h5>{this.state.failMessage}</h5>
            {this.state.labels.map((list, indx) => {
              return (
                <Form.Row key={indx}>
                  {list.map((label, indx2) => {
                    return (
                      <Form.Group key={indx2} as={Col} id="formGridCheckbox">
                        <Form.Check
                          checked={this.state.opt[indx][indx2]}
                          onChange={(e) => {
                            var tmp = getDefaultOpts();
                            tmp[indx][indx2] = true;
                            this.setState({
                              opt: tmp,
                              issue: label,
                            });
                          }}
                          type="checkbox"
                          label={label}
                        />
                      </Form.Group>
                    );
                  })}
                </Form.Row>
              );
            })}
            <Form.Group controlId="formGridDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.desc}
                onChange={(e) => this.setState({ desc: e.target.value })}
                placeholder="Description"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Post.create")}
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export const CreateT = withTranslation("common")(Create);

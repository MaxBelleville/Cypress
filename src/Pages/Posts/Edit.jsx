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
class Edit extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.createPost = this.createPost.bind(this);
    this.setLoc = this.setLoc.bind(this);
    var post = this.props.location.state.elem;
    var label = [
      [t("Post.l1"), t("Post.l2")],
      [t("Post.l3"), t("Post.l4")],
      [t("Post.l5"), t("Post.l6")],
      [t("Post.l7"), t("Post.l7")],
    ];
    var tmp = getDefaultOpts();
    for (let i in label) {
      for (let j in label[i]) {
        if (label[i][j] === post.issueType) {
          tmp[i][j] = true;
        }
      }
    }
    this.state = {
      address: post.address,
      opt: tmp,
      labels: label,
      issue: post.issueType,
      desc: post.description,

      redirect: false,
      failMessage: "",
    };
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
      var post = this.props.location.state.elem;
      const data = {
        id: post._id,
        email: sessionStorage.getItem("sessionEmail"),
        address: this.state.address,
        issueType: this.state.issue,
        description: this.state.desc,
      };
      axios
        .post("http://localhost:5000/editreport", data)
        .then((res) => {
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
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    const { t } = this.props;
    return (
      <div className="main mt-5">
        <Container className="create post">
          <LocationMap setLoc={this.setLoc} address={this.state.address} />
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
              <Form.Label>{t("Post.desc")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={this.state.desc}
                onChange={(e) => this.setState({ desc: e.target.value })}
                placeholder={t("Post.desc")}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Reg.up")}
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
export const EditT = withTranslation("common")(Edit);

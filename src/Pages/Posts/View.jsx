import React, { Component } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { Redirect } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem("sessionEmail"),
      myPosts: [],
      otherPosts: [],
      redirectEdit: false,
      redirectView: false,
      redirectEl: {},
    };
    const data = {
      email: this.state.email,
    };
    axios.post("http://localhost:5000/getreports", data).then((res) => {
      this.setState({ otherPosts: res.data.reports });
    });
    this.viewPost = this.viewPost.bind(this);
    this.updateMyPosts = this.updateMyPosts.bind(this);
    this.editPost = this.editPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.updateMyPosts(data);
  }

  updateMyPosts(data) {
    axios.post("http://localhost:5000/getusersreports", data).then((res) => {
      this.setState({ myPosts: res.data.reports });
    });
  }

  viewPost(post) {
    this.setState({ redirectEl: post });
    this.setState({ redirectView: true });
  }
  deletePost(post) {
    const data = {
      id: post._id,
    };
    axios.post("http://localhost:5000/deleteReport", data).then((res) => {
      const data2 = {
        email: this.state.email,
      };
      this.updateMyPosts(data2);
    });
  }
  editPost(post) {
    this.setState({ redirectEl: post });
    this.setState({ redirectEdit: true });
  }

  render() {
    if (this.state.redirectEdit) {
      return (
        <Redirect
          to={{
            pathname: "/posts/edit",
            state: { elem: this.state.redirectEl },
          }}
        />
      );
    }
    if (this.state.redirectView) {
      return (
        <Redirect
          to={{
            pathname: "/posts/post",
            state: { elem: this.state.redirectEl },
          }}
        />
      );
    }
    const { t } = this.props;
    return (
      <div className="main mt-5">
        <Container className="view post">
          {this.state.myPosts.length > 0 ? (
            <h3>{t("Post.myP")}</h3>
          ) : (
            <div></div>
          )}
          {this.state.myPosts.map((post, indx) => {
            return (
              <div key={indx} className="m-2">
                <Button variant="dark">
                  <p className="d-inline" onClick={() => this.viewPost(post)}>
                    {post.address}
                  </p>
                  <MdEdit onClick={() => this.editPost(post)} className="m-2" />
                  <MdDelete
                    onClick={() => this.deletePost(post)}
                    className="m-2"
                  />
                </Button>
              </div>
            );
          })}
          {this.state.otherPosts.length > 0 ? (
            <h3>{t("Post.otherP")}</h3>
          ) : (
            <div></div>
          )}
          {this.state.otherPosts.map((post, indx) => {
            return (
              <div className="m-2">
                <Button key={indx} variant="dark">
                  <p className="d-inline" onClick={() => this.viewPost(post)}>
                    {post.address}
                  </p>
                </Button>
              </div>
            );
          })}
        </Container>
      </div>
    );
  }
}
export const ViewT = withTranslation("common")(View);

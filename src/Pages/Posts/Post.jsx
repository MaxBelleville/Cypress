import React, { Component } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { LocationMap } from "../../Components/LocationMap";
import { withTranslation } from "react-i18next";
class Post extends Component {
  constructor(props) {
    super(props);
    var post = this.props.location.state.elem;
    this.state = {
      address: post.address,
      issue: post.issueType,
      desc: post.description,
    };
  }

  render() {
    return (
      <div className="main mt-5">
        <Container className="display post">
          <h3 className="p-1">{this.state.address}</h3>
          <LocationMap
            setLoc={() => {}}
            address={this.state.address}
            locked={true}
          />
          <h5 className="p-1">{this.state.issue}</h5>
          <p className="pt-3">{this.state.desc}</p>
        </Container>
      </div>
    );
  }
}
export const PostT = withTranslation("common")(Post);

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import "../Styles/Home.css";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { t } = this.props;
    return (
      <div className="main">
        <img className="background" src="assets/Home.jpg"></img>
        <div className="home">
          <div className="text-section">
            <h5>{t("Home.title")}</h5>
            <p>
              {t("Home.desc")}
              <br></br>
              {t("Home.descNext")}
              <a href="about">{t("Home.h")}</a>
            </p>
          </div>
          {this.props.acc === "user" ? (
            <div className="button-section">
              <Button href="posts/view" variant="warning">
                {t("Home.view")}
              </Button>
              <Button href="posts/create" variant="warning">
                {t("Home.create")}
              </Button>
            </div>
          ) : (
            <div className="button-section">
              <Button href="posts/view" variant="warning">
                {t("Home.view")}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export const HomeT = withTranslation("common")(Home);

import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "../Styles/Info.css";
class FAQ extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="main info">
        <div className="text-section">
          <h5>Cypress FAQ</h5>
          <p>
            <strong>{t("FAQ.q1")}</strong>
            <br></br>
            {t("FAQ.a1")}
            <br></br>
            <strong>{t("FAQ.q2")}</strong>
            <br></br>
            {t("FAQ.a2")}
            <br></br>
            <strong>{t("FAQ.q3")}</strong>
            <br></br>
            {t("FAQ.a4")}
            <br></br>
            <strong>{t("FAQ.q4")}</strong>
            <br></br>
            {t("FAQ.a4")}
          </p>
        </div>
      </div>
    );
  }
}
export const FAQT = withTranslation("common")(FAQ);

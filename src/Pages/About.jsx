import React, { Component } from "react";
import { withTranslation } from "react-i18next";
class About extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="main info">
        <div className="text-section">
          <h5>Cypress {t("Nav.about")}</h5>
          <p>
            {t("About.1")}
            <br></br>
            {t("About.2")}
          </p>
        </div>
      </div>
    );
  }
}
export const AboutT = withTranslation("common")(About);

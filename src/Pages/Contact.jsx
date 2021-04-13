import React, { Component } from "react";
import "../Styles/Info.css";
import { withTranslation } from "react-i18next";
class Contact extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="main info">
        <div className="text-section">
          <h5>Cypress {t("Nav.contact")}</h5>
          <p>
            {t("Contact.info")}
            <br></br>
            {t("Contact.soc")}
          </p>
        </div>
      </div>
    );
  }
}
export const ContactT = withTranslation("common")(Contact);

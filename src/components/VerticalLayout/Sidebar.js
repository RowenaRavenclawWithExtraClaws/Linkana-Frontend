import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

//i18n
import { withTranslation } from "react-i18next/src/hooks";
import SidebarContent from "./SidebarContent";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent />
            </SimpleBar>
          ) : (
            <SidebarContent />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

export default withRouter(withTranslation()(Sidebar));

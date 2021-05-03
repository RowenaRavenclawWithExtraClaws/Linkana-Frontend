import PropTypes from "prop-types";
import React, { useEffect } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next/src/hooks";
import ICONS from "../Common/icons";
import ROUTES from "../../helpers/routes_helper";

const SidebarContent = (props) => {
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === "/") {
          matchingMenuItem = items[i];
          break;
        }
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      return false;
    }
    return false;
  }

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu list-unstyled" id="side-menu">
          {/* overview route */}
          <li>
            <Link to={ROUTES.overview} className="waves-effect">
              <i className={ICONS.homeIcon}></i>
              <span>{props.t("Overview")}</span>
            </Link>
          </li>
          {/* device management route */}
          <li>
            <Link to={ROUTES.devices} className="waves-effect">
              <i className={ICONS.deviceIcon}></i>
              <span>{props.t("Device management")}</span>
            </Link>
          </li>
          {/* resource monitoring route */}
          <li>
            <Link to={ROUTES.monitoring} className="waves-effect">
              <i className={ICONS.monitoringIcon}></i>
              <span>{props.t("Resource monitoring")}</span>
            </Link>
          </li>
          {/* remote commands route */}
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className={ICONS.remoteCommandIcon}></i>
              <span>{props.t("Remote commands")}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to={ROUTES.remoteCommands}>{props.t("Devices")}</Link>
              </li>
              <li>
                <Link to={ROUTES.commands}>{props.t("Commands")}</Link>
              </li>
            </ul>
          </li>
          {/* applications route */}
          <li>
            <Link to={ROUTES.apps} className="waves-effect">
              <i className={ICONS.appsIcon}></i>
              <span>{props.t("Applications")}</span>
            </Link>
          </li>
          {/* digital assitants route */}
          <li>
            <Link to="/#" className="has-arrow waves-effect">
              <i className={ICONS.digAssIcon}></i>
              <span>{props.t("Digital assistants")}</span>
            </Link>
            <ul className="sub-menu" aria-expanded="false">
              <li>
                <Link to={ROUTES.digitalAssistants}>
                  {props.t("AI testing")}
                </Link>
              </li>
            </ul>
          </li>
          {/* interactions route */}
          <li>
            <Link to={ROUTES.interactions} className="waves-effect">
              <i className={ICONS.interactions}></i>
              <span>{props.t("Interactions")}</span>
            </Link>
          </li>
          {/* user management route */}
          <li>
            <Link to={ROUTES.userManage} className="waves-effect">
              <i className={ICONS.userManage}></i>
              <span>{props.t("User management")}</span>
            </Link>
          </li>
          {/* user guide route */}
          <li>
            <Link to={ROUTES.userGuide} className="waves-effect">
              <i className={ICONS.userGuide}></i>
              <span>{props.t("User guide")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));

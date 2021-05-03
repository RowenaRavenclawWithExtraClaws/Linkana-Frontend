import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Nav, NavItem, NavLink } from "reactstrap";

const VerticalNavBar = (props) => {
  return (
    <Nav className="flex-column" pills>
      {props.navObjects.map((obj, key) => (
        <NavItem key={`nav_${key}`}>
          <NavLink
            className={classnames({
              active: props.activeTab === key,
            })}
            onClick={() => props.switchTab(key)}
          >
            <i className={`${obj.icon} d-block check-nav-icon mt-4 mb-2`}></i>
            <p className="font-weight-bold mb-4">{obj.title}</p>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

VerticalNavBar.propTypes = {
  navObjects: PropTypes.array,
  activeTab: PropTypes.number,
  switchTab: PropTypes.func,
};

export default VerticalNavBar;

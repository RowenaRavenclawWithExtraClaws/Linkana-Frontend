import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Nav, NavItem, NavLink } from "reactstrap";

const NavigationBar = (props) => {
  return (
    <Nav tabs className="nav-tabs-custom nav-justified">
      {props.titles.map((title, key) => (
        <NavItem key={`${title}_key`}>
          <NavLink
            className={classnames({
              active: props.activeTab === key.toString(),
            })}
            onClick={() => props.switchTab(key.toString())}
          >
            <span className="d-none d-sm-block">{title}</span>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

NavigationBar.propTypes = {
  titles: PropTypes.array,
  activeTab: PropTypes.string,
  switchTab: PropTypes.func,
};

export default NavigationBar;

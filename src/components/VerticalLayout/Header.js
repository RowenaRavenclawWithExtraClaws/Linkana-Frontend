import PropTypes from "prop-types";
import React, { useState } from "react";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import TopbarLogo from "../Common/topbarLogo";
import ICONS from "../Common/icons";
import DashTour from "../Common/tour/tour";
import { toggleType } from "../../helpers/utility";

const Header = () => {
  const [isTourOpen, toggleTour] = useState(false);

  //const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex">
          <TopbarLogo />
          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 header-item waves-effect"
            id="vertical-menu-btn"
          >
            <i className="fa fa-fw fa-bars" onClick={toggleType} />
          </button>
        </div>
        <div className="d-flex">
          <i
            className={`${ICONS.tourIcon} fa-lg tour-icon`}
            onClick={() => toggleTour(true)}
          />
          <DashTour
            isOpen={isTourOpen}
            route={window.location.pathname.slice(1)}
            onClose={() => toggleTour(false)}
          ></DashTour>
          <LanguageDropdown />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

export default Header;

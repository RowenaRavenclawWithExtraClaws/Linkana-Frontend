import React, { useState } from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "./assets/scss/index.css";
import "toastr/build/toastr.min.css";
import { collapseExtendSidebar } from "./helpers/utility";

const App = (props) => {
  // true when a user enters a correct username and password
  const [isAuthed, toggleAuthed] = useState(true);

  // choose between horizontal and vertical layouts
  function getLayout() {
    return VerticalLayout;
  }

  localStorage.setItem("authUser", "faketoken");

  const Layout = getLayout();
  const menuType = localStorage.getItem("menu-type");

  collapseExtendSidebar(menuType);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              isAuthed={isAuthed}
              toggleAuthed={toggleAuthed}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
              isAuthed={isAuthed}
              toggleAuthed={toggleAuthed}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;

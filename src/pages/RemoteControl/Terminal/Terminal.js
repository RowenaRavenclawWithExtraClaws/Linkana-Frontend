import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardBody, Container } from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import ICONS from "../../../components/Common/icons";
import {
  closeSocket,
  closeTerminal,
  connectSocket,
  openTerminal,
} from "../../../helpers/terminal_helper";
import { COLORS } from "../../../helpers/utility";

const Terminal = () => {
  // connection state
  const [connected, setConnected] = useState(false);
  const [fullscreen, toggleFullscreen] = useState(false);
  // device info
  const serial = useParams().id;
  const label = localStorage.getItem("label");

  const terminalHeight = 850;

  document.addEventListener("fullscreenchange", (ev) => {
    toggleFullscreen(!fullscreen);
  });

  useEffect(() => {
    connectSocket(serial, setConnected);
    openTerminal();

    return () => {
      closeSocket();
      closeTerminal();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFullscreen = () => {
    if (!fullscreen) {
      document.getElementById("terminal").requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          breadcrumbItem="Terminal"
          purpose={`serial: ${serial}${
            label.length ? `, label: ${label}` : ""
          }`}
        ></Breadcrumbs>
        <Card>
          <CardBody>
            {connected ? (
              <React.Fragment>
                <h4 className="inline" style={{ color: COLORS.green }}>
                  Connected
                </h4>
                <i
                  className={`${ICONS.fullscreenIcon} fa-lg fullscreen-icon`}
                  title="full screen"
                  onClick={handleFullscreen}
                ></i>
              </React.Fragment>
            ) : (
              <h4 className="inline">Connecting...</h4>
            )}
            <div
              id="terminal"
              style={{ width: "100%", height: terminalHeight }}
            ></div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Terminal;

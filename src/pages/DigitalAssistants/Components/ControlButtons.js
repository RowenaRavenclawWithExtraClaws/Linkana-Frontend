import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "reactstrap";

const ControlButtons = (props) => {
  const [playIcon, togglePlayIcon] = useState(true);

  const controls = [
    {
      text: "Listen",
      title: "listen to record",
      id: "pla1",
      clickHandler: () => {
        togglePlayIcon(!playIcon);
        playIcon ? props.playAudio() : props.pauseAudio();
      },
      getClassName: () =>
        playIcon ? "fas fa-play-circle" : "fas fa-pause-circle",
    },
    {
      text: "Send",
      title: "send record for AI testing",
      id: "sen1",
      clickHandler: () => {
        props.toggleSend();
        props.sendRecord();
      },
      getClassName: () => "fas fa-paper-plane",
    },
    {
      text: "Save",
      title: "download record",
      clickHandler: props.toggleDownload,
      getClassName: () => "fas fa-file-download",
    },
  ];

  return (
    <Row>
      {controls.map((control, key) => (
        <Col key={`col_${key}`} xl={4} sm={12}>
          <div className="align-center">
            <button
              type="button"
              title={control.title}
              id={control.id}
              className="btn btn-outline-primary font-size-15 cursor-pointer"
              onClick={control.clickHandler}
            >
              <i className={control.getClassName()}></i> {control.text}
            </button>
          </div>
        </Col>
      ))}
    </Row>
  );
};

ControlButtons.propTypes = {
  playAudio: PropTypes.func,
  pauseAudio: PropTypes.func,
  toggleSend: PropTypes.func,
  sendRecord: PropTypes.func,
  toggleDownload: PropTypes.func,
};

export default ControlButtons;

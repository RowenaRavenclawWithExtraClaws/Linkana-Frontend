import React from "react";
import PropTypes from "prop-types";
import Timer from "react-compound-timer";
import ICONS from "../../../components/Common/icons";
import { RecordIndicator, RecordIndicatorAlt } from "./recordIndicator";

const Microphone = (props) => {
  return (
    <div className="ai-mic">
      <i
        className={`${ICONS.mic} fa-5x`}
        id="mic1"
        title={props.micPlay ? "stop recording" : "start recording"}
        onClick={props.micPlay ? props.stopRecording : props.startRecording}
      ></i>
      {props.micPlay ? (
        <RecordIndicator></RecordIndicator>
      ) : (
        <RecordIndicatorAlt></RecordIndicatorAlt>
      )}
      {props.micPlay ? (
        <div
          className="font-size-15"
          style={{
            marginTop: 5,
          }}
        >
          <Timer>
            <Timer.Minutes />
            {" : "}
            <Timer.Seconds />
          </Timer>
        </div>
      ) : null}
    </div>
  );
};

Microphone.propTypes = {
  micPlay: PropTypes.bool,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
};

export default Microphone;

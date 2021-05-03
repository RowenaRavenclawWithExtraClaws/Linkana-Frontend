import React from "react";
import PropTypes from "prop-types";
import MonacoEditor from "uiw-react-monacoeditor-v2";

const ShellEditor = (props) => {
  return (
    <MonacoEditor
      language="shell"
      defaultValue={props.code}
      value={props.code}
      height={props.fullScreen ? "100%" : 100}
      options={{
        theme: "vs-dark",
        minimap: {
          enabled: false,
        },
        automaticLayout: true,
      }}
      onChange={(newCode) => props.setCode(newCode)}
    />
  );
};

ShellEditor.propTypes = {
  code: PropTypes.string,
  fullScreen: PropTypes.bool,
  setCode: PropTypes.func,
};

export default ShellEditor;

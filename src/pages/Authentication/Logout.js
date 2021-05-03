import React, { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    props.logoutUser(props.history);
  });

  return <></>;
};

export default Logout;

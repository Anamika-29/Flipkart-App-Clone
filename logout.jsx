import React, { useEffect } from "react";
import authSys from "./services/authSys";
import { withRouter } from "react-router-dom";

const Logout = ({history}) => {

  useEffect(() => {
    authSys.logout();
    history.push("/");
  }, [history]);

  return null;
};

export default withRouter(Logout);

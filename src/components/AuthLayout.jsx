import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authState = useSelector((state) => state.auth.status);

  useEffect(() => {
    // one way ony by checking the store - auth status
    // if (authState === true) {
    //   navigate("/");
    // } else if (authState === false) {
    //   navigate("/login");
    // }

    if (authentication && authState !== authentication) {
      navigate("/login");
    } else if (!authentication && authState !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authState, navigate, authentication]);

  return loader ? <h1>Loading.....</h1> : <>{children}</>;
}

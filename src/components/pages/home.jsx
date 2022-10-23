import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "../../atom";

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      setLogin(true);
    }
  });

  return <div style={{ height: "92vh" }}>난 홈</div>;
};

export default Home;

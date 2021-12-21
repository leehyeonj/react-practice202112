import React from "react";
import { cookieState } from "../state/state";
import { useRecoilState } from "recoil";

const Cookie = () => {
  const [cookies, setCookies] = useRecoilState(cookieState);

  return <div>cookie</div>;
};

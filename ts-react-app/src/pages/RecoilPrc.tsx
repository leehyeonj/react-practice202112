import React, { useCallback } from "react";
import {
  useRecoilState,
  selector,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import { numberLabelState, numberState } from "../state/state";

const RecoilPrc = () => {
  // const [number, setNumber] = useRecoilState(numberState);
  const setNumber = useSetRecoilState(numberState);
  const numberLable = useRecoilValue(numberLabelState);
  const handleClick = useCallback(() => {
    setNumber((number) => number + 1);
  }, [setNumber]);

  return (
    <div>
      <h2>This is recoil</h2>
      <div>{numberLable}</div>
      <button onClick={handleClick}>+</button>
    </div>
  );
};

export default RecoilPrc;

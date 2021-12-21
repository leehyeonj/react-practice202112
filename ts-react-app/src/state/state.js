import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const cookieState = atom({
  key: "cookieState",
  default: [],
});

export const numberState = atom({
  key: "numberState",
  default: 10,
});
export const numberLabelState = selector({
  key: "numberLabelState",
  get: ({ get }) => {
    const number = get(numberState);
    return `${number} 입니다`;
  },
});

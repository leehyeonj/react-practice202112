/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const spinCircle = keyframes`
from {
    transform:translate(-50%, -50%) rotate(0);
}
to {
    transform:translate(-50%, -50%) rotate(360deg);
}
`;

const loadingBox_circle = css`
  border: 10px solid red;
  border-radius: 100px;
  width: 100px;
  height: 100px;
  border-top: 10px solid green;
  animation: ${spinCircle} 0.8s linear infinite;
  margin: 0 auto;
  margin-top: 100px;
`;

const Emotion = () => {
  return (
    <div>
      <div css={loadingBox_circle}></div>
    </div>
  );
};

export default Emotion;

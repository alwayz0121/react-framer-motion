import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

//특정 위치로 드래그 되었는지 확인하기 : MotionValues를 이용해 애니메이션 값의 상태와 속도를 추적
//MotionValue 값은 재랜더링이 안 되도록 React.js에 속해있지 않다.

function App() {
  const x = useMotionValue(0);
  const updateScale = useTransform(x, [-700, 0, 700], [2, 1, 0.1]);
  const rotateZ = useTransform(x, [-700, 700], [-360, 360]);
  const gradient = useTransform(
    x,
    [-700, 0, 700],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  //실제 x값을 보고 싶다면,
  useEffect(() => {
    // x.onChange(() => console.log(x.get()));
    updateScale.onChange(() => console.log(x.get()));
  }, [x]);
  return (
    <Wrapper style={{ background: gradient }}>
      {/* <Box style={{ x: x, scale: updateScale }} drag="x" dragSnapToOrigin /> */}
      <Box style={{ x: x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

export default App;

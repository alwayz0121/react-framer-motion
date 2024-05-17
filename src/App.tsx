import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: #ffffff;
  height: 40px;
  width: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 50%;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    transition: {
      type: "tween",
    },
  },
};

function App() {
  const [boxClickId, setBoxClickId] = useState<null | number>(null);
  const [btnClicked, setBtnClicked] = useState(false);
  const toggledClicked = () => setBtnClicked((prev) => !prev);

  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((n) =>
          n === 1 || n === 4 ? (
            <Box
              variants={boxVariants}
              initial="normal"
              whileHover={"hover"}
              onClick={() => setBoxClickId(n)}
              key={n}
              layoutId={n.toString()}
              transition={{ type: "tween" }}
            />
          ) : n === 2 ? (
            <Box key={n}>
              {!btnClicked ? <Circle layoutId="circle" /> : null}
            </Box>
          ) : (
            <Box key={n}>
              {btnClicked ? <Circle layoutId="circle" /> : null}
            </Box>
          )
        )}
      </Grid>

      <button onClick={toggledClicked}>Switch</button>

      <AnimatePresence>
        {boxClickId ? (
          <Overlay
            variants={overlay}
            onClick={() => setBoxClickId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={boxClickId.toString()}
              style={{ background: "rgba(255, 255, 255, 1)" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;

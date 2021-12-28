import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useState, useRef } from "react";
import "./styles.css";

const SlotMachine = () => {
  const [fruit1, setFruit1] = useState("🍒");
  const [fruit2, setFruit2] = useState("🍒");
  const [fruit3, setFruit3] = useState("🍒");
  const [rolling, setRolling] = useState(false);

  const [isWin, setIsWin] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null)];
  const fruits = [
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
    "🍒",
    "🍉",
    "🍊",
    "🍓",
    "🍇",
    "🥝",
  ];

  // to trigger roolling and maintain state
  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 3000);

    // looping through all 3 slots to start rolling
    slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      console.log(i);
      const selected = triggerSlotRotation(slot.current);
      console.log(selected);
      if (i === 0) setFruit1(selected);
      else if (i === 1) setFruit2(selected);
      else setFruit3(selected);
    });
    console.log(fruit1, fruit2, fruit3);
    if ((fruit1 === fruit2) === fruit3) {
      setIsWin(true);
    }
  };

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    console.log("options", options);
    let randomOption = Math.floor(Math.random() * fruits.length);
    console.log("random", randomOption);
    let choosenOption = options[randomOption];
    console.log("chooseoptions", choosenOption);
    console.log(choosenOption.offsetTop);
    setTop(-choosenOption.offsetTop + 0.01);
    return fruits[randomOption];
  };

  return (
    <div className="SlotMachine">
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[0]}>
            {fruits.map((fruit, i) => (
              <div key={i}>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[1]}>
            {fruits.map((fruit, i) => (
              <div key={i}>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[2]}>
            {fruits.map((fruit, i) => (
              <div key={i}>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={() => {
          if (!rolling) {
            roll();
          }
        }}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "ROLL"}
      </div>
    </div>
  );
};

export default SlotMachine;

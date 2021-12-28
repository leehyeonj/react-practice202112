import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useState, useRef } from "react";
import "./styles.css";

const SlotMachine = () => {
  const [fruit1, setFruit1] = useState("🍒");
  const [fruit2, setFruit2] = useState("🍒");
  const [fruit3, setFruit3] = useState("🍒");
  const [rolling, setRolling] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null)];
  const fruits = ["🍒", "🍉", "🍊", "🍓", "🍇", "🥝"];

  // to trigger roolling and maintain state
  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 2000);

    // looping through all 3 slots to start rolling
    slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = triggerSlotRotation(slot.current);
      if (i + 1 == 1) setFruit1(selected);
      else if (i + 1 == 2) setFruit2(selected);
      else setFruit3(selected);
    });
  };

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * fruits.length);
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
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
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[2]}>
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling && roll}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "ROLL"}
      </div>
    </div>
  );
};

export default SlotMachine;

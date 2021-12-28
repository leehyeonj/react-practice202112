import { Avatar } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

function RepeatButton(props) {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    ></button>
  );
}

function WinningSound() {
  return (
    <audio autoplay="autoplay" className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>
  );
}

const SlotMachine = () => {
  return (
    <div>
      <Avatar>H</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    </div>
  );
};

export default SlotMachine;

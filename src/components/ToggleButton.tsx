import "../App.css";
import arrowIcon from "../../public/asset/icon-arrow-down.svg";

interface ToggleButtonProps {
  onShowMore: () => void;
  showMore: boolean;
}

export const ToggleButton = ({ onShowMore, showMore }: ToggleButtonProps) => {
  return (
    <button
      onClick={() => onShowMore()}
      type="button"
      className="expendMore_button-container"
    >
      <span>{showMore ? "less" : "more"}</span>
      <span tabIndex={-1}>
        <img
          style={{
            transform: showMore ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
          src={arrowIcon}
          alt="Click to expend more info"
        ></img>
      </span>
    </button>
  );
};

import "./Avatar.scss";
import avatar from "../../assets/images/avatar-transparent.svg";
import colorById from "../../util/colorNames";

const Avatar = ({ colorId }) => {
  return (
    <img
      src={avatar}
      alt=""
      className="avatar"
      style={{ backgroundColor: colorById(colorId) }}
    />
  );
};

export default Avatar;

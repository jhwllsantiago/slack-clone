import "./Avatar.scss";
import solid from "../../assets/images/avatar-default.png";
import transp from "../../assets/images/avatar-transparent.png";

const Avatar = ({ transparent, color }) => {
  return (
    <img
      src={transparent ? transp : solid}
      alt=""
      className="avatar"
      style={{ backgroundColor: color }}
    />
  );
};

export default Avatar;

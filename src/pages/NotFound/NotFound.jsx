import "./NotFound.scss";
import logo from "../../assets/images/Slack_RGB.svg";
import { useNavigate } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <nav>
        <img src={logo} alt="" className="logo" onClick={() => navigate("/")} />
        <p onClick={() => navigate("/signin")}>Sign In</p>
      </nav>
      <div className="glitch">
        <div>
          <IoWarningOutline className="icon" />
          <h2>There's been a glitch...</h2>
        </div>
        <p>
          We're not quite sure what went wrong. You can go back, or try looking
          on our Help Center if you need a hand.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

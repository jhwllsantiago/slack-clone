import { Navigate, useNavigate } from "react-router-dom";
import "./Home.scss";
import logo from "../../assets/images/slack-logo.gif";
import getHeaders from "../../util/getHeaders";

const Home = () => {
  const navigate = useNavigate();
  const signedIn = localStorage.getItem("signedIn");
  const { accessToken, client, expiry, uid } = getHeaders();
  const checker = signedIn && accessToken && client && expiry && uid;

  if (checker) return <Navigate to={"/client"} replace />;
  return (
    <div className="home">
      <div className="main">
        <img src={logo} alt="" />
        <button onClick={() => navigate("/signin")}>SIGN IN</button>
        <p>OR</p>
        <button onClick={() => navigate("/signup")}>SIGN UP</button>
      </div>
    </div>
  );
};

export default Home;

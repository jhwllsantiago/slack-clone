import "./Header.scss";
import avatar from "../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");
    localStorage.removeItem("signed_in");
    navigate("/signin");
  };

  return (
    <div className="header">
      <div className="main">
        <img src={avatar} alt="" onClick={() => setShowModal(true)} />
      </div>
      {showModal && (
        <>
          <div
            className="backdrop"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modal">
            <img src={avatar} alt="" />
            <hr />
            <div className="signed-in">
              <p>Signed in as</p>
              <p className="uid">{uid}</p>
            </div>
            <hr />
            <p className="sign-out" onClick={handleLogout}>
              Sign out of Avion School
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;

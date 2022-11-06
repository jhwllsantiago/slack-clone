import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import assignName from "../../util/assignName";

const Header = () => {
  const uid = localStorage.getItem("uid");
  const signedIn = localStorage.getItem("signedIn");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("expiry");
    localStorage.removeItem("uid");
    localStorage.removeItem("signedIn");
    navigate("/signin");
  };

  return (
    <div className="header">
      <div className="main">
        <div onClick={() => setShowModal(true)}>
          <Avatar colorId={signedIn} />
        </div>
      </div>
      {showModal && (
        <>
          <div className="backdrop" onClick={() => setShowModal(false)}></div>
          <div className="modal">
            <div className="name-and-pic">
              <Avatar colorId={signedIn} />
              <span>{assignName({ email: uid, signedIn })}</span>
            </div>
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

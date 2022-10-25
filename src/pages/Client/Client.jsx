import { useState } from "react";
import { Navigate } from "react-router-dom";
import useGET from "../../hooks/useGET";
import Body from "../../components/Body/Body";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Client.scss";
import loadingGif from "../../assets/images/circles.gif";
import getHeaders from "../../util/getHeaders";

const Client = () => {
  const { data: users, isLoading, error } = useGET("users");
  const signed_in = localStorage.getItem("signed_in");
  const initial = localStorage.getItem(`${signed_in}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signed_in}-contacts`))
    : [];
  const { accessToken, client, expiry, uid } = getHeaders();
  const checker = signed_in && accessToken && client && expiry && uid;
  const [contacts, setContacts] = useState(initial);

  if (!checker) return <Navigate to={"/signin"} replace />;
  return (
    <div className="client">
      {isLoading && <img src={loadingGif} alt="" className="client-loading" />}
      {!isLoading && !error && (
        <div className="main">
          <Header />
          <Sidebar
            users={users}
            contacts={contacts}
            setContacts={setContacts}
          />
          <Body users={users} contacts={contacts} setContacts={setContacts} />
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Client;

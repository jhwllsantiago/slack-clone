import { useState } from "react";
import { Navigate } from "react-router-dom";
import Body from "../../components/Body/Body";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Client.scss";
import loadingGif from "../../assets/images/circle.gif";
import getHeaders from "../../util/getHeaders";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/get";

const Client = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const signed_in = localStorage.getItem("signed_in");
  const initial = localStorage.getItem(`${signed_in}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signed_in}-contacts`))
    : [];
  const [contacts, setContacts] = useState(initial);
  const { accessToken, client, expiry, uid } = getHeaders();

  if (!(signed_in && accessToken && client && expiry && uid)) {
    return <Navigate to={"/signin"} replace />;
  }
  return (
    <div className="client">
      {isLoading && <img src={loadingGif} alt="" className="client-loading" />}
      {!isLoading && !error && (
        <div className="main">
          <Header />
          <Sidebar users={data} contacts={contacts} setContacts={setContacts} />
          <Body users={data} contacts={contacts} setContacts={setContacts} />
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Client;

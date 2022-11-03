import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Body from "../../components/Body/Body";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Client.scss";
import loadingGif from "../../assets/images/circle.gif";
import getHeaders from "../../util/getHeaders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChannelList, getUsers } from "../../api/get";

const Client = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["channels"],
      queryFn: getChannelList,
    }); // eslint-disable-next-line
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  const signedIn = localStorage.getItem("signedIn");
  const initial = localStorage.getItem(`${signedIn}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signedIn}-contacts`))
    : [];
  const [contacts, setContacts] = useState(initial);
  const { "access-token": accessToken, client, expiry, uid } = getHeaders();

  if (!(signedIn && accessToken && client && expiry && uid)) {
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
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default Client;

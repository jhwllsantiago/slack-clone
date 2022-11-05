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
import randomColor from "../../util/randomColor";
import NotFound from "../NotFound/NotFound";

const Client = () => {
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onSuccess: (users) => {
      const mapped = users?.map((user) => {
        return { ...user, bg: randomColor(200) };
      });
      queryClient.setQueryData(["users"], mapped);
    },
  });
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["channels"],
      queryFn: getChannelList,
    }); // eslint-disable-next-line
  }, []);
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
      {status === "loading" && (
        <img src={loadingGif} alt="" className="loading" />
      )}
      {status === "error" && <NotFound />}
      {status === "success" && (
        <div className="main">
          <Header />
          <Sidebar users={data} contacts={contacts} setContacts={setContacts} />
          <Body users={data} contacts={contacts} setContacts={setContacts} />
        </div>
      )}
    </div>
  );
};

export default Client;

import { NavLink } from "react-router-dom";
import "./ChannelList.scss";
import loadingGif from "../../assets/images/circle.gif";
import { BiLockAlt } from "react-icons/bi";
import { getChannelDetails, getChannelList, getMessages } from "../../api/get";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import NotFound from "../../pages/NotFound/NotFound";

const ChannelList = () => {
  const { data, status } = useQuery({
    queryKey: ["channels"],
    queryFn: getChannelList,
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    if (data?.length > 0) {
      for (const channel of data) {
        queryClient.prefetchQuery({
          queryKey: [channel.id.toString(), "channel details"],
          queryFn: getChannelDetails,
        });
        queryClient.prefetchQuery({
          queryKey: [channel.id.toString(), "Channel"],
          queryFn: getMessages,
        });
      }
    } // eslint-disable-next-line
  }, [data]);

  if (status === "loading") {
    return <img src={loadingGif} alt="" className="loading" />;
  }
  if (status === "error") {
    return <NotFound />;
  }
  return (
    <div className="channel-list">
      <ul className="channels">
        {data?.map(({ id, name }) => {
          return (
            <NavLink
              to={`/client/message/c/${id}`}
              key={id}
              className="channel"
              style={({ isActive }) => ({
                backgroundColor: isActive && "rgba(18, 100, 163, 255)",
                color: isActive && "white",
              })}
            >
              <BiLockAlt /> <span>{name}</span>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelList;

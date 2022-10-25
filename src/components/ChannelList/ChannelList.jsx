import { NavLink } from "react-router-dom";
import useGET from "../../hooks/useGET";
import "./ChannelList.scss";
import loadingGif from "../../assets/images/circles.gif";
import { FaLock } from "react-icons/fa";

const ChannelList = () => {
  const { data: channels, isLoading, error } = useGET("channels");

  return (
    <div className="channel-list">
      {isLoading && <img src={loadingGif} alt="" className="loading" />}
      <ul className="channels">
        {!isLoading &&
          channels &&
          channels.map(({ id, name }) => {
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
                <FaLock /> <span>{name}</span>
              </NavLink>
            );
          })}
      </ul>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ChannelList;

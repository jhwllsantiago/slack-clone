import "./DirectMessages.scss";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const DirectMessages = ({ contacts }) => {
  return (
    <div className="direct-messages">
      <p>Direct messages</p>
      <ul className="dm-list">
        {contacts &&
          contacts.map(({ id, name }, idx) => {
            return (
              <NavLink
                key={idx}
                to={`/client/message/u/${id}`}
                className="dm"
                style={({ isActive }) => ({
                  backgroundColor: isActive && "rgba(18, 100, 163, 255)",
                  color: isActive && "white",
                })}
              >
                <Avatar colorId={id} />
                <span className="dm-detail">{name}</span>
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
};

export default DirectMessages;

import "./Sidebar.scss";
import { BiEdit } from "react-icons/bi";
import Channels from "../Channels/Channels";
import DirectMessages from "../DirectMessages/DirectMessages";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ users, contacts, setContacts }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="top">
        <p>Avion School</p>
        <i className="send-icon" onClick={() => navigate("/client")}>
          <BiEdit />
        </i>
      </div>
      <hr />
      <Channels users={users} contacts={contacts} />
      <DirectMessages contacts={contacts} setContacts={setContacts} />
    </div>
  );
};

export default Sidebar;

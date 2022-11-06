import "./Channels.scss";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ChannelList from "../ChannelList/ChannelList";
import NewChannel from "./NewChannel";

const Channels = ({ users }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="channels">
      <div className="main">
        <div className="header">
          <p>Channels</p>
          <AiOutlinePlus
            className="plus-icon"
            onClick={() => setShowModal(true)}
          />
        </div>
        <ChannelList />
        <div className="add-channels" onClick={() => setShowModal(true)}>
          <AiOutlinePlus className="plus-icon" />
          <p>Add channels</p>
        </div>
      </div>
      {showModal && (
        <div className="backdrop" onClick={() => setShowModal(false)}></div>
      )}
      {showModal && <NewChannel users={users} setShowModal={setShowModal} />}
    </div>
  );
};

export default Channels;

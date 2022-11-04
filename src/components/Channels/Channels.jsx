import "./Channels.scss";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import ChannelList from "../ChannelList/ChannelList";
import postCreateChannel from "../../api/postCreateChannel";
import { BiSearch } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";

const Channels = ({ contacts, users }) => {
  const signedIn = localStorage.getItem("signedIn");
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState("");
  const [members, setMembers] = useState([]);
  const [query, setQuery] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const [seed, setSeed] = useState(1);

  const handleUserClick = (user) => {
    setQuery("");
    setMembers([...members, user]);
  };

  const handleDelete = (idx) => {
    const updated = members.filter((_, index) => index !== idx);
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = members.length > 0 ? members.map((member) => member.id) : [];
    const newChannel = {
      name: channel,
      user_ids: ids,
    };
    const result = await postCreateChannel(newChannel);
    if (result.success) {
      setSeed(Math.random());
      setShowModal(false);
      setQuery("");
      setMembers([]);
      setChannel("");
    } else {
      setIsTaken(true);
    }
  };

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
        <ChannelList key={seed} />
      </div>
      {showModal && (
        <div
          className="backdrop"
          onClick={() => {
            setShowModal(false);
            setQuery("");
            setMembers([]);
            setChannel("");
            setIsTaken(false);
          }}
        ></div>
      )}
      {showModal && (
        <form className="modal" onSubmit={(e) => handleSubmit(e)}>
          <p>Create Channel</p>
          <hr />
          <div className="channel-name">
            <label>Channel Name</label>
            <div className="flex-container">
              <input
                autoFocus
                required
                type="text"
                placeholder="channel01"
                maxLength={15}
                minLength={3}
                spellCheck={false}
                value={channel}
                onChange={(e) => {
                  setIsTaken(false);
                  setChannel(e.target.value.replace(/[^a-zA-Z0-9]/g, ""));
                }}
              />
              {isTaken && (
                <div className="warning">
                  <MdErrorOutline />
                  <p>already taken</p>
                </div>
              )}
            </div>
          </div>
          <div className="members">
            <label>Members</label>
            <div className="add-member">
              <div className="search">
                <input
                  className="search-input"
                  type="text"
                  placeholder="name or email"
                  spellCheck={false}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <BiSearch className="search-icon" />
              </div>

              {users && query && (
                <ul className="users-list">
                  {contacts.concat(users).map((user, idx) => {
                    if (
                      user.id === parseInt(signedIn) ||
                      members.some((member) => member.id === user.id) ||
                      !(
                        user.email.startsWith(query) ||
                        (user.name && user.name.startsWith(query))
                      )
                    ) {
                      return null;
                    }

                    return (
                      <li key={idx} onClick={() => handleUserClick(user)}>
                        {user.name || user.email}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <ul className="members-list">
              {members.length > 0 &&
                members.map((member, idx) => {
                  return (
                    <li key={idx} className="member">
                      <Avatar transparent={true} color={member.bg} />
                      <span>{member.name || member.email}</span>
                      <AiOutlineClose
                        className="close"
                        onClick={() => handleDelete(idx)}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <button type="submit">Continue</button>
        </form>
      )}
    </div>
  );
};

export default Channels;

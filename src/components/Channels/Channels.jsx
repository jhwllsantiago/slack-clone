import "./Channels.scss";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import ChannelList from "../ChannelList/ChannelList";
import { BiSearch } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { useAddChannel } from "../../api/post";

const Channels = ({ contacts, users }) => {
  const signedIn = localStorage.getItem("signedIn");
  const [showModal, setShowModal] = useState(false);
  const [newChannel, setNewChannel] = useState("");
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const channelsMutation = useAddChannel(["channels"]);

  const handleUserClick = (user) => {
    setKeyword("");
    setMembers([...members, user]);
  };

  const handleDelete = (idx) => {
    const updated = members.filter((_, index) => index !== idx);
    setMembers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = members.length > 0 ? members.map((member) => member.id) : [];
    const payload = {
      name: newChannel,
      user_ids: ids,
    };
    const onSuccessFn = (data) => {
      if (data.data?.errors) setIsTaken(true);
    };
    channelsMutation.mutate({ payload, onSuccessFn });
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
        <ChannelList />
      </div>
      {showModal && (
        <div
          className="backdrop"
          onClick={() => {
            setShowModal(false);
            setKeyword("");
            setMembers([]);
            setNewChannel("");
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
                value={newChannel}
                onChange={(e) => {
                  setIsTaken(false);
                  setNewChannel(e.target.value.trimStart());
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
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <BiSearch className="search-icon" />
              </div>

              {users && keyword && (
                <ul className="users-list">
                  {contacts.concat(users).map((user, idx) => {
                    if (
                      user.id === parseInt(signedIn) ||
                      members.some((member) => member.id === user.id) ||
                      !(
                        user.email.startsWith(keyword) ||
                        (user.name && user.name.startsWith(keyword))
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

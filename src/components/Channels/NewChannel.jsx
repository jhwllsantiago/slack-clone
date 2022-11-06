import { BiSearch, BiLockAlt } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { AiOutlineClose } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { useAddChannel } from "../../api/post";
import { useNavigate } from "react-router-dom";

const NewChannel = ({ users, setShowModal }) => {
  const navigate = useNavigate();
  const signedIn = localStorage.getItem("signedIn");
  const [newChannel, setNewChannel] = useState("");
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const channelsMutation = useAddChannel(["channels"]);

  const handleChange = (e) => {
    setIsTaken(false);
    setNewChannel(e.target.value?.replace(/[^\w\s-]/g, "")?.trimStart());
  };
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
      if (data.data.errors) {
        setIsTaken(true);
      } else {
        setShowModal(false);
        navigate(`/client/message/c/${data.data.data.id}`);
      }
    };
    channelsMutation.mutate({ payload, onSuccessFn });
  };

  return (
    <form className="modal" onSubmit={(e) => handleSubmit(e)}>
      <p>Create a channel</p>
      <hr />
      <div className="channel-name">
        <label>Name</label>
        <div className="flex-container">
          <div className="input-container">
            <input
              autoFocus
              required
              type="text"
              placeholder="channel-name"
              maxLength={15}
              minLength={3}
              spellCheck={false}
              value={newChannel}
              onChange={(e) => handleChange(e)}
            />
            <BiLockAlt className="icon" />
          </div>
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
              placeholder="somebody@example.com"
              spellCheck={false}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <BiSearch className="search-icon" />
          </div>

          {keyword && (
            <ul className="users-list">
              {users.map((user) => {
                const { id, email } = user;

                if (
                  id === parseInt(signedIn) ||
                  members.some((member) => member.id === id)
                ) {
                  return null;
                }

                if (!email.toLowerCase().startsWith(keyword.toLowerCase())) {
                  return null;
                }

                return (
                  <li key={id} onClick={() => handleUserClick(user)}>
                    {email}
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
                  <Avatar colorId={member.id} />
                  <span>{member.name}</span>
                  <AiOutlineClose
                    className="close"
                    onClick={() => handleDelete(idx)}
                  />
                </li>
              );
            })}
        </ul>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor:
            newChannel.length > 2 && !isTaken
              ? "rgba(44, 181, 124, 255)"
              : "rgba(56, 55, 60, 255)",
          cursor: newChannel.length > 2 && !isTaken ? "pointer" : "default",
        }}
      >
        Create
      </button>
    </form>
  );
};

export default NewChannel;

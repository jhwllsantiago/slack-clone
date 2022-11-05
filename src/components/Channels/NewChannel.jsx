import { BiSearch } from "react-icons/bi";
import Avatar from "../Avatar/Avatar";
import { AiOutlineClose } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { useAddChannel } from "../../api/post";

const NewChannel = ({ users, contacts, setShowModal }) => {
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
      if (data.data?.errors) {
        setIsTaken(true);
      } else {
        setShowModal(false);
      }
    };
    channelsMutation.mutate({ payload, onSuccessFn });
  };

  return (
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
            onChange={(e) => handleChange(e)}
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
  );
};

export default NewChannel;

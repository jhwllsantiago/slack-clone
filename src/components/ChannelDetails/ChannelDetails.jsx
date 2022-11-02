import { useEffect, useState } from "react";
import "./ChannelDetails.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import postAddMember from "../../api/postAddMember";
import getDate from "../../util/getDate";
import avatar from "../../assets/images/avatar.png";

const ChannelDetails = ({
  details,
  setDetails,
  members,
  users,
  setShowModal,
}) => {
  const signedIn = parseInt(localStorage.getItem("signedIn"));
  const navigate = useNavigate();
  const [tab, setTab] = useState(2);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [newMember, setNewMember] = useState(null);

  const owner = members.find((member) => member.id === details.owner_id);

  useEffect(() => {
    if (tab === 2 && query !== "" && members) {
      const filtered = members.filter((member) =>
        member.email.startsWith(query)
      );
      setFiltered(filtered);
    } else if (tab === 3 && query !== "" && users) {
      const filtered = users.filter((user) => user.email.startsWith(query));
      setFiltered(filtered);
    }
  }, [query, tab, users, members]);

  const handleUserClick = (user) => {
    setNewMember(user);
    setQuery("");
  };

  const handleSubmit = async () => {
    if (newMember) {
      const body = {
        id: details.id,
        member_id: newMember.id,
      };
      const result = await postAddMember(body);
      if (result.success) {
        setQuery("");
        setNewMember(null);
        setShowModal(false);
        setDetails(result.data);
      } else {
        console.log("new member POST error");
      }
    }
  };

  return (
    <div className="channel-details">
      <p className="channel-name">
        <FaLock /> {details.name}
      </p>
      <p className="tabs">
        <span
          className={tab === 1 ? "about-tab active" : "about-tab"}
          onClick={() => {
            setQuery("");
            setTab(1);
          }}
        >
          About
        </span>
        <span
          className={tab === 2 ? "members-tab active" : "members-tab"}
          onClick={() => {
            setQuery("");
            setTab(2);
          }}
        >
          Members {members.length}
        </span>
        {signedIn === owner.id && (
          <span
            className={tab === 3 ? "add-tab active" : "add-tab"}
            onClick={() => {
              setQuery("");
              setTab(3);
            }}
          >
            Add Member
          </span>
        )}
      </p>
      <hr />

      {tab === 1 && (
        <div className="about">
          <div className="section">
            <h4>Topic</h4>
            <p>Never gonna give you up</p>
          </div>
          <hr />
          <div className="section">
            <h4>Description</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              soluta iure quos, eum explicabo dicta dolor accusamus? Aliquid
              repudiandae qui facilis delectus quibusdam sapiente!
            </p>
          </div>
          <hr />
          <div className="section">
            <h4>Created by</h4>
            <p
              className="owner"
              onClick={() => {
                if (signedIn !== owner.id)
                  navigate(`/client/message/u/${owner.id}`);
              }}
            >
              {owner.email} on {getDate(details.created_at)}
            </p>
          </div>
        </div>
      )}

      {(tab === 2 || tab === 3) && (
        <div className="query">
          <input
            className="query-input"
            type="text"
            spellCheck={false}
            placeholder={tab === 3 ? "Add member" : "Find members"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <BiSearch className="search-icon" />
        </div>
      )}

      {tab === 2 && (
        <ul className="members-list">
          {(query ? filtered : members).map((member, idx) => {
            const checker = member.id === signedIn;
            return (
              <li
                key={idx}
                className="member"
                onClick={() => {
                  if (!checker) navigate(`/client/message/u/${member.id}`);
                }}
              >
                {checker && <img src={avatar} alt="" className="avatar" />}
                {!checker && (
                  <div className="letter-img">
                    {(member.name || member.email)
                      .substring(0, 1)
                      .toUpperCase()}
                  </div>
                )}
                <span className="member-details">
                  {checker ? "You" : member.name || member.email}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {tab === 3 && newMember && (
        <div className="new-member">
          <div className="letter-img">
            {(newMember.name || newMember.email).substring(0, 1).toUpperCase()}
          </div>
          <p className="details">{newMember.email}</p>
          <AiOutlineClose
            className="delete-new"
            onClick={() => setNewMember(null)}
          />
        </div>
      )}
      {tab === 3 && query && (
        <ul className="users-list">
          {query &&
            filtered
              .filter((user) => {
                return !members.some((member) => {
                  return member.id === user.id;
                });
              })
              .map((user, idx) => {
                return (
                  <li
                    key={idx}
                    className="user"
                    onClick={() => handleUserClick(user)}
                  >
                    <span className="user-details">
                      {user.name || user.email}
                    </span>
                  </li>
                );
              })}
        </ul>
      )}
      {tab === 3 && (
        <button className="continue" onClick={handleSubmit}>
          Continue
        </button>
      )}
    </div>
  );
};

export default ChannelDetails;

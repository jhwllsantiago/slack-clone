import { useEffect, useState } from "react";
import "./ChannelDetails.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import getDate from "../../util/getDate";
import { useAddMember } from "../../api/post";
import Avatar from "../Avatar/Avatar";

const ChannelDetails = ({ details, members, users }) => {
  const signedIn = parseInt(localStorage.getItem("signedIn"));
  const navigate = useNavigate();
  const [tab, setTab] = useState(2);
  const [keyword, setKeyword] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [newMember, setNewMember] = useState(null);
  const detailsMutation = useAddMember([
    details.id.toString(),
    "channel details",
  ]);
  const owner = members.find((member) => member.id === details.owner_id);

  useEffect(() => {
    if (tab === 2 && keyword !== "" && members) {
      const filtered = members.filter((member) =>
        member.email.startsWith(keyword)
      );
      setFiltered(filtered);
    } else if (tab === 3 && keyword !== "" && users) {
      const filtered = users.filter((user) => user.email.startsWith(keyword));
      setFiltered(filtered);
    }
  }, [keyword, tab, users, members]);

  const handleUserClick = (user) => {
    setNewMember(user);
    setKeyword("");
  };

  const handleSubmit = async () => {
    if (newMember) {
      const payload = {
        id: details.id,
        member_id: newMember.id,
      };
      const onSuccessFn = (data) => {
        if (!data?.data?.errors) {
          setKeyword("");
          setNewMember(null);
          setTab(2);
        }
      };
      detailsMutation.mutate({ payload, onSuccessFn });
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
            setKeyword("");
            setTab(1);
          }}
        >
          About
        </span>
        <span
          className={tab === 2 ? "members-tab active" : "members-tab"}
          onClick={() => {
            setKeyword("");
            setTab(2);
          }}
        >
          Members {members.length}
        </span>
        {signedIn === owner.id && (
          <span
            className={tab === 3 ? "add-tab active" : "add-tab"}
            onClick={() => {
              setKeyword("");
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
        <div className="keyword">
          <input
            className="keyword-input"
            type="text"
            spellCheck={false}
            placeholder={tab === 3 ? "Add member" : "Find members"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <BiSearch className="search-icon" />
        </div>
      )}

      {tab === 2 && (
        <ul className="members-list">
          {(keyword ? filtered : members).map((member, idx) => {
            const checker = member.id === signedIn;
            return (
              <li
                key={idx}
                className="member"
                onClick={() => {
                  if (!checker) navigate(`/client/message/u/${member.id}`);
                }}
              >
                <Avatar transparent={!checker} color={member.bg} />
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
          <Avatar transparent={true} color={newMember.bg} />
          <p className="details">{newMember.email}</p>
          <AiOutlineClose
            className="delete-new"
            onClick={() => setNewMember(null)}
          />
        </div>
      )}
      {tab === 3 && keyword && (
        <ul className="users-list">
          {keyword &&
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

import { MdDriveFileRenameOutline, MdSave } from "react-icons/md";
import { useState } from "react";
import "./DirectMessages.scss";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

const DirectMessages = ({ contacts, setContacts }) => {
  const signedIn = localStorage.getItem("signedIn");
  const [newInfo, setNewInfo] = useState("");
  const [newInfoIdx, setNewInfoIdx] = useState(-1);

  const handleEdit = (idx, info) => {
    setNewInfoIdx(idx);
    setNewInfo(info);
  };
  const handleUpdate = (idx) => {
    const updatedDMs = contacts.map((contact, index) => {
      if (index === idx) {
        return { ...contact, name: newInfo };
      } else {
        return contact;
      }
    });
    setContacts(updatedDMs);
    setNewInfoIdx(-1);
    localStorage.setItem(`${signedIn}-contacts`, JSON.stringify(updatedDMs));
  };

  return (
    <div className="direct-messages">
      <p>Direct messages</p>
      <ul className="dm-list">
        {contacts &&
          contacts.map(({ name, email, id, bg }, idx) => {
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
                <Avatar transparent={true} color={bg} />
                {newInfoIdx === idx && (
                  <>
                    <input
                      className="dm-input"
                      autoFocus
                      type="text"
                      spellCheck="false"
                      value={newInfo}
                      maxLength={30}
                      onChange={(e) => setNewInfo(e.target.value)}
                      onBlur={() => handleUpdate(idx)}
                    />
                    <MdSave
                      className="icon save"
                      onClick={() => handleUpdate(idx)}
                    />
                  </>
                )}
                {newInfoIdx !== idx && (
                  <>
                    <span className="dm-detail">{name ? name : email}</span>
                    <MdDriveFileRenameOutline
                      className="icon rename"
                      onClick={() => handleEdit(idx, name ? name : email)}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
      </ul>
    </div>
  );
};

export default DirectMessages;

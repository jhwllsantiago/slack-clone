import { useState } from "react";
import "./NewMessage.scss";
import { AiOutlineClose } from "react-icons/ai";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import postMessage from "../../api/postMessage";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";

const NewMessage = ({ users, contacts, setContacts }) => {
  const signed_in = localStorage.getItem("signed_in");
  const [query, setQuery] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");
  const [seed, setSeed] = useState(1);

  const handleUserClick = (user) => {
    if (user.email) {
      setQuery("");
      setReceiver(user);
    }
  };

  const handleSendClick = async () => {
    if (receiver && message) {
      const body = {
        receiver_id: receiver.id,
        receiver_class: "User",
        body: message,
      };
      const result = await postMessage(body);
      if (result.success) {
        setMessage("");
        saveContacts(receiver.email, receiver.id);

        const checker = contacts.some(
          (contact) => contact.email === receiver.email
        );
        if (!checker) {
          setContacts([
            ...contacts,
            { name: null, email: receiver.email, id: receiver.id },
          ]);
        }
        setSeed(Math.random());
      }
    }
  };

  return (
    <div className="new-message">
      <div className="main">
        <p>New Message</p>
        <hr />
        <div className="search">
          <label>To:</label>
          {!receiver && (
            <input
              autoFocus
              type="text"
              placeholder="name@email.com"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value.replace(/ /g, ""))}
            />
          )}
          {receiver && (
            <div className="receiver">
              <span>{receiver.email}</span>
              <AiOutlineClose
                className="remove"
                onClick={() => setReceiver(null)}
              />
            </div>
          )}
        </div>
      </div>
      {receiver && (
        <DisplayMessages key={seed} id={receiver.id} type={"User"} />
      )}
      {users && query && (
        <ul className="users-list">
          {users.map((user) => {
            if (user.id.toString() === signed_in) return null;
            if (!user.email.startsWith(query)) return null;
            return (
              <li key={user.id} onClick={() => handleUserClick(user)}>
                {user.email}
              </li>
            );
          })}
        </ul>
      )}
      {users && (
        <MessagePane
          message={message}
          setMessage={setMessage}
          placeholder={
            receiver ? `Message ${receiver.email}` : "Start a new message"
          }
          onClick={handleSendClick}
        />
      )}
    </div>
  );
};

export default NewMessage;

import { useEffect, useState } from "react";
import "./NewMessage.scss";
import { AiOutlineClose } from "react-icons/ai";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";
import { useSendMessage } from "../../api/post";

const NewMessage = ({ users, contacts, setContacts }) => {
  const signedIn = localStorage.getItem("signedIn");
  const [query, setQuery] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [message, setMessage] = useState("");
  const messagesMutation = useSendMessage([receiver?.id, "User"]);

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
      setMessage("");
      messagesMutation.mutate(body);
    }
  };

  useEffect(() => {
    if (messagesMutation.isSuccess && receiver) {
      const { email, id, bg } = receiver;
      saveContacts(email, id, bg);
      const unique = contacts.every((contact) => contact.email !== email);
      if (unique) {
        setContacts([...contacts, { name: null, email, id, bg }]);
      }
    } // eslint-disable-next-line
  }, [messagesMutation]);

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
      {receiver && <DisplayMessages id={receiver.id} type={"User"} />}
      {users && query && (
        <ul className="users-list">
          {users.map((user) => {
            if (user.id.toString() === signedIn) return null;
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

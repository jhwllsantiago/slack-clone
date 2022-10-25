import { useParams } from "react-router-dom";
import "./DirectChat.scss";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import postMessage from "../../fetch/postMessage";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";

const DirectChat = ({ users, contacts, setContacts }) => {
  const { id } = useParams();
  const contact = contacts.find((contact) => contact.id === parseInt(id));
  const [message, setMessage] = useState("");
  const [seed, setSeed] = useState(1);
  let user = undefined;

  if (!contact) {
    user = users.find((user) => user.id.toString() === id);
  }

  const handleSendClick = async () => {
    if (message) {
      const body = {
        receiver_id: id,
        receiver_class: "User",
        body: message,
      };
      const result = await postMessage(body);
      if (result.success) {
        setMessage("");
        setSeed(Math.random());

        if (user) {
          saveContacts(user.email, user.id);
          const checker = contacts.some(
            (contact) => contact.email === user.email
          );
          if (!checker) {
            setContacts([
              ...contacts,
              { name: null, email: user.email, id: user.id },
            ]);
          }
        }
      }
    }
  };

  return (
    <div className="direct-chat">
      {(contact || user) && (
        <div className="main">
          <div className="name-container">
            <div className="letter-img">
              {(contact ? contact.name || contact.email : user.email)
                .substring(0, 1)
                .toUpperCase()}
            </div>
            <p className="name">
              {contact ? contact.name || contact.email : user.email}
            </p>
          </div>
          <hr />
          <AiOutlineReload
            className="reload-icon"
            onClick={() => setSeed(Math.random())}
          />
        </div>
      )}
      {(contact || user) && (
        <DisplayMessages key={seed} id={id} type={"User"} />
      )}

      <MessagePane
        message={message}
        setMessage={setMessage}
        placeholder={`Message ${
          contact ? contact.name || contact.email : user.email
        }`}
        onClick={handleSendClick}
      />
    </div>
  );
};

export default DirectChat;

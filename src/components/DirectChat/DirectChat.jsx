import { useParams } from "react-router-dom";
import "./DirectChat.scss";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import { useState } from "react";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";
import Avatar from "../Avatar/Avatar";
import { useSendMessage } from "../../api/post";
import { useEffect } from "react";

const DirectChat = ({ users, contacts, setContacts }) => {
  const { id } = useParams();
  const contact = contacts.find((contact) => contact.id === parseInt(id));
  const user = users.find((user) => user.id === parseInt(id));
  const [message, setMessage] = useState("");
  const messagesMutation = useSendMessage([id, "User"]);

  const handleSendClick = async () => {
    if (message) {
      const body = {
        receiver_id: id,
        receiver_class: "User",
        body: message,
      };
      setMessage("");
      messagesMutation.mutate(body);
    }
  };

  useEffect(() => {
    if (messagesMutation.isSuccess && user) {
      const { email, id, bg } = user;
      saveContacts(email, id, bg);
      const unique = contacts.every((contact) => contact.email !== email);
      if (unique) {
        setContacts([...contacts, { name: null, email, id, bg }]);
      }
    } // eslint-disable-next-line
  }, [messagesMutation]);

  return (
    <div className="direct-chat">
      {(contact || user) && (
        <div className="main">
          <div className="name-container">
            <Avatar transparent={true} color={(contact || user)?.bg} />
            <p className="name">
              {contact ? contact.name || contact.email : user.email}
            </p>
          </div>
          <hr />
        </div>
      )}
      {(contact || user) && <DisplayMessages id={id} type={"User"} />}

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

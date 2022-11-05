import { useParams } from "react-router-dom";
import "./DirectChat.scss";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import { useState } from "react";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";
import Avatar from "../Avatar/Avatar";
import { useSendMessage } from "../../api/post";

const DirectChat = ({ users, contacts, setContacts }) => {
  const { id } = useParams();
  const contact = contacts.find((contact) => contact.id === parseInt(id));
  const user = users.find((user) => user.id === parseInt(id));
  const [message, setMessage] = useState("");
  const messagesMutation = useSendMessage([id, "User"]);

  const handleSendClick = () => {
    if (message) {
      const payload = {
        receiver_id: id,
        receiver_class: "User",
        body: message,
      };
      const onSuccessFn = () => {
        setMessage("");
        const { email, id, bg } = user;
        const unique = contacts.every((contact) => contact.email !== email);
        if (unique) {
          saveContacts(user);
          setContacts([...contacts, { name: null, email, id, bg }]);
        }
      };
      messagesMutation.mutate({ payload, onSuccessFn });
    }
  };

  return (
    <div className="direct-chat">
      {(contact || user) && (
        <div className="main">
          <div className="name-container">
            <Avatar transparent={true} color={contact?.bg ?? user?.bg} />
            <p className="name">{contact?.name || user?.email}</p>
          </div>
          <hr />
        </div>
      )}
      {(contact || user) && <DisplayMessages id={id} type={"User"} />}

      <MessagePane
        message={message}
        setMessage={setMessage}
        placeholder={`Message ${contact?.name || user?.email}`}
        onClick={handleSendClick}
      />
    </div>
  );
};

export default DirectChat;

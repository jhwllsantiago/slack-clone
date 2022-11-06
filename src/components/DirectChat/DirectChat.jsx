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
        const { id, name } = user;
        const unique = contacts.every((contact) => contact.id !== id);
        if (unique) {
          saveContacts(id, name);
          setContacts([...contacts, { id, name }]);
        }
      };
      messagesMutation.mutate({ payload, onSuccessFn });
    }
  };

  return (
    <div className="direct-chat">
      {user && (
        <div className="main">
          <div className="name-container">
            <Avatar colorId={user.id} />
            <p className="name">{user.name}</p>
          </div>
          <hr />
        </div>
      )}
      {user && <DisplayMessages id={id} type={"User"} />}

      <MessagePane
        message={message}
        setMessage={setMessage}
        placeholder={`Message ${user.name}`}
        onClick={handleSendClick}
      />
    </div>
  );
};

export default DirectChat;

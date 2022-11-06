import { useState } from "react";
import "./NewMessage.scss";
import { AiOutlineClose } from "react-icons/ai";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import saveContacts from "../../util/saveContacts";
import MessagePane from "../MessagePane/MessagePane";
import { useSendMessage } from "../../api/post";
import { useQueryClient } from "@tanstack/react-query";
import { FaLock } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";

const NewMessage = ({ users, contacts, setContacts }) => {
  const queryClient = useQueryClient();
  const channels = queryClient.getQueryData(["channels"]);
  const signedIn = localStorage.getItem("signedIn");
  const [keyword, setKeyword] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [receiverClass, setReceiverClass] = useState(null);
  const [message, setMessage] = useState("");
  const messagesMutation = useSendMessage([
    receiver?.id.toString(),
    receiverClass,
  ]);

  const handleClick = (item) => {
    if (item.email ?? item.name) {
      setKeyword("");
      setReceiver(item);
    }
  };

  const handleSendClick = () => {
    if (receiver && receiverClass && message) {
      const payload = {
        receiver_id: receiver.id,
        receiver_class: receiverClass,
        body: message,
      };
      const onSuccessFn = () => {
        setMessage("");
        if (receiverClass === "User") {
          const { id, name } = receiver;
          const unique = contacts.every((contact) => contact.id !== id);
          if (unique) {
            saveContacts(id, name);
            setContacts([...contacts, { id, name }]);
          }
        }
      };
      messagesMutation.mutate({ payload, onSuccessFn });
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
              placeholder="#a-channel, or somebody@example.com"
              spellCheck={false}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value?.trimStart())}
            />
          )}
          {receiver && (
            <div className="receiver">
              {receiverClass === "Channel" && <FaLock />}{" "}
              {receiverClass === "User" && <Avatar colorId={receiver.id} />}
              <span>{receiver.email ?? receiver.name}</span>
              <AiOutlineClose
                className="remove"
                onClick={() => setReceiver(null)}
              />
            </div>
          )}
        </div>
      </div>
      {receiver && (
        <DisplayMessages id={receiver.id.toString()} type={receiverClass} />
      )}
      {keyword && (
        <ul className="results-list">
          {(keyword.startsWith("#") ? channels : users)?.map((item) => {
            const isChannel = keyword.startsWith("#");
            if (!isChannel && item.id.toString() === signedIn) {
              return null;
            }
            if (!isChannel && !item.email.startsWith(keyword)) {
              return null;
            }
            if (isChannel && !item.name.startsWith(keyword.slice(1))) {
              return null;
            }
            return (
              <li
                key={item.id}
                onClick={() => {
                  setReceiverClass(isChannel ? "Channel" : "User");
                  handleClick(item);
                }}
              >
                {isChannel && <FaLock />}
                {isChannel ? item.name : item.email}
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
            receiver
              ? `Message ${receiver.email ?? receiver.name}`
              : "Start a new message"
          }
          onClick={handleSendClick}
        />
      )}
    </div>
  );
};

export default NewMessage;

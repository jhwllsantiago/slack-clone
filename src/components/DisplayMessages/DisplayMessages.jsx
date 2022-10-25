import useGET from "../../hooks/useGET";
import loadingGif from "../../assets/images/circles.gif";
import "./DisplayMessages.scss";
import avatar from "../../assets/images/avatar.png";
import { useEffect, useRef } from "react";
import getTime from "../../util/getTime";
import getDate from "../../util/getDate";

const DisplayMessages = ({ id, type }) => {
  const signed_in = localStorage.getItem("signed_in");
  const contacts = localStorage.getItem(`${signed_in}-contacts`)
    ? JSON.parse(localStorage.getItem(`${signed_in}-contacts`))
    : [];
  const bottomRef = useRef();
  const {
    data: messages,
    isLoading,
    error,
  } = useGET(`messages?receiver_id=${id}&receiver_class=${type}`);

  useEffect(() => {
    if (!isLoading) bottomRef.current?.scrollIntoView();
  }, [isLoading, messages]);

  return (
    <div className="display-messages">
      {isLoading && <img src={loadingGif} alt="" className="loading" />}
      {!isLoading && messages && (
        <ul className="message-list">
          {messages
            .filter((item) => item.sender.id !== item.receiver.id)
            .map((item) => {
              const checker = item.sender.email === localStorage.getItem("uid");
              const contact = contacts.find(
                (contact) => contact.id === item.sender.id
              );
              return (
                <li key={item.id} className="message-item">
                  {checker && <img src={avatar} alt="" className="avatar" />}
                  {!checker && (
                    <div className="letter-img">
                      {(contact
                        ? contact.name || contact.email
                        : item.sender.email
                      )
                        .substring(0, 1)
                        .toUpperCase()}
                    </div>
                  )}
                  <p className="message-details">
                    <span className="name">
                      {checker
                        ? "You"
                        : contact
                        ? contact.name || contact.email
                        : item.sender.email}
                    </span>
                    <span className="time"> {getTime(item.created_at)}</span>
                    <span className="date"> {getDate(item.created_at)}</span>
                  </p>
                  <p className="message">{item.body}</p>
                </li>
              );
            })}
          <div ref={bottomRef} />
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default DisplayMessages;

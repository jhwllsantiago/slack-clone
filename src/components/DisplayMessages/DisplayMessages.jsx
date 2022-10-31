import useGET from "../../hooks/useGET";
import loadingGif from "../../assets/images/circles.gif";
import "./DisplayMessages.scss";
import avatar from "../../assets/images/avatar.png";
import { useEffect, useRef } from "react";
import getTime from "../../util/getTime";
import getDate from "../../util/getDate";

const DisplayMessages = ({ id, type }) => {
  const signed_in = parseInt(localStorage.getItem("signed_in"));
  const contacts = JSON.parse(localStorage.getItem(`${signed_in}-contacts`));
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
      {!isLoading && (
        <ul className="message-list">
          {messages?.reduce((nodes, message, idx) => {
            const { body, created_at, id, sender } = message;
            const dateExists = nodes.some((node) => {
              return (
                node.props?.children[0].props?.children === getDate(created_at)
              );
            });
            const checker = sender.id === signed_in;
            const contact = contacts?.find(
              (contact) => contact.id === sender.id
            );

            const newNode = (
              <li key={id} className="message-item">
                {checker && <img src={avatar} alt="" className="avatar" />}
                {!checker && (
                  <div className="letter-img">
                    {(contact?.name ?? sender.email)
                      .substring(0, 1)
                      .toUpperCase()}
                  </div>
                )}
                <p className="message-details">
                  <span className="name">
                    {checker ? "You" : contact?.name ?? sender.email}
                  </span>
                  <span className="time"> {getTime(created_at)}</span>
                </p>
                <p className="message">{body}</p>
              </li>
            );

            if (dateExists) {
              return [...nodes, newNode];
            }

            return [
              ...nodes,
              <li className="date" key={idx}>
                <span>{getDate(created_at)}</span>
                <hr />
              </li>,
              newNode,
            ];
          }, [])}
          <div ref={bottomRef} />
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default DisplayMessages;

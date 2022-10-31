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
  const { data, isLoading, error } = useGET(
    `messages?receiver_id=${id}&receiver_class=${type}`
  );

  useEffect(() => {
    if (!isLoading) bottomRef.current?.scrollIntoView();
  }, [isLoading, data]);

  return (
    <div className="display-messages">
      {isLoading && <img src={loadingGif} alt="" className="loading" />}
      {!isLoading && (
        <ul className="message-list">
          {data?.map(({ body, created_at, id, sender }, idx, messages) => {
            const isDateExisting =
              getDate(messages[idx - 1]?.created_at) === getDate(created_at);
            const isSameSender =
              messages[idx - 1]?.sender.email === sender.email;
            const checker = sender.id === signed_in;
            const contact = contacts?.find(
              (contact) => contact.id === sender.id
            );

            if (isSameSender && isDateExisting) {
              return (
                <li key={id} className="message-body-only">
                  <span>{getTime(created_at).slice(0, 5)}</span>
                  <p>{body}</p>
                </li>
              );
            }

            const newChat = (
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
                  <span className="time">{getTime(created_at)}</span>
                </p>
                <p className="message">{body}</p>
              </li>
            );

            if (isDateExisting) {
              return newChat;
            } else {
              return (
                <>
                  <p className="date" key={idx}>
                    <span>{getDate(created_at)}</span>
                    <hr />
                  </p>
                  {newChat}
                </>
              );
            }
          })}
          <div ref={bottomRef} />
        </ul>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default DisplayMessages;

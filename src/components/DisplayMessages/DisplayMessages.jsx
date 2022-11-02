import loadingGif from "../../assets/images/circles.gif";
import "./DisplayMessages.scss";
import { useEffect, useRef, Fragment } from "react";
import getDate from "../../util/getDate";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../api/get";
import FullMessage from "./FullMessage";
import PartialMessage from "./PartialMessage";

const DisplayMessages = ({ id, type }) => {
  const bottomRef = useRef();
  const { data, error, status } = useQuery({
    queryKey: [id, type],
    queryFn: getMessages,
  });

  useEffect(() => {
    if (status === "success") bottomRef.current?.scrollIntoView();
  }, [status, data]);

  if (status === "loading") {
    return <img src={loadingGif} alt="" className="loading" />;
  }
  if (status === "error") {
    return <div className="error-message">{error.message}</div>;
  }
  return (
    <div className="display-messages">
      <ul className="message-list">
        {data?.map((message, idx, messages) => {
          const { created_at, id, sender } = message;
          const sameDate =
            getDate(messages[idx - 1]?.created_at) === getDate(created_at);
          const sameSender = messages[idx - 1]?.sender.email === sender.email;

          if (sameSender && sameDate) {
            return <PartialMessage key={id} data={message} />;
          }
          if (sameDate) {
            return <FullMessage key={id} data={message} />;
          }
          return (
            <Fragment key={id}>
              <p className="date">
                <span>{getDate(created_at)}</span>
              </p>
              <hr className="date-hr" />
              <FullMessage data={message} />
            </Fragment>
          );
        })}
        <div ref={bottomRef} />
      </ul>
    </div>
  );
};

export default DisplayMessages;

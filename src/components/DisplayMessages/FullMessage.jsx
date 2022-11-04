import { useQueryClient } from "@tanstack/react-query";
import getTime from "../../util/getTime";
import Avatar from "../Avatar/Avatar";

const FullMessage = ({ data: { body, created_at, sender } }) => {
  const queryClient = useQueryClient();
  const color = queryClient
    .getQueryData(["users"])
    ?.find((user) => user.id === sender.id)?.bg;
  const signedIn = parseInt(localStorage.getItem("signedIn"));
  const contacts = JSON.parse(localStorage.getItem(`${signedIn}-contacts`));
  const contact = contacts?.find((contact) => contact.id === sender.id);
  const isSenderSignedIn = sender.id === signedIn;
  return (
    <li className="full-message">
      <Avatar transparent={!isSenderSignedIn} color={contact?.bg ?? color} />
      <p className="message-details">
        <span className="name">
          {isSenderSignedIn ? "You" : contact?.name ?? sender.email}
        </span>
        <span className="time">{getTime(created_at)}</span>
      </p>
      <p className="message-body">{body}</p>
    </li>
  );
};

export default FullMessage;

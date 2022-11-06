import { useQueryClient } from "@tanstack/react-query";
import getTime from "../../util/getTime";
import Avatar from "../Avatar/Avatar";

const FullMessage = ({ data: { body, created_at, sender } }) => {
  const queryClient = useQueryClient();
  const { name } = queryClient
    .getQueryData(["users"])
    ?.find((user) => user.id === sender.id);

  return (
    <li className="full-message">
      <Avatar colorId={sender.id} />
      <p className="message-details">
        <span className="name">{name}</span>
        <span className="time">{getTime(created_at)}</span>
      </p>
      <p className="message-body">{body}</p>
    </li>
  );
};

export default FullMessage;

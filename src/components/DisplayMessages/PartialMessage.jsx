import getTime from "../../util/getTime";

const PartialMessage = ({ data: { body, created_at } }) => {
  return (
    <li className="partial-message">
      <span>{getTime(created_at).slice(0, 5)}</span>
      <p>{body}</p>
    </li>
  );
};

export default PartialMessage;

import avatar from "../../assets/images/avatar.png";
import getTime from "../../util/getTime";

const FullMessage = ({ data: { body, created_at, sender } }) => {
  const signedIn = parseInt(localStorage.getItem("signedIn"));
  const contacts = JSON.parse(localStorage.getItem(`${signedIn}-contacts`));
  const contact = contacts?.find((contact) => contact.id === sender.id);
  const isSenderSignedIn = sender.id === signedIn;
  return (
    <li className="full-message">
      {isSenderSignedIn && <img src={avatar} alt="" className="avatar" />}
      {!isSenderSignedIn && (
        <div className="letter-avatar">
          {(contact?.name ?? sender.email).substring(0, 1).toUpperCase()}
        </div>
      )}
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

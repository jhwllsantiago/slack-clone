import "./MessagePane.scss";
import { IoMdSend } from "react-icons/io";
import {
  AiOutlineAudio,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineLink,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
  AiOutlineVideoCamera,
} from "react-icons/ai";

const MessagePane = ({ message, setMessage, placeholder, onClick }) => {
  return (
    <form
      className="message-pane"
      onSubmit={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <input
        className="message-input"
        type="text"
        placeholder={placeholder}
        spellCheck={false}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <span
        className="send-icon"
        style={message ? { backgroundColor: "#007a5a", cursor: "pointer" } : {}}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <IoMdSend />
      </span>
      <div className="top">
        <AiOutlineBold className="icon" />
        <AiOutlineItalic className="icon" />
        <AiOutlineStrikethrough className="icon" />
        <AiOutlineLink className="icon" />
        <AiOutlineOrderedList className="icon" />
        <AiOutlineUnorderedList className="icon" />
      </div>
      <div className="bottom">
        <AiOutlineVideoCamera className="icon" />
        <AiOutlineAudio className="icon" />
      </div>
    </form>
  );
};

export default MessagePane;

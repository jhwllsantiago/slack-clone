import { useParams } from "react-router-dom";
import "./ChannelChat.scss";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import { useEffect, useState } from "react";
import ChannelDetails from "../ChannelDetails/ChannelDetails";
import { FaLock } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import MessagePane from "../MessagePane/MessagePane";
import { useQuery } from "@tanstack/react-query";
import { getChannelDetails } from "../../api/get";
import loadingGif from "../../assets/images/circle.gif";
import { useSendMessage } from "../../api/post";

const ChannelChat = ({ users }) => {
  const { id } = useParams();
  const { data, error, status } = useQuery({
    queryKey: [id, "channel details"],
    queryFn: getChannelDetails,
  });
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const messagesMutation = useSendMessage([id, "Channel"]);

  useEffect(() => {
    if (users && data) {
      const ids = data.channel_members.map((member) => member.user_id);
      const list = users.filter((user) => {
        return ids.some((id) => user.id === id);
      });
      setMembers(list);
    }
  }, [users, data]);

  const handleSendClick = () => {
    if (message) {
      const payload = {
        receiver_id: parseInt(id),
        receiver_class: "Channel",
        body: message,
      };
      setMessage("");
      messagesMutation.mutate(payload);
    }
  };

  if (status === "loading") {
    return <img src={loadingGif} alt="" className="loading" />;
  }
  if (status === "error") {
    return <div className="error-message">{error.message}</div>;
  }
  return (
    <div className="channel-chat">
      <DisplayMessages id={id} type={"Channel"} />
      {showModal && (
        <div className="backdrop" onClick={() => setShowModal(false)}></div>
      )}
      {showModal && (
        <ChannelDetails
          details={data}
          members={members}
          users={users}
          setShowModal={setShowModal}
        />
      )}

      <div className="main">
        {/* {messagesMutation.isLoading && <h1>Sending...</h1>} */}
        <div className="name">
          <p className="p" onClick={() => setShowModal(true)}>
            <FaLock />
            <span>{data?.name}</span>
            <BiChevronDown />
          </p>
        </div>

        <div className="manage-channel" onClick={() => setShowModal(true)}>
          {members.slice(0, 3).map((member, idx) => {
            return (
              <div className={`member-${idx}`} key={idx}>
                {member.email.substring(0, 1).toUpperCase()}
              </div>
            );
          })}
          <div className="member-number">{members.length}</div>
        </div>

        <hr />
      </div>

      <MessagePane
        message={message}
        setMessage={setMessage}
        placeholder={`Message ${data?.name}`}
        onClick={handleSendClick}
      />
    </div>
  );
};

export default ChannelChat;

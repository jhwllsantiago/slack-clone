import { useParams } from "react-router-dom";
import "./ChannelChat.scss";
import DisplayMessages from "../DisplayMessages/DisplayMessages";
import { useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import postMessage from "../../api/postMessage";
import ChannelDetails from "../ChannelDetails/ChannelDetails";
import { FaLock } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import MessagePane from "../MessagePane/MessagePane";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChannelDetails } from "../../api/get";
import loadingGif from "../../assets/images/circles.gif";

const ChannelChat = ({ users }) => {
  const { id } = useParams();
  const { data, error, status } = useQuery({
    queryKey: [id, "channel details"],
    queryFn: getChannelDetails,
  });
  const [details, setDetails] = useState(null);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) setDetails(data);
  }, [data]);

  useEffect(() => {
    if (details && users && data) {
      const ids = details.channel_members.map((member) => member.user_id);
      const list = users.filter((user) => {
        return ids.some((id) => user.id === id);
      });
      setMembers(list);
    }
  }, [users, data, details]);

  const handleSendClick = async () => {
    if (message) {
      const body = {
        receiver_id: parseInt(id),
        receiver_class: "Channel",
        body: message,
      };
      const result = await postMessage(body);
      if (result.success) {
        setMessage("");
      }
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
          details={details}
          setDetails={setDetails}
          members={members}
          users={users}
          setShowModal={setShowModal}
        />
      )}

      <div className="main">
        <div className="name">
          <p className="p" onClick={() => setShowModal(true)}>
            <FaLock />
            <span>{details && details.name}</span>
            <BiChevronDown />
          </p>
        </div>
        <AiOutlineReload
          className="reload-icon"
          onClick={() => {
            queryClient.refetchQueries({
              queryKey: [id, "Channel"],
              exact: true,
            });
          }}
        />

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
        placeholder={`Message ${details?.name}`}
        onClick={handleSendClick}
      />
    </div>
  );
};

export default ChannelChat;

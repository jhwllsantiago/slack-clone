import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";
import ChannelChat from "../ChannelChat/ChannelChat";
import DirectChat from "../DirectChat/DirectChat";
import NewMessage from "../NewMessage/NewMessage";
import "./Body.scss";

const Body = ({ users, contacts, setContacts }) => {
  return (
    <div className="body">
      <Routes>
        <Route
          index
          element={
            <NewMessage
              users={users}
              contacts={contacts}
              setContacts={setContacts}
            />
          }
        />
        <Route
          path="message/u/:id"
          element={
            <DirectChat
              users={users}
              contacts={contacts}
              setContacts={setContacts}
            />
          }
        />
        <Route path="message/c/:id" element={<ChannelChat users={users} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Body;

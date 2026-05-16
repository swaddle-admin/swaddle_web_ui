import { Box } from "@mantine/core";
import { GRADIENTS, LAYOUT } from "../utils/constants";
import Navbar from "../components/layout/Navbar";
import MessageList from "../components/chat/MessageList";
import MessageInput from "../components/chat/MessageInput";

const ChatPage = () => (
  <Box
    style={{
      minHeight: LAYOUT.fullHeight,
      background: GRADIENTS.background,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Navbar />
    <MessageList />
    <MessageInput />
  </Box>
);

export default ChatPage;

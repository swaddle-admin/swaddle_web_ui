import { Box, Stack } from "@mantine/core";
import { GRADIENTS, SPACING, LAYOUT } from "../utils/constants";
import Navbar from "../components/layout/Navbar";
import EmptyState from "../components/chat/EmptyState";
import MessageInput from "../components/chat/MessageInput";

const ChatPage = () => {
  return (
    <Box
      style={{
        minHeight: LAYOUT.fullHeight,
        background: GRADIENTS.background,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Stack h={LAYOUT.fullHeight} justify="center" p={SPACING.pagePadding}>
        <EmptyState />
      </Stack>
      <MessageInput />
    </Box>
  );
};

export default ChatPage;

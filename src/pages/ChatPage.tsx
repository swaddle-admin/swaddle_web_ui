import { Box, Stack } from "@mantine/core";
import { GRADIENTS, SPACING, LAYOUT } from "../utils/constants";
import Navbar from "../components/layout/Navbar";

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
      <Stack
        h={LAYOUT.fullHeight}
        justify="space-between"
        p={SPACING.pagePadding}
      >
        <div>Chat area goes here</div>
        <div>Input goes here</div>
      </Stack>
    </Box>
  );
};

export default ChatPage;

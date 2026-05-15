import { Box, Stack } from "@mantine/core";

const ChatPage = () => {
  return (
    <Box
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #a8c0e8 0%, #9b8ec4 50%, #8b7bb8 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack h="100vh" justify="space-between" p="md">
        <div>Chat area goes here</div>
        <div>Input goes here</div>
      </Stack>
    </Box>
  );
};

export default ChatPage;

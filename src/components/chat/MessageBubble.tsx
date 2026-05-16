import { Box, Text } from "@mantine/core";
import { COLORS, BUBBLE } from "../../utils/constants";
import type { Message } from "../../types";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: BUBBLE.gap,
        width: "100%",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <Box
        style={{
          maxWidth: BUBBLE.maxWidth,
          backgroundColor: isUser ? COLORS.bubble.user : COLORS.bubble.ai,
          borderRadius: isUser ? BUBBLE.radiusUser : BUBBLE.radiusAi,
          padding: BUBBLE.padding,
        }}
      >
        <Text
          size={BUBBLE.fontSize}
          c={isUser ? COLORS.text.dark : COLORS.text.light}
        >
          {message.content}
        </Text>
      </Box>
    </Box>
  );
};

export default MessageBubble;

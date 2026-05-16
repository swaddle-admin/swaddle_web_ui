import { Box } from "@mantine/core";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";
import { LAYOUT } from "../../utils/constants";
import useAppSelector from "../../hooks/useAppSelector";

const MessageList = () => {
  const messages = useAppSelector((state) => state.chat.messages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isEmpty = messages.length === 0;

  return (
    <Box
      style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: LAYOUT.inputHeight,
        paddingTop: "16px",
      }}
    >
      {isEmpty && !isLoading ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </>
      )}
    </Box>
  );
};

export default MessageList;

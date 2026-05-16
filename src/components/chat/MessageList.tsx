import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";
import { LAYOUT } from "../../utils/constants";
import useAppSelector from "../../hooks/useAppSelector";

const MessageList = () => {
  const messages = useAppSelector((state) => state.chat.messages);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isEmpty = messages.length === 0;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <Box
      style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: LAYOUT.inputHeight,
        paddingTop: "16px",
        height: "100%",
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
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;

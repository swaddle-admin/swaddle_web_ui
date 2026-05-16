import { Group, Box } from "@mantine/core";
import useMessageInput from "../../hooks/useMessageInput";
import MessageAddButton from "./MessageAddButton";
import MessageInputField from "./MessageInputField";
import MessageSendButton from "./MessageSendButton";
import {
  containerStyle,
  dividerStyle,
  inputBarStyle,
} from "./MessageInput.styles";

const MessageInput = () => {
  const { value, setValue, handleSend, handleKeyDown } = useMessageInput();

  return (
    <Box style={containerStyle}>
      <Group align="center" gap={0} style={inputBarStyle}>
        <MessageAddButton />
        <Box style={dividerStyle} />
        <MessageInputField
          value={value}
          onChange={setValue}
          onKeyDown={handleKeyDown}
        />
        <MessageSendButton onClick={handleSend} />
      </Group>
    </Box>
  );
};

export default MessageInput;

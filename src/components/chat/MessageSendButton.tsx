import { ActionIcon } from "@mantine/core";
import { INPUT } from "../../utils/constants";

interface MessageSendButtonProps {
  onClick: () => void;
}

const MessageSendButton = ({ onClick }: MessageSendButtonProps) => (
  <ActionIcon
    variant="filled"
    color="violet"
    radius={INPUT.buttonRadius}
    size={INPUT.buttonSize}
    onClick={onClick}
  >
    {INPUT.sendLabel}
  </ActionIcon>
);

export default MessageSendButton;

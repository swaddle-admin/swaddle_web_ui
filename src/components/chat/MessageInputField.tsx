import { TextInput } from "@mantine/core";
import { INPUT } from "../../utils/constants";

interface MessageInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const MessageInputField = ({
  value,
  onChange,
  onKeyDown,
}: MessageInputFieldProps) => (
  <TextInput
    placeholder={INPUT.placeholder}
    variant="unstyled"
    style={{ flex: 1 }}
    value={value}
    onChange={(e) => onChange(e.currentTarget.value)}
    onKeyDown={onKeyDown}
  />
);

export default MessageInputField;

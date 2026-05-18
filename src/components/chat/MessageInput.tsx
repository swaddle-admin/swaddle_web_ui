import { Group, Box, TextInput, ActionIcon } from '@mantine/core'
import send from '../../assets/send-2.svg'
import useMessageInput from '../../hooks/useMessageInput'
import { containerStyle, inputBarStyle } from './MessageInput.styles'

const MessageInput = () => {
  const { value, setValue, handleSend, handleKeyDown } = useMessageInput()

  return (
    <Box style={containerStyle}>
      <Group align="center" gap={0} style={inputBarStyle}>
        <InputField
          value={value}
          onChange={setValue}
          onKeyDown={handleKeyDown}
        />
        <SendButton onClick={handleSend} />
      </Group>
    </Box>
  )
}

const InputField = ({
  value,
  onChange,
  onKeyDown,
}: {
  value: string
  onChange: (value: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
}) => (
  <TextInput
    placeholder="Talk to Swaddle"
    variant="unstyled"
    style={{ flex: 1 }}
    value={value}
    onChange={(e) => onChange(e.currentTarget.value)}
    onKeyDown={onKeyDown}
  />
)

const SendButton = ({ onClick }: { onClick: () => void }) => (
  <ActionIcon
    variant="filled"
    radius="24px"
    size="lg"
    onClick={onClick}
    style={{
      backgroundColor: '#ffffff',
      border: '1.5px solid rgba(0,0,0,0.15)',
    }}
  >
    <img
      src={send}
      width={18}
      height={18}
      alt="send"
      style={{
        filter: 'invert(55%) sepia(60%) saturate(400%) hue-rotate(170deg)',
      }}
    />
  </ActionIcon>
)

export default MessageInput

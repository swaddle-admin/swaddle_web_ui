import { Box, Text, Button, Group } from '@mantine/core'
import { motion } from 'framer-motion'
import type { Message } from '../../types'
import { createTask } from '../../utils/chatApi'
import useAppDispatch from '../../hooks/useAppDispatch'
import { setError } from '../../store/slices/chatSlice'

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
}

const MessageBubble = ({ message, isStreaming }: MessageBubbleProps) => {
  const isUser = message.role === 'user'
  const dispatch = useAppDispatch()
  const content = stripMeta(message.content)

  if (!content) return null

  return (
    <Box component={motion.div} {...bubbleAnimation} style={rowStyle(isUser)}>
      <Box style={isUser ? userBubbleStyle : aiBubbleStyle}>
        {message.contentType === 'action_buttons' ? (
          <ActionCard
            json={content}
            isStreaming={isStreaming}
            dispatchErr={(m: string) => dispatch(setError(m))}
          />
        ) : (
          <Text
            size="sm"
            c={isUser ? '#1a1a2e' : '#ffffff'}
            style={{
              lineHeight: 1.6,
              textAlign: 'left',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {content}
            {isStreaming && <motion.span {...cursorAnimation}>▋</motion.span>}
          </Text>
        )}
      </Box>
    </Box>
  )
}

const ActionCard = ({
  json,
  isStreaming,
  dispatchErr,
}: {
  json: string
  isStreaming?: boolean
  dispatchErr: (m: string) => void
}) => {
  let parsed: any = null
  try {
    parsed = JSON.parse(json)
  } catch {
    return (
      <Text size="sm" c="#ffffff">
        Invalid action payload
      </Text>
    )
  }

  const message = parsed?.response?.message ?? parsed?.message ?? ''

  const handleAddTask = async () => {
    try {
      const payload = {
        user_id: parsed?.user_id ?? 1,
        title: parsed?.response?.title ?? parsed?.title ?? 'Task',
        description: parsed?.response?.message ?? parsed?.message ?? '',
        start_at: parsed?.response?.start_time ?? parsed?.start_time ?? null,
        timezone:
          parsed?.response?.timezone ??
          Intl.DateTimeFormat().resolvedOptions().timeZone,
        frequency:
          parsed?.response?.task_frequency ?? parsed?.task_frequency ?? null,
        children: parsed?.response?.child_refs ?? parsed?.child_refs ?? [],
        location: parsed?.response?.location ?? parsed?.location ?? null,
      }

      await createTask(payload)
      dispatchErr('Task added')
    } catch (err) {
      dispatchErr((err as Error).message)
    }
  }

  return (
    <div>
      <Text size="sm" c="#ffffff" style={{ marginBottom: 8 }}>
        {message}
        {isStreaming && <motion.span {...cursorAnimation}>▋</motion.span>}
      </Text>
      <Group>
        <Button onClick={handleAddTask}>Add to My Schedule!</Button>
      </Group>
    </div>
  )
}

const stripMeta = (content: string) =>
  content.replace(/\[meta\].*?\[\/meta\]/gs, '').trim()

const bubbleAnimation = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] as const },
}

const cursorAnimation = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
}

const rowStyle = (isUser: boolean) => ({
  display: 'flex',
  justifyContent: isUser ? 'flex-end' : 'flex-start',
  marginBottom: '4px',
  width: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
})

const userBubbleStyle = {
  maxWidth: '72%',
  backgroundColor: '#ffffff',
  borderRadius: '20px 20px 4px 20px',
  padding: '10px 16px',
}

const aiBubbleStyle = {
  maxWidth: '72%',
  backgroundColor: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(12px)',
  borderRadius: '20px 20px 20px 4px',
  padding: '10px 16px',
  border: '1px solid rgba(255,255,255,0.15)',
}

export default MessageBubble

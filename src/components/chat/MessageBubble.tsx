import { Box, Text } from '@mantine/core'
import { motion } from 'framer-motion'
import type { Message } from '../../types'

interface MessageBubbleProps {
  message: Message
  isStreaming?: boolean
}

const MessageBubble = ({ message, isStreaming }: MessageBubbleProps) => {
  const isUser = message.role === 'user'
  const content = stripMeta(message.content)

  if (!content) return null

  return (
    <Box component={motion.div} {...bubbleAnimation} style={rowStyle(isUser)}>
      <Box style={isUser ? userBubbleStyle : aiBubbleStyle}>
        <Text
          size="sm"
          c={isUser ? '#1a1a2e' : '#ffffff'}
          style={{ lineHeight: 1.6, textAlign: 'left', wordWrap: 'break-word', overflowWrap: 'break-word' }}
        >
          {content}
          {isStreaming && <motion.span {...cursorAnimation}>▋</motion.span>}
        </Text>
      </Box>
    </Box>
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

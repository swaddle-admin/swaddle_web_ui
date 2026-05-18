import { Box } from '@mantine/core'
import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import EmptyState from './EmptyState'
import TypingIndicator from './TypingIndicator'
import useAppSelector from '../../hooks/useAppSelector'

const MessageList = () => {
  const messages = useAppSelector((state) => state.chat.messages)
  const isLoading = useAppSelector((state) => state.chat.isLoading)
  const isEmpty = messages.length === 0
  const lastMessage = messages[messages.length - 1]
  const isWaitingForFirstToken =
    isLoading && lastMessage?.role === 'assistant' && !lastMessage?.content
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <Box style={listStyle}>
      {isEmpty && !isLoading ? (
        <EmptyState />
      ) : (
        <>
          {messages.map((message, i) => (
            <MessageBubble
              key={message.id}
              message={message}
              isStreaming={
                isLoading &&
                i === messages.length - 1 &&
                message.role === 'assistant'
              }
            />
          ))}
          {isWaitingForFirstToken && <TypingIndicator />}
        </>
      )}
      <div ref={bottomRef} />
    </Box>
  )
}

const listStyle = {
  flex: 1,
  overflowY: 'auto' as const,
  paddingBottom: '100px',
  paddingTop: '16px',
  height: '100%',
}

export default MessageList

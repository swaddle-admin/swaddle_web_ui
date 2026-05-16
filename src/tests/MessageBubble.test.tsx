import { describe, it, expect } from 'vitest'
import { render, screen } from './testUtils'
import MessageBubble from '../components/chat/MessageBubble'
import type { Message } from '../types'

const userMessage: Message = {
  id: '1',
  role: 'user',
  content: 'Hello Swaddle',
  contentType: 'text',
  timestamp: new Date(),
}

const aiMessage: Message = {
  id: '2',
  role: 'assistant',
  content: 'Hi! How can I help?',
  contentType: 'text',
  timestamp: new Date(),
}

describe('MessageBubble', () => {
  it('should render user message content', () => {
    render(<MessageBubble message={userMessage} />)
    expect(screen.getByText('Hello Swaddle')).toBeInTheDocument()
  })

  it('should render assistant message content', () => {
    render(<MessageBubble message={aiMessage} />)
    expect(screen.getByText('Hi! How can I help?')).toBeInTheDocument()
  })
})

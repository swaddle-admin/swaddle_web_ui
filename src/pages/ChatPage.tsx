import { Box } from '@mantine/core'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import useAppSelector from '../hooks/useAppSelector'
import MessageList from '../components/chat/MessageList'
import MessageInput from '../components/chat/MessageInput'

const ChatPage = () => {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode)

  return (
    <motion.div
      animate={{ background: isDarkMode ? GRADIENTS.dark : GRADIENTS.light }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={containerStyle}
    >
      <Navbar />
      <Box style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        <MessageList />
      </Box>
      <MessageInput />
    </motion.div>
  )
}

const GRADIENTS = {
  dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  light: 'linear-gradient(135deg, #a8c0e8 0%, #9b8ec4 50%, #8b7bb8 100%)',
}

const containerStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  overflow: 'hidden',
}

export default ChatPage

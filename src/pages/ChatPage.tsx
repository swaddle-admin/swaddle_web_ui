import { Box, Input } from '@mantine/core'
import { motion } from 'framer-motion'
import { GRADIENTS, LAYOUT, ANIMATION } from '../utils/constants'
import Navbar from '../components/layout/Navbar'
import useAppSelector from '../hooks/useAppSelector'
import List from '../components/chat/message/List'

const ChatPage = () => {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode)

  return (
    <motion.div
      animate={{
        background: isDarkMode ? GRADIENTS.dark : GRADIENTS.light,
      }}
      transition={{
        duration: ANIMATION.duration.slow,
        ease: 'easeInOut',
      }}
      style={{
        height: LAYOUT.fullHeight,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Navbar />
      <Box style={{ flex: 1, overflow: 'hidden', padding: '0 16px' }}>
        <List />
      </Box>
      <Input />
    </motion.div>
  )
}

export default ChatPage

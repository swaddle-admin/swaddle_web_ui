import { Box } from '@mantine/core'
import { motion } from 'framer-motion'

const TypingIndicator = () => (
  <Box style={rowStyle}>
    <Box style={bubbleStyle}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
          style={dotStyle}
        />
      ))}
    </Box>
  </Box>
)

const dotVariants = {
  initial: { y: 0 },
  animate: { y: -6 },
}

const rowStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  paddingLeft: '20px',
  paddingRight: '20px',
  marginBottom: '4px',
}

const bubbleStyle = {
  backgroundColor: 'rgba(255,255,255,0.12)',
  backdropFilter: 'blur(12px)',
  borderRadius: '20px 20px 20px 4px',
  border: '1px solid rgba(255,255,255,0.15)',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}

const dotStyle = {
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'white',
}

export default TypingIndicator

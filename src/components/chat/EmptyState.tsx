import { Stack, Text } from '@mantine/core'
import { motion } from 'framer-motion'
import logoCircle from '../../assets/logo-circle.svg'
import { ANIMATIONS } from '../../utils/constants'

const EmptyState = () => (
  <Stack align="center" justify="center" h="100%" gap="md">
    <AnimatedLogo />
    <motion.div {...ANIMATIONS.textAnimation}>
      <TextContent />
    </motion.div>
  </Stack>
)

const MotionImg = motion.img as any

const AnimatedLogo = () => (
  <MotionImg
    src={logoCircle}
    alt="Swaddle"
    width={120}
    height={120}
    {...ANIMATIONS.logoAnimation}
  />
)

const TextContent = () => (
  <Stack align="center" gap="4px">
    <Text fw={700} size="xl" c="#ffffff">
      Start a conversation
    </Text>
    <Text size="sm" c="rgba(255,255,255,0.7)">
      Ask a question, share something or explore a topic.
    </Text>
  </Stack>
)

export default EmptyState

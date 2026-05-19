import { Alert, Group, ActionIcon } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import useAppSelector from '../../hooks/useAppSelector'
import useAppDispatch from '../../hooks/useAppDispatch'
import { setError } from '../../store/slices/chatSlice'

const ErrorNotification = () => {
  const error = useAppSelector((state) => state.chat.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  const getUserFriendlyMessage = (error: string) => {
    if (error.includes('network') || error.includes('fetch'))
      return 'Connection error. Please check your internet and try again.'
    if (error.includes('timeout'))
      return 'The request took too long. Please try again.'
    if (error.includes('401') || error.includes('unauthorized'))
      return 'Please log in again.'
    if (error.includes('500') || error.includes('server'))
      return 'Something went wrong on our end. Please try again later.'
    return 'Something went wrong. Please try again.'
  }

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 80,
            left: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <Alert
            color="red"
            title="Oops!"
            icon={null}
            style={{ borderRadius: '12px' }}
          >
            <Group justify="space-between" wrap="nowrap">
              <span>{getUserFriendlyMessage(error)}</span>
              <ActionIcon
                size="xs"
                color="red"
                variant="transparent"
                onClick={() => dispatch(setError(null))}
              >
                ✕
              </ActionIcon>
            </Group>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ErrorNotification

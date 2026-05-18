import { Box, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuth from '../hooks/useAuth'
import { pageStyle, cardStyle } from './AuthPages.styles'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import AuthTitle from './AuthTitle'
import AuthHeader from './AuthHeader'
import SubmitButton from './SubmitButton'
import Footer from './Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
}

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleSignUp = async () => {
    await signUp(email, password)
    if (!error) navigate('/chat')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value)

  return (
    <Box style={pageStyle}>
      <motion.div {...fadeInUp} style={{ width: '100%', maxWidth: '420px' }}>
        <AuthHeader />
        <Box style={cardStyle}>
          <Stack gap="md">
            <AuthTitle title="Sign Up" />
            <EmailInput value={email} onChange={handleEmailChange} />
            <PasswordInput value={password} onChange={handlePasswordChange} />
            {error && (
              <Text size="sm" c="red.3">
                {error}
              </Text>
            )}
            <SubmitButton
              isLoading={isLoading}
              onClick={handleSignUp}
              label="Sign Me Up"
            />
            <Footer
              text="Already part of the family?"
              linkText="Sign In"
              linkTo="/login"
            />
          </Stack>
        </Box>
      </motion.div>
    </Box>
  )
}

export default SignUpPage

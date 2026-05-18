import { Box, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuth from '../hooks/useAuth'
import { pageStyle, cardStyle } from '../components/auth/AuthPages.styles'
import AuthHeader from '../components/auth/AuthHeader'
import AuthTitle from '../components/auth/AuthTitle'
import PasswordInput from '../components/auth/PasswordInput'
import EmailInput from '../components/auth/EmailInput'
import SubmitButton from '../components/auth/SubmitButton'
import Footer from '../components/auth/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    await login(email, password)
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
          <Stack gap="lg">
            <AuthTitle title="Log In" />
            <EmailInput value={email} onChange={handleEmailChange} />
            <PasswordInput value={password} onChange={handlePasswordChange} />
            <Text size="sm" c="white" ta="right" style={{ cursor: 'pointer' }}>
              Forgot Password?
            </Text>
            {error && (
              <Text size="sm" c="red.3">
                {error}
              </Text>
            )}
            <SubmitButton
              isLoading={isLoading}
              onClick={handleLogin}
              label="Log In"
            />
            <Footer
              text="Don't have an account?"
              linkText="Sign Up"
              linkTo="/signup"
            />
          </Stack>
        </Box>
      </motion.div>
    </Box>
  )
}

export default LoginPage

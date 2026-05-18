import { Box, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'
import useAuth from '../hooks/useAuth'
import { pageStyle, cardStyle } from '../components/auth/AuthPages.styles'
import EmailInput from '../components/auth/EmailInput'
import PasswordInput from '../components/auth/PasswordInput'
import AuthTitle from '../components/auth/AuthTitle'
import AuthHeader from '../components/auth/AuthHeader'
import SubmitButton from '../components/auth/SubmitButton'
import Footer from '../components/auth/Footer'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25 },
}

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp, isLoading, error } = useAuth()
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/chat')
    }
  }, [loading, user, navigate])

  const handleSignUp = async () => {
    const success = await signUp(email, password)
    if (success) navigate('/chat')
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

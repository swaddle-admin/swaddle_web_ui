import { Stack } from '@mantine/core'
import logo from '../assets/logo.svg'

const AuthHeader = () => (
  <Stack align="center" mb="xl">
    <img src={logo} alt="Swaddle" width={140} />
  </Stack>
)

export default AuthHeader

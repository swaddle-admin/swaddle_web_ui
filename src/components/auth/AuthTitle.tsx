import { Text } from '@mantine/core'

type AuthTitleProps = {
  title: string
}

const AuthTitle = ({ title }: AuthTitleProps) => (
  <Text fw={700} size="xl" c="white" mb="sm">
    {title}
  </Text>
)

export default AuthTitle

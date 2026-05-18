import { Text, Anchor } from '@mantine/core'
import { Link } from 'react-router-dom'

interface FooterProps {
  text: string
  linkText: string
  linkTo: string
}

const Footer = ({ text, linkText, linkTo }: FooterProps) => (
  <Text size="sm" c="rgba(255,255,255,0.9)" ta="center">
    {text}{' '}
    <Anchor component={Link} to={linkTo} c="white" fw={700}>
      {linkText}
    </Anchor>
  </Text>
)

export default Footer

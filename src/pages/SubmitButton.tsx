import { Button } from '@mantine/core'
import { buttonStyle } from './AuthPages.styles'

interface SubmitButtonProps {
  isLoading: boolean
  onClick: () => void
  label?: string
}

const SubmitButton = ({
  isLoading,
  onClick,
  label = 'Submit',
}: SubmitButtonProps) => (
  <Button
    fullWidth
    style={buttonStyle}
    loading={isLoading}
    onClick={onClick}
    mt="sm"
  >
    {label}
  </Button>
)

export default SubmitButton

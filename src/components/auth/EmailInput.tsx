import PillInput from './PillInput'
import { EmailIcon } from './AuthIcons'

type EmailInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EmailInput = ({ value, onChange }: EmailInputProps) => (
  <PillInput
    placeholder="Enter email address"
    value={value}
    onChange={onChange}
    icon={<EmailIcon />}
  />
)

export default EmailInput

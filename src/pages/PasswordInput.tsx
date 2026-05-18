import PillInput from './PillInput'
import { KeyIcon } from './AuthIcons'

type PasswordInputProps = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => (
  <PillInput
    type="password"
    placeholder="Enter password"
    value={value}
    onChange={onChange}
    icon={<KeyIcon />}
  />
)

export default PasswordInput

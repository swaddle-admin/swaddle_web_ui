import { TextInput, PasswordInput } from '@mantine/core'
import {
  pillStyle,
  iconWrapperStyle,
  pillInnerInputStyle,
} from '../pages/AuthPages.styles'
import type { ReactNode } from 'react'

type PillInputProps = {
  type?: 'text' | 'password'
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon: ReactNode
}

const PillInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
}: PillInputProps) => {
  const leftSection = <div style={iconWrapperStyle}>{icon}</div>

  if (type === 'password') {
    return (
      <PasswordInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        styles={{
          input: pillStyle,
          innerInput: pillInnerInputStyle,
        }}
        leftSection={leftSection}
      />
    )
  }

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      styles={{
        input: {
          ...pillStyle,
          ...pillInnerInputStyle,
        },
      }}
      leftSection={leftSection}
    />
  )
}

export default PillInput

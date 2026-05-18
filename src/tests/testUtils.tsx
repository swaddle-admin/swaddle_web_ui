import { MantineProvider } from '@mantine/core'
import { render } from '@testing-library/react'
import { theme } from '../styles/theme'
import type { ReactNode } from 'react'

const AllProviders = ({ children }: { children: ReactNode }) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
)

const customRender = (ui: ReactNode) => render(ui, { wrapper: AllProviders })

export * from '@testing-library/react'
export { customRender as render }

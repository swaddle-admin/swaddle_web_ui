import { Group, Box } from '@mantine/core'
import NavbarLogo from './NavbarLogo'
import NavbarThemeToggle from './NavbarThemeToggle'

const Navbar = () => (
  <Box px="xl" pt="md">
    <Group justify="space-between" align="center" style={navbarStyle}>
      <NavbarLogo />
      <NavbarThemeToggle />
    </Group>
  </Box>
)

const navbarStyle = {
  height: '60px',
  backdropFilter: 'blur(10px)',
  borderBottom: '2px solid rgba(255,255,255,0.4)',
}

export default Navbar

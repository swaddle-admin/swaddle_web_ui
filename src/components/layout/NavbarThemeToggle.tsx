import { ActionIcon } from '@mantine/core'
import { useMantineColorScheme } from '@mantine/core'
import sunIcon from '../../assets/sun.svg'
import moonIcon from '../../assets/moon.svg'
import { toggleDarkMode } from '../../store/slices/uiSlice'
import useAppDispatch from '../../hooks/useAppDispatch'

const NavbarThemeToggle = () => {
  const dispatch = useAppDispatch()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDark = colorScheme === 'dark'

  const handleToggle = () => {
    toggleColorScheme()
    dispatch(toggleDarkMode())
  }

  return (
    <ActionIcon
      variant="subtle"
      radius="xl"
      size="xl"
      onClick={handleToggle}
      style={{ width: 44, height: 44 }}
    >
      <img src={isDark ? sunIcon : moonIcon} alt="Toggle theme" width={24} />
    </ActionIcon>
  )
}

export default NavbarThemeToggle

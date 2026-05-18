import { Group } from '@mantine/core'

import swaddleWordmark from '../../assets/swaddle-wordmark.svg'

const NavbarLogo = () => (
  <Group align="center" gap="xs">
    <img src={swaddleWordmark} alt="Swaddle" height={30} />
  </Group>
)

export default NavbarLogo

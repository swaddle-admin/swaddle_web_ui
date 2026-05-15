import { Group, ActionIcon } from "@mantine/core";
import { NAVBAR } from "../../utils/constants";
import sunIcon from "../../assets/sun.svg";
import moonIcon from "../../assets/moon.svg";

const NavbarThemeToggle = () => (
  <Group gap={NAVBAR.gap}>
    <ActionIcon variant="subtle" radius="xl" size={NAVBAR.actionIconSize}>
      <img src={sunIcon} alt="Light mode" width={NAVBAR.iconSize} />
    </ActionIcon>
    <ActionIcon
      variant="filled"
      radius="xl"
      size={NAVBAR.actionIconSize}
      color="white"
    >
      <img src={moonIcon} alt="Dark mode" width={NAVBAR.iconSize} />
    </ActionIcon>
  </Group>
);

export default NavbarThemeToggle;

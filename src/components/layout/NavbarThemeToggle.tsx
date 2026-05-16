import { Group, ActionIcon } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { NAVBAR } from "../../utils/constants";
import sunIcon from "../../assets/sun.svg";
import moonIcon from "../../assets/moon.svg";
import { toggleDarkMode } from "../../store/slices/uiSlice";
import useAppDispatch from "../../hooks/useAppDispatch";

const NavbarThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const handleToggle = () => {
    toggleColorScheme();
    dispatch(toggleDarkMode());
  };

  return (
    <Group gap={NAVBAR.gap}>
      <ActionIcon
        variant={isDark ? "subtle" : "filled"}
        radius="xl"
        size={NAVBAR.actionIconSize}
        onClick={handleToggle}
        color="white"
      >
        <img src={sunIcon} alt="Light mode" width={NAVBAR.iconSize} />
      </ActionIcon>
      <ActionIcon
        variant={isDark ? "filled" : "subtle"}
        radius="xl"
        size={NAVBAR.actionIconSize}
        onClick={handleToggle}
        color="white"
      >
        <img src={moonIcon} alt="Dark mode" width={NAVBAR.iconSize} />
      </ActionIcon>
    </Group>
  );
};

export default NavbarThemeToggle;

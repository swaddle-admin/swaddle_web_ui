import { Group, Box } from "@mantine/core";
import { LAYOUT, NAVBAR } from "../../utils/constants";
import NavbarLogo from "./NavbarLogo";
import NavbarThemeToggle from "./NavbarThemeToggle";

const Navbar = () => (
  <Box px="xl" pt="md">
    <Group
      justify="space-between"
      align="center"
      style={{
        height: LAYOUT.navbarHeight,
        backdropFilter: NAVBAR.backdropFilter,
        borderBottom: NAVBAR.borderBottom,
      }}
    >
      <NavbarLogo />
      <NavbarThemeToggle />
    </Group>
  </Box>
);

export default Navbar;

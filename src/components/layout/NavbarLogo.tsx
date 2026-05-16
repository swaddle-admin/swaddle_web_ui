import { Group } from "@mantine/core";
import { NAVBAR } from "../../utils/constants";
import swaddleWordmark from "../../assets/swaddle-wordmark.svg";

const NavbarLogo = () => (
  <Group align="center" gap={NAVBAR.gap}>
    <img src={swaddleWordmark} alt="Swaddle" height={NAVBAR.wordmarkHeight} />
  </Group>
);

export default NavbarLogo;

import { Stack, Text } from "@mantine/core";
import { COLORS, EMPTY_STATE } from "../../utils/constants";
import logoCircle from "../../assets/logo-circle.svg";

const EmptyState = () => (
  <Stack align="center" justify="center" h="100%" gap="md">
    <img
      src={logoCircle}
      alt="Swaddle"
      width={EMPTY_STATE.logoSize}
      height={EMPTY_STATE.logoSize}
    />
    <Stack align="center" gap={EMPTY_STATE.textGap}>
      <Text fw={700} size={EMPTY_STATE.titleSize} c={COLORS.text.light}>
        {EMPTY_STATE.title}
      </Text>
      <Text size={EMPTY_STATE.subtitleSize} c={COLORS.text.muted}>
        {EMPTY_STATE.subtitle}
      </Text>
    </Stack>
  </Stack>
);

export default EmptyState;

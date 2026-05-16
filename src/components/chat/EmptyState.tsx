import { Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { COLORS, EMPTY_STATE, ANIMATION } from "../../utils/constants";
import logoCircle from "../../assets/logo-circle.svg";

const EmptyState = () => (
  <Stack align="center" justify="center" h="100%" gap="md">
    <motion.img
      src={logoCircle}
      alt="Swaddle"
      width={EMPTY_STATE.logoSize}
      height={EMPTY_STATE.logoSize}
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.duration.normal, delay: 0.2 }}
    >
      <Stack align="center" gap={EMPTY_STATE.textGap}>
        <Text fw={700} size={EMPTY_STATE.titleSize} c={COLORS.text.light}>
          {EMPTY_STATE.title}
        </Text>
        <Text size={EMPTY_STATE.subtitleSize} c={COLORS.text.muted}>
          {EMPTY_STATE.subtitle}
        </Text>
      </Stack>
    </motion.div>
  </Stack>
);

export default EmptyState;

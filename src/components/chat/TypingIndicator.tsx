import { Box } from "@mantine/core";
import { motion } from "framer-motion";
import { COLORS, BUBBLE } from "../../utils/constants";

const dotVariants = {
  initial: { y: 0 },
  animate: { y: -6 },
};

const TypingIndicator = () => (
  <Box
    style={{
      display: "flex",
      justifyContent: "flex-start",
      paddingLeft: "16px",
      paddingRight: "16px",
      marginBottom: BUBBLE.gap,
    }}
  >
    <Box
      style={{
        backgroundColor: COLORS.bubble.ai,
        borderRadius: BUBBLE.radiusAi,
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.15,
          }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "white",
          }}
        />
      ))}
    </Box>
  </Box>
);

export default TypingIndicator;

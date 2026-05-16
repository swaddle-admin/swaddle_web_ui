export const GRADIENTS = {
  background: "linear-gradient(135deg, #a8c0e8 0%, #9b8ec4 50%, #8b7bb8 100%)",
};

export const COLORS = {
  primary: "#7950f2",
  primaryLight: "#9775fa",
  bubble: {
    ai: "#7950f2",
    user: "#ffffff",
  },
  text: {
    light: "#ffffff",
    dark: "#1a1a2e",
    muted: "rgba(255,255,255,0.7)",
  },
};

export const SPACING = {
  pagePadding: "md",
  bubbleRadius: "18px",
  inputRadius: "24px",
};

export const LAYOUT = {
  maxWidth: "768px",
  navbarHeight: "60px",
  inputHeight: "56px",
  fullHeight: "100vh",
};

export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4,
  },
  ease: {
    out: [0.0, 0.0, 0.2, 1],
    in: [0.4, 0.0, 1, 1],
  },
};

export const NAVBAR = {
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255,255,255,0.1)",
  borderBottom: "2px solid rgba(255,255,255,0.4)",
  paddingX: "xl",
  fontWeight: 700,
  fontSize: "lg",
  title: "🧸 Swaddle",
  logoHeight: 40,
  wordmarkHeight: 30,
  iconSize: 20,
  actionIconSize: "lg",
  gap: "xs",
};

export const EMPTY_STATE = {
  logoSize: 120,
  title: "Start a conversation",
  subtitle: "Ask a question, share something or explore a topic.",
  titleSize: "xl",
  subtitleSize: "sm",
  textGap: "4px",
};

export const INPUT = {
  borderRadius: "32px",
  padding: "8px 8px 8px 16px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
  iconSize: "lg",
  iconWidth: 24,
  buttonRadius: "24px",
  buttonSize: "lg",
  placeholder: "Talk to Swaddle",
  sendLabel: "Send",
};

export const BUBBLE = {
  maxWidth: "70%",
  padding: "12px 16px",
  gap: "8px",
  fontSize: "sm",
  radiusUser: "18px 18px 4px 18px",
  radiusAi: "18px 18px 18px 4px",
};

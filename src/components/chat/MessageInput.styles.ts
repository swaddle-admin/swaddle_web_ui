import { LAYOUT, INPUT } from "../../utils/constants";

export const containerStyle = {
  position: "fixed" as const,
  bottom: 0,
  left: 0,
  right: 0,
  padding: "16px",
  paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
  display: "flex",
  justifyContent: "center",
};

export const inputBarStyle = {
  width: "100%",
  maxWidth: LAYOUT.maxWidth,
  backgroundColor: "white",
  borderRadius: INPUT.borderRadius,
  padding: INPUT.padding,
  boxShadow: INPUT.boxShadow,
};

export const dividerStyle = {
  width: "1px",
  height: "24px",
  backgroundColor: "rgba(0,0,0,0.1)",
  margin: "0 8px",
};

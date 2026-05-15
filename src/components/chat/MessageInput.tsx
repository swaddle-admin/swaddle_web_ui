import { Group, TextInput, ActionIcon, Box } from "@mantine/core";
import { LAYOUT, INPUT } from "../../utils/constants";
import addSquare from "../../assets/add-square.svg";

const MessageInput = () => (
  <Box
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      padding: "16px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Group
      align="center"
      gap={0}
      style={{
        width: LAYOUT.maxWidth,
        backgroundColor: "white",
        borderRadius: INPUT.borderRadius,
        padding: INPUT.padding,
        boxShadow: INPUT.boxShadow,
      }}
    >
      <ActionIcon variant="subtle" size={INPUT.iconSize}>
        <img src={addSquare} alt="Add" width={INPUT.iconWidth} />
      </ActionIcon>

      <Box
        style={{
          width: "1px",
          height: "24px",
          backgroundColor: "rgba(0,0,0,0.1)",
          margin: "0 8px",
        }}
      />

      <TextInput
        placeholder={INPUT.placeholder}
        variant="unstyled"
        style={{ flex: 1 }}
      />

      <ActionIcon
        variant="filled"
        color="violet"
        radius={INPUT.buttonRadius}
        size={INPUT.buttonSize}
      >
        {INPUT.sendLabel}
      </ActionIcon>
    </Group>
  </Box>
);

export default MessageInput;

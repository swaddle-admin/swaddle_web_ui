import { ActionIcon } from "@mantine/core";
import { INPUT } from "../../utils/constants";
import addSquare from "../../assets/add-square.svg";

const MessageAddButton = () => (
  <ActionIcon variant="subtle" size={INPUT.iconSize}>
    <img src={addSquare} alt="Add" width={INPUT.iconWidth} />
  </ActionIcon>
);

export default MessageAddButton;

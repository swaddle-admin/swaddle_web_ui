import { useState } from "react";
import { addMessage } from "../store/slices/chatSlice";
import useAppDispatch from "./useAppDispatch";
import type { Message } from "../types";

const useMessageInput = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;

    const message: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: value.trim(),
      contentType: "text",
      timestamp: new Date(),
    };

    dispatch(addMessage(message));
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return { value, setValue, handleSend, handleKeyDown };
};

export default useMessageInput;

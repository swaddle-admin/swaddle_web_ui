import { AppShell } from "@mantine/core";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <AppShell>
      <AppShell.Main>
        <ChatPage />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;

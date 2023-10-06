import { GameProvider } from "./GameContext";
import Box from "./components/Box";

function App() {
  return (
    <GameProvider>
      <Box />
    </GameProvider>
  );
}

export default App;

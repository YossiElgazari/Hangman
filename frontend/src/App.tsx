import { SettingsProvider } from "./contexts/SettingsContext";
import GamePage from "./pages/GamePage";
import LandingPage from "./pages/LandingPage";
import { GameStateProvider } from "./contexts/GameStateContext";
import { useGameState } from "./hooks/useGameState";
import { useSettings } from "./hooks/useSettings";
import Navbar from "./components/Navbar";
import "./index.css";

// AppContent component that renders the main content of the application
const AppContent = () => {
  const { isGameStarted } = useGameState(); // Hook to get the game state
  const { settings } = useSettings(); // Hook to get the user settings

  return (
    <div
      className={`h-[100dvh] md-overflow-hidden bg-primary dark:bg-primary_dark ${
        settings.darkMode ? "dark" : "light"
      }`}
      data-testid="app-content"
    >
      <Navbar />
      <div className="h-[calc(100dvh-56px)]">
        {/* Navbar component: MenuSettings, VolumeOn/Off, SwitchLight/Dark */}
        {isGameStarted ? <GamePage /> : <LandingPage />}
        {/* isGameStarted: boolean, Conditional rendering based on game state */}
      </div>
    </div>
  );
};

// App component that sets up the context providers
const App = () => (
  <SettingsProvider>
    <GameStateProvider>
      <AppContent /> {/* Main content of the application */}
    </GameStateProvider>
  </SettingsProvider>
);

export default App;

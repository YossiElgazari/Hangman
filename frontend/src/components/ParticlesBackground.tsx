import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import { useSettings } from "../hooks/useSettings";
import { loadLinksPreset, options, optionsDark } from "./particlesConfig"; 

const ParticlesBackground = () => {
  const { settings } = useSettings();

  useEffect(() => {
    (async () => {
      // Clear any existing instances
      const existingInstance = tsParticles.domItem(0);
      if (existingInstance) {
        await existingInstance.destroy();
      }

      // Load the appropriate settings
      const selectedOptions = settings.darkMode ? optionsDark : options;
      await loadLinksPreset(tsParticles, selectedOptions);

      // Load the new settings
      await tsParticles.load({
        id: "tsparticles",
        options: selectedOptions,
      });
    })();
  }, [settings.darkMode]);

  return <div id="tsparticles" className="absolute inset-0 -z-1 transition-all duration-300" />;
};

export default ParticlesBackground;

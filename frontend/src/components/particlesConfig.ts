import type { Engine } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadExternalRepulseInteraction } from "@tsparticles/interaction-external-repulse";
import type { ISourceOptions } from "@tsparticles/engine";

// Configuration options for light mode particles
export const options: ISourceOptions = {
  background: {
    color: "#FFFFF9",
  },
  particles: {
    color: {
      value: "#000000",
    },
    number: {
      value: 100,
    },
    links: {
      distance: 150,
      enable: true,
      color: "#000000",
    },
    move: {
      enable: true,
    },
    size: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
};

// Configuration options for dark mode particles
export const optionsDark: ISourceOptions = {
  background: {
    color: "#1A1D1E",
  },
  particles: {
    color: {
      value: "#FFFFF9",
    },
    number: {
      value: 100,
    },
    links: {
      distance: 150,
      enable: true,
      color: "#FFFFF9",
    },
    move: {
      enable: true,
    },
    size: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
};

// Function to load the particles preset with specified options
export async function loadLinksPreset(engine: Engine, options: ISourceOptions, refresh = true): Promise<void> {
  await loadBasic(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);

  engine.addPreset("links", options, false);
  if (refresh) {
    await engine.refresh();
  }
}

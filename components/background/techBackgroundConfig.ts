export const TECH_BG = {
  color: [0, 240, 200] as const, // #00F0C8

  grid: {
    spacing: 70,
    dotRadius: 1.5,
    opacity: 0.12,
  },

  rings: {
    count: 3,
    countMobile: 1,
    maxRadius: 300,
    speed: 22, // px/sec
    spawnInterval: 3000, // ms
    strokeWidth: 1.5,
    maxOpacity: 0.25,
  },

  traces: {
    count: 6,
    lineOpacity: 0.08,
    pulseRadius: 3,
    pulseOpacity: 0.35,
    pulseSpeed: 40, // px/sec
    pulseSpawnInterval: 4000, // ms
  },

  particles: {
    count: 25,
    countMobile: 10,
    radius: 1.5,
    opacity: 0.15,
    speed: 0.2, // px/frame at 30fps
  },

  performance: {
    maxDpr: 2,
    targetFps: 30,
    targetFpsMobile: 20,
  },
};

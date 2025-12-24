import type { StorySeed } from "./schema";

export const ANTHROPIC_MODEL = "claude-3-5-sonnet-20240620";

export const SYSTEM_PROMPT =
  "You are an arcade sci-fi narrative generator. Output only valid JSON with no extra text.";

export function buildUserPrompt(seedHint: string) {
  return [
    "Create a concise JSON seed for a 1980s arcade space fantasy story.",
    "Required fields: crisis, dinoType, robotRole, moralAxis, shipName, sectorName, robotName.",
    "Allowed values:",
    "crisis: solar-storm | atmos-collapse | resource-plague | ice-drift",
    "dinoType: nebula-raptor | void-triceratops | quasar-brachio | ion-stegosaur",
    "robotRole: navigator | arbiter | defector | archivist",
    "moralAxis: ecology | technology | survival",
    "Extra constraints: include cosmic dinosaurs, climate crisis, AI robot, 5-10 minute pacing.",
    "Tone: 1980s-early 1990s arcade logbook; terse, punchy, slightly dramatic; avoid modern slang.",
    `Seed hint: ${seedHint}`,
  ].join("\n");
}

export function isValidSeed(seed: Partial<StorySeed>): seed is StorySeed {
  return Boolean(
    seed.crisis &&
      seed.dinoType &&
      seed.robotRole &&
      seed.moralAxis &&
      seed.shipName &&
      seed.sectorName &&
      seed.robotName
  );
}

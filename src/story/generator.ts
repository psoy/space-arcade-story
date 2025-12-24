import {
  ClimateCrisis,
  DinoType,
  RobotRole,
  MoralAxis,
  StorySeed,
  StoryData,
  StoryEnding,
  Score,
} from "./schema";
import { mulberry32, pickOne } from "./rng";
import { buildScenes } from "./templates";

const crises: ClimateCrisis[] = [
  "solar-storm",
  "atmos-collapse",
  "resource-plague",
  "ice-drift",
];

const dinoTypes: DinoType[] = [
  "nebula-raptor",
  "void-triceratops",
  "quasar-brachio",
  "ion-stegosaur",
];

const robotRoles: RobotRole[] = ["navigator", "arbiter", "defector", "archivist"];
const moralAxes: MoralAxis[] = ["ecology", "technology", "survival"];
const shipNames = ["Arcturus-7", "Nova Pike", "Helios Wake", "Orchid Drift"];
const sectorNames = ["Sable Rift", "Lyra Drift", "Vega Wound", "Saffron Expanse"];
const robotNames = ["ARX-9", "KIRA", "NOX", "ECHO-13"];

export function createStory(seedValue: number): StoryData {
  const rng = mulberry32(seedValue);
  const seed: StorySeed = {
    crisis: pickOne(crises, rng),
    dinoType: pickOne(dinoTypes, rng),
    robotRole: pickOne(robotRoles, rng),
    moralAxis: pickOne(moralAxes, rng),
    shipName: pickOne(shipNames, rng),
    sectorName: pickOne(sectorNames, rng),
    robotName: pickOne(robotNames, rng),
  };

  return {
    seed,
    scenes: buildScenes(seed, rng),
    score: { ecology: 0, technology: 0, survival: 0 },
  };
}

export function resolveEnding(score: Score, seed: StorySeed): StoryEnding {
  if (score.ecology <= 0 && seed.crisis === "atmos-collapse") {
    return {
      id: "climate-collapse",
      title: "ENDING // CLIMATE COLLAPSE",
      text: "The grid fails. Dinos vanish into cold orbit and the sector becomes a cautionary ghost. Your log becomes a warning beacon.",
    };
  }

  if (score.technology <= 0 && seed.robotRole === "defector") {
    return {
      id: "robot-rule",
      title: "ENDING // ROBOT RULE",
      text: "Your AI archives seize control, enforcing a perfect logic that freezes culture in place. The sector survives, but only as a museum.",
    };
  }

  const maxAxis = Math.max(score.ecology, score.technology, score.survival);

  if (maxAxis === score.ecology && score.ecology > 0) {
    return {
      id: "eco-revival",
      title: "ENDING // ECO REVIVAL",
      text: "You reboot the climate grid and restore the Dino biosphere. The sector blooms with neon life once more.",
    };
  }

  if (maxAxis === score.technology && score.technology > 0) {
    return {
      id: "ai-coexist",
      title: "ENDING // AI COEXIST",
      text: "AI and dinos co-author a new protocol. Machines learn reverence, and the living learn restraint.",
    };
  }

  if (maxAxis === score.survival && score.survival > 0) {
    return {
      id: "survival-first",
      title: "ENDING // SURVIVAL FIRST",
      text: "You save the crew and the log, but the sector fades. Survival wins today, and history weighs the cost.",
    };
  }

  if (seed.dinoType === "void-triceratops" || seed.crisis === "ice-drift") {
    return {
      id: "dino-seal",
      title: "ENDING // DINO SEAL",
      text: "The dinos enter stasis within cosmic seals. A promise is etched to awaken them when the stars cool.",
    };
  }

  return {
    id: "legend",
    title: "ENDING // LEGEND MODE",
    text: "The tale becomes an arcade myth, replayed by pilots across the rim. Your run inspires a thousand new missions.",
  };
}

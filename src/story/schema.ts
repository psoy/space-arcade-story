export type ClimateCrisis = "solar-storm" | "atmos-collapse" | "resource-plague" | "ice-drift";
export type DinoType = "nebula-raptor" | "void-triceratops" | "quasar-brachio" | "ion-stegosaur";
export type RobotRole = "navigator" | "arbiter" | "defector" | "archivist";
export type MoralAxis = "ecology" | "technology" | "survival";
export type EndingType =
  | "eco-revival"
  | "ai-coexist"
  | "survival-first"
  | "dino-seal"
  | "climate-collapse"
  | "robot-rule"
  | "legend";

export interface StorySeed {
  crisis: ClimateCrisis;
  dinoType: DinoType;
  robotRole: RobotRole;
  moralAxis: MoralAxis;
  shipName: string;
  sectorName: string;
  robotName: string;
}

export interface Score {
  ecology: number;
  technology: number;
  survival: number;
}

export interface Choice {
  id: string;
  text: string;
  effect: Partial<Score>;
}

export interface StoryScene {
  id: string;
  title: string;
  text: string;
  choices: Choice[];
}

export interface StoryEnding {
  id: EndingType;
  title: string;
  text: string;
}

export interface StoryData {
  seed: StorySeed;
  scenes: StoryScene[];
  score: Score;
}

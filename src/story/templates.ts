import type { StorySeed, StoryScene, Choice } from "./schema";

export function buildScenes(seed: StorySeed, rng: () => number): StoryScene[] {
  const introChoices: Choice[] = [
    {
      id: "scan-ecosystem",
      text: "Scan the ecosystem and stabilize it first.",
      effect: { ecology: 1 },
    },
    {
      id: "secure-fuel",
      text: "Secure fuel cells and reinforce the hull.",
      effect: { survival: 1 },
    },
  ];

  const midChoices: Choice[] = [
    {
      id: "ai-diplomacy",
      text: `Let ${seed.robotName} negotiate with the Dino Council.`,
      effect: { technology: 1 },
    },
    {
      id: "dino-alliance",
      text: "Form a pact with the elder dinos and share supplies.",
      effect: { ecology: 1 },
    },
  ];

  const finalChoices: Choice[] = [
    {
      id: "sacrifice-core",
      text: "Sacrifice the ship core to reboot the climate grid.",
      effect: { ecology: 1, survival: -1 },
    },
    {
      id: "escape-vector",
      text: "Punch a warp vector and save the crew.",
      effect: { survival: 1, technology: 1 },
    },
  ];

  const sectorFlavor = rng() > 0.5 ? "neon ash rings" : "pixel-crystal debris";

  return [
    {
      id: "act-1",
      title: "ACT I // LOST SIGNAL",
      text: `ARCADE LOG: The ${seed.shipName} slips into ${seed.sectorName}, where ${sectorFlavor} orbit a fading sun. A ${seed.dinoType} herd drifts in stasis as ${seed.crisis} threatens the colony.`,
      choices: introChoices,
    },
    {
      id: "act-2",
      title: "ACT II // DINO PARLEY",
      text: `${seed.robotName}, your ${seed.robotRole} AI, decodes the Dino Council. They blame the climate grid failures on off-world mining. Credit count low. Trust is thinner.`,
      choices: midChoices,
    },
    {
      id: "act-3",
      title: "ACT III // LAST VECTOR",
      text: `The climate grid is breaking. If it falls, the ${seed.dinoType} will perish and the sector will freeze. Your crew awaits the final call. INSERT COIN?`,
      choices: finalChoices,
    },
  ];
}

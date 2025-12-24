import { createStory } from "./generator";

export function createMockStory() {
  return createStory(Date.now());
}

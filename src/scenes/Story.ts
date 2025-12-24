import Phaser from "phaser";
import { createStory, resolveEnding } from "../story/generator";
import type { StoryData, StoryEnding, Choice } from "../story/schema";

export default class Story extends Phaser.Scene {
  private story!: StoryData;
  private sceneIndex = 0;
  private titleText?: Phaser.GameObjects.Text;
  private bodyText?: Phaser.GameObjects.Text;
  private choiceTexts: Phaser.GameObjects.Text[] = [];
  private ending?: StoryEnding;
  private creditText?: Phaser.GameObjects.Text;
  private scoreText?: Phaser.GameObjects.Text;

  constructor() {
    super("Story");
  }

  create() {
    this.story = createStory(Date.now());
    this.sceneIndex = 0;
    this.ending = undefined;
    this.renderScene();
  }

  private renderScene() {
    this.clearChoices();

    const { width, height } = this.scale;
    const padding = 16;

    if (!this.creditText) {
      this.creditText = this.add
        .text(padding, 6, "CREDIT 01", {
          fontFamily: "Courier New",
          fontSize: "9px",
          color: "#8fa3c9",
        })
        .setOrigin(0, 0);
    }

    if (!this.scoreText) {
      this.scoreText = this.add
        .text(width - padding, 6, "SCORE 000000", {
          fontFamily: "Courier New",
          fontSize: "9px",
          color: "#8fa3c9",
        })
        .setOrigin(1, 0);
    }

    if (!this.titleText) {
      this.titleText = this.add.text(padding, padding - 6, "", {
        fontFamily: "Courier New",
        fontSize: "12px",
        color: "#f2c94c",
      });
    }

    if (!this.bodyText) {
      this.bodyText = this.add.text(padding, padding + 12, "", {
        fontFamily: "Courier New",
        fontSize: "10px",
        color: "#e8f0ff",
        wordWrap: { width: width - padding * 2 },
        lineSpacing: 4,
      });
    }

    if (this.ending) {
      this.titleText.setText(this.ending.title);
      this.bodyText.setText(this.ending.text);
      this.renderEndingChoices(height - 36);
      return;
    }

    const scene = this.story.scenes[this.sceneIndex];
    this.titleText.setText(scene.title);
    this.bodyText.setText(scene.text);
    this.updateScore();

    const baseY = height - 48;
    scene.choices.forEach((choice, index) => {
      const choiceText = this.add
        .text(padding, baseY + index * 14, `${index + 1}. ${choice.text}`, {
          fontFamily: "Courier New",
          fontSize: "10px",
          color: "#8fa3c9",
        })
        .setInteractive({ useHandCursor: true });

      choiceText.on("pointerup", () => this.handleChoice(choice));
      this.choiceTexts.push(choiceText);
    });

    this.input.keyboard?.once("keydown-ONE", () => this.handleChoice(scene.choices[0]));
    this.input.keyboard?.once("keydown-TWO", () => this.handleChoice(scene.choices[1]));
  }

  private renderEndingChoices(startY: number) {
    const { width } = this.scale;
    const padding = 16;

    const restart = this.add
      .text(padding, startY, "R: RESTART", {
        fontFamily: "Courier New",
        fontSize: "10px",
        color: "#8fa3c9",
      })
      .setInteractive({ useHandCursor: true });

    const menu = this.add
      .text(width - 96, startY, "M: MENU", {
        fontFamily: "Courier New",
        fontSize: "10px",
        color: "#8fa3c9",
      })
      .setInteractive({ useHandCursor: true });

    restart.on("pointerup", () => this.scene.restart());
    menu.on("pointerup", () => this.scene.start("Menu"));

    this.input.keyboard?.once("keydown-R", () => this.scene.restart());
    this.input.keyboard?.once("keydown-M", () => this.scene.start("Menu"));

    this.choiceTexts.push(restart, menu);
  }

  private handleChoice(choice: Choice) {
    this.story.score.ecology += choice.effect.ecology ?? 0;
    this.story.score.technology += choice.effect.technology ?? 0;
    this.story.score.survival += choice.effect.survival ?? 0;

    this.sceneIndex += 1;
    this.updateScore();

    if (this.sceneIndex >= this.story.scenes.length) {
      this.ending = resolveEnding(this.story.score, this.story.seed);
      this.renderScene();
      return;
    }

    this.renderScene();
  }

  private clearChoices() {
    this.choiceTexts.forEach((choice) => choice.destroy());
    this.choiceTexts = [];
  }

  private updateScore() {
    if (!this.scoreText) {
      return;
    }

    const total =
      this.story.score.ecology * 120 +
      this.story.score.technology * 110 +
      this.story.score.survival * 130 +
      this.sceneIndex * 40;
    const padded = Math.max(total, 0).toString().padStart(6, "0");
    this.scoreText.setText(`SCORE ${padded}`);
  }
}

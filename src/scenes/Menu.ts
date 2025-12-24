import Phaser from "phaser";
import { playCoin, playSelect } from "../audio/beep";

export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    const { width, height } = this.scale;

    this.add
      .text(width / 2, height / 2 - 32, "COSMIC ARCADE LOGS", {
        fontFamily: "Courier New",
        fontSize: "16px",
        color: "#f2c94c",
      })
      .setOrigin(0.5);

    const start = this.add
      .text(width / 2, height / 2 + 6, "START MISSION", {
        fontFamily: "Courier New",
        fontSize: "12px",
        color: "#e8f0ff",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, height / 2 + 30, "[SPACE] OR TAP", {
        fontFamily: "Courier New",
        fontSize: "10px",
        color: "#8fa3c9",
      })
      .setOrigin(0.5);

    const coin = this.add
      .text(width / 2, height / 2 + 48, "INSERT COIN", {
        fontFamily: "Courier New",
        fontSize: "10px",
        color: "#f2c94c",
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: coin,
      alpha: 0.2,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.add
      .text(12, height - 18, "CREDIT 01", {
        fontFamily: "Courier New",
        fontSize: "9px",
        color: "#8fa3c9",
      })
      .setOrigin(0, 0.5);

    this.add
      .text(width - 12, height - 18, "HI-SCORE 008880", {
        fontFamily: "Courier New",
        fontSize: "9px",
        color: "#8fa3c9",
      })
      .setOrigin(1, 0.5);

    start.on("pointerup", () => {
      playCoin();
      this.scene.start("Story");
    });
    this.input.keyboard?.once("keydown-SPACE", () => {
      playSelect();
      this.scene.start("Story");
    });
  }
}

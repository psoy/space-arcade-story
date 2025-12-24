import Phaser from "phaser";
import "./styles.css";
import Boot from "./scenes/Boot";
import Menu from "./scenes/Menu";
import Story from "./scenes/Story";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 320,
  height: 180,
  parent: "app",
  pixelArt: true,
  backgroundColor: "#0b0d1a",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Menu, Story],
};

new Phaser.Game(config);

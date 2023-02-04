import Phaser from 'phaser';

export default class BaseScene extends Phaser.Scene {

  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 34;
    this.lineHeight = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: '#fff',
    };
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);

    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        .setOrigin(1, 1)
        .setScale(2)
        .setInteractive();
      backButton.input.cursor = 'pointer';

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGameObject = this.add.text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1)
        .setInteractive();
      lastMenuPositionY += this.lineHeight;

      setupMenuEvents(menuItem);
    });
  }

}
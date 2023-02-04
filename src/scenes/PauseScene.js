import Phaser from 'phaser';
import BaseScene from './BaseScene';

export default class PauseScene extends BaseScene {

  constructor(config) {
    super('PauseScene', config);

    this.menu = [
      {
        scene: 'PlayScene',
        text: 'Continue',
      },
      {
        scene: 'MenuScene',
        text: 'Exit',
      }
    ];
  }

  create() {
    super.create();

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGameObject = menuItem.textGameObject;
    textGameObject.setInteractive();
    textGameObject.input.cursor = 'pointer';

    textGameObject.on('pointerover', () => {
      textGameObject.setStyle({ fill: '#ff0' });
    });

    textGameObject.on('pointerout', () => {
      textGameObject.setStyle({ fill: '#fff' });
    });

    textGameObject.on('pointerup', () => {
      if (menuItem.scene && menuItem.text === 'Continue') {
        // Stopping the PauseScene and resuming the PlayScene
        this.scene.stop();
        // this.physics.resume(menuItem.scene);
        this.scene.resume(menuItem.scene);
      }
      if (menuItem.scene && menuItem.text === 'Exit') {
        // Stopping the PlayScene, the PauseScene and starting the MenuScene
        this.scene.stop('PlayScene');
        this.scene.start(menuItem.scene);
      }
    });
  }

}
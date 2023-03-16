const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#020202",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
const game = new Phaser.Game(config);

let player;
let cursors;

function preload() {
  this.load.image("background", "assets/background.png");
  this.load.image("character", "assets/ysa.gif");
  this.load.image("gem", "assets/gem.gif");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  this.add.image(width / 2, height / 2, "background");
  cursors = this.input.keyboard.createCursorKeys();
  player = this.add.image(width / 2, height / 2, "character");
  this.input.on("pointerdown", (pointer) => {
    const gem = this.add.image(pointer.x, pointer.y, "gem");
    gem.setScale(0.5);
  }, this);
}

function update() {
  const speed = 3;
  if(cursors.left.isDown) {
    player.x -= speed;
  } else if(cursors.right.isDown) {
    player.x += speed;
  }
  if(cursors.up.isDown) {
    player.y -= speed;
  } else if(cursors.down.isDown) {
    player.y += speed;
  }
}

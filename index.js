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

let robot;
let cursors;

function preload() {
  this.load.spritesheet("robot", "assets/robot.png", {
    frameWidth: 120,
    frameHeight: 120,
  });  
  this.load.image("background", "assets/background.png");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  this.add.image(width / 2, height / 2, "background");
  cursors = this.input.keyboard.createCursorKeys();
  robot = this.add.sprite(width / 2, height / 2, "robot");
  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers("robot", { start: 0, end: 5 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers("robot", { start: 6, end: 11 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers("robot", { start: 12, end: 17 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers("robot", { start: 18, end: 23 }),
    frameRate: 5,
    repeat: -1
  })
}

function update() {
  const speed = 1;
  if(cursors.left.isDown) {
    robot.x -= speed;
    robot.play('walk-left', true);
  } else if(cursors.right.isDown) {
    robot.x += speed;
    robot.play('walk-right', true);
  } else if(cursors.up.isDown) {
    robot.y -= speed;
    robot.play('walk-up', true);
  } else if(cursors.down.isDown) {
    robot.y += speed;
    robot.play('walk-down', true);
  } else {
    robot.anims.stop();
  }
}

const states = {};

states.idle = {
  onEnter: () => {
    robot.anims.stop();
  },
  onUpdate: () => {
    if(cursors.left.isDown) return states.walkLeft;
    if(cursors.right.isDown) return states.walkRight;
    if(cursors.up.isDown) return states.walkUp;
    if(cursors.down.isDown) return states.walkDown;
    return states.idle;
  },
  onExit: () => {}
};

states.walkLeft = {
  onEnter: () => {
    robot.play('walk-left', true);
  },
  onUpdate: () => {
    if(!cursors.left.isDown) return states.idle;
    robot.x -= 1;
    return states.walkLeft;
  },
  onExit: () => {}
}
states.walkRight = {
  onEnter: () => {
    robot.play('walk-right', true);
  },
  onUpdate: () => {
    if(!cursors.right.isDown) return states.idle;
    robot.x += 1;
    return states.walkRight;
  },
  onExit: () => {}
}
states.walkUp = {
  onEnter: () => {
    robot.play('walk-up', true);
  },
  onUpdate: () => {
    if(!cursors.up.isDown) return states.idle;
    robot.y -= 1;
    return states.walkUp;
  },
  onExit: () => {}
}
states.walkDown = {
  onEnter: () => {
    robot.play('walk-down', true);
  },
  onUpdate: () => {
    if(!cursors.down.isDown) return states.idle;
    robot.y += 1;
    return states.walkDown;
  },
  onExit: () => {}
}

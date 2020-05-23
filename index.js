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

const idle = 'idle'
const walkLeft = 'walkLeft'
const walkRight = 'walkRight'
const walkUp = 'walkUp'
const walkDown = 'walkDown'

let currentState = idle
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
    key: walkDown,
    frames: this.anims.generateFrameNumbers("robot", { start: 0, end: 5 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: walkUp,
    frames: this.anims.generateFrameNumbers("robot", { start: 6, end: 11 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: walkRight,
    frames: this.anims.generateFrameNumbers("robot", { start: 12, end: 17 }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: walkLeft,
    frames: this.anims.generateFrameNumbers("robot", { start: 18, end: 23 }),
    frameRate: 5,
    repeat: -1
  })
  currentState = idle;
  states[currentState].onEnter();
}

function update() {
  const nextState = states[currentState].onUpdate();
  if(nextState !== currentState) {
    states[currentState].onExit();
    currentState = nextState;
    states[currentState].onEnter();
  }
}



const states = {};

states.idle = {
  onEnter: () => {
    robot.anims.stop();
  },
  onUpdate: () => {
    if(cursors.left.isDown) return walkLeft;
    if(cursors.right.isDown) return walkRight;
    if(cursors.up.isDown) return walkUp;
    if(cursors.down.isDown) return walkDown;
    return idle;
  },
  onExit: () => {}
};

states.walkLeft = {
  onEnter: () => {
    robot.play(walkLeft, true);
  },
  onUpdate: () => {
    if(!cursors.left.isDown) return idle;
    robot.x -= 1;
    return walkLeft;
  },
  onExit: () => {}
}
states.walkRight = {
  onEnter: () => {
    robot.play(walkRight, true);
  },
  onUpdate: () => {
    if(!cursors.right.isDown) return idle;
    robot.x += 1;
    return walkRight;
  },
  onExit: () => {}
}
states.walkUp = {
  onEnter: () => {
    robot.play(walkUp, true);
  },
  onUpdate: () => {
    if(!cursors.up.isDown) return idle;
    robot.y -= 1;
    return walkUp;
  },
  onExit: () => {}
}
states.walkDown = {
  onEnter: () => {
    robot.play(walkDown, true);
  },
  onUpdate: () => {
    if(!cursors.down.isDown) return idle;
    robot.y += 1;
    return walkDown;
  },
  onExit: () => {}
}

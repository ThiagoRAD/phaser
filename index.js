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

const walkLeft = 'walkLeft'
const walkRight = 'walkRight'
const walkUp = 'walkUp'
const walkDown = 'walkDown'
const spellLeft = 'spellLeft'
const spellRight = 'spellRight'
const spellUp = 'spellUp'
const spellDown = 'spellDown'
const idle = 'idle'

let currentState = walkDown
let walkingLeftSprite;
let walkingRightSprite;
let walkingUpSprite;
let walkingDownSprite;
let castingLeftSprite;
let castingRightSprite;
let castingUpSprite;
let castingDownSprite;
let girl;
let cursors;

function preload() {
  this.load.spritesheet(walkLeft, "assets/walk-left.png", {
    frameWidth: 1024/4,
    frameHeight: 768/3,
  });
  this.load.spritesheet(walkRight, "assets/walk-right.png", {
    frameWidth: 1024/4,
    frameHeight: 768/3,
  });
  this.load.spritesheet(walkUp, "assets/walk-up.png", {
    frameWidth: 1024/4,
    frameHeight: 768/3,
  });
  this.load.spritesheet(walkDown, "assets/walk-down.png", {
    frameWidth: 1024/4,
    frameHeight: 768/3,
  });
  this.load.spritesheet(spellLeft, "assets/spell-left.png", {
    frameWidth: 1024/4,
    frameHeight: 1536/6,
  });
  this.load.spritesheet(spellRight, "assets/spell-right.png", {
    frameWidth: 1024/4,
    frameHeight: 1536/6,
  });
  this.load.spritesheet(spellUp, "assets/spell-up.png", {
    frameWidth: 1024/4,
    frameHeight: 1536/6,
  });
  this.load.spritesheet(spellDown, "assets/spell-down.png", {
    frameWidth: 1024/4,
    frameHeight: 1536/6,
  });
  this.load.image("background", "assets/background.png");
}

function create() {
  const width = this.sys.game.config.width;
  const height = this.sys.game.config.height;
  this.add.image(width / 2, height / 2, "background");
  cursors = this.input.keyboard.createCursorKeys();
  walkingLeftSprite = this.add.sprite(width / 2, height / 2, walkLeft);
  walkingLeftSprite.setVisible(false);
  walkingRightSprite = this.add.sprite(width / 2, height / 2, walkRight);
  walkingRightSprite.setVisible(false);
  walkingUpSprite = this.add.sprite(width / 2, height / 2, walkUp);
  walkingUpSprite.setVisible(false);
  walkingDownSprite = this.add.sprite(width / 2, height / 2, walkDown);
  walkingDownSprite.setVisible(false);
  castingLeftSprite = this.add.sprite(width / 2, height / 2, spellLeft);
  castingLeftSprite.setVisible(false);
  castingRightSprite = this.add.sprite(width / 2, height / 2, spellRight);
  castingRightSprite.setVisible(false);
  castingUpSprite = this.add.sprite(width / 2, height / 2, spellUp);
  castingUpSprite.setVisible(false);
  castingDownSprite = this.add.sprite(width / 2, height / 2, spellDown);
  castingDownSprite.setVisible(false);
  girl = this.add.sprite(width / 2, height / 2, walkDown);
  girl.setScale(0.5);

  this.anims.create({
    key: walkDown,
    frames: this.anims.generateFrameNumbers(walkDown, { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: walkUp,
    frames: this.anims.generateFrameNumbers(walkUp, { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: walkRight,
    frames: this.anims.generateFrameNumbers(walkRight, { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: walkLeft,
    frames: this.anims.generateFrameNumbers(walkLeft, { start: 0, end: 8 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: spellDown,
    frames: this.anims.generateFrameNumbers(spellDown, { start: 0, end: 22 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: spellUp,
    frames: this.anims.generateFrameNumbers(spellUp, { start: 0, end: 22 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: spellRight,
    frames: this.anims.generateFrameNumbers(spellRight, { start: 0, end: 22 }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: spellLeft,
    frames: this.anims.generateFrameNumbers(spellLeft, { start: 0, end: 22 }),
    frameRate: 10,
    repeat: -1
  })
  currentState = walkDown;
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

// Remove duplicate walkDown state, keep only this one
states.idle = {
  onEnter: () => {
    girl.anims.stop();
  },
  onUpdate: () => {
    if(cursors.left.isDown) return walkLeft;
    if(cursors.right.isDown) return walkRight;
    if(cursors.up.isDown) return walkUp;
    if(cursors.down.isDown) return walkDown;
    if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
      if(currentState === walkLeft) return spellLeft;
      if(currentState === walkRight) return spellRight;
      if(currentState === walkUp) return spellUp;
      if(currentState === walkDown) return spellDown;
    } 
    return idle;
  },
  onExit: () => {}
}
states.walkLeft = {
  onEnter: () => {
    girl.play(walkLeft, true);
  },
  onUpdate: () => {
    if(!cursors.left.isDown) return idle;
    girl.x -= 1;
    return walkLeft;
  },
  onExit: () => {}
}
states.walkRight = {
  onEnter: () => {
    girl.play(walkRight, true);
  },
  onUpdate: () => {
    if(!cursors.right.isDown) return idle;
    girl.x += 1;
    return walkRight;
  },
  onExit: () => {}
}
states.walkUp = {
  onEnter: () => {
    girl.play(walkUp, true);
  },
  onUpdate: () => {
    if(!cursors.up.isDown) return idle;
    girl.y -= 1;
    return walkUp;
  },
  onExit: () => {}
}
states.walkDown = {
  onEnter: () => {
    girl.play(walkDown, true);
  },
  onUpdate: () => {
    if(!cursors.down.isDown) return idle;
    girl.y += 1;
    return walkDown;
  },
  onExit: () => {}
}
states.spellLeft = {
  onEnter: () => {
    girl.play(spellLeft, true);
  },
  onUpdate: () => {
    if(!cursors.left.isDown) return idle;
    girl.x -= 1;
    return spellLeft;
  },
  onExit: () => {}
}
states.spellRight = {
  onEnter: () => {
    girl.play(spellRight, true);
  },
  onUpdate: () => {
    if(!cursors.right.isDown) return idle;
    girl.x += 1;
    return spellRight;
  },
  onExit: () => {}
}
states.spellUp = {
  onEnter: () => {
    girl.play(spellUp, true);
  },
  onUpdate: () => {
    if(!cursors.up.isDown) return idle;
    girl.y -= 1;
    return spellUp;
  },
  onExit: () => {}
}
states.spellDown = {
  onEnter: () => {
    girl.play(spellDown, true);
  },
  onUpdate: () => {
    if(!cursors.down.isDown) return idle;
    girl.y += 1;
    return spellDown;
  },
  onExit: () => {}
}

const config = { 
  type: Phaser.AUTO, 
  width: 800, 
  height: 600,
  backgroundColor: "#002fa7", 
  scene: { 
    preload: preload, 
    create: create, 
    update: update 
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 }, 
      debug: true
    }
  },
};

let player
let ground = this.physics.add.staticGroup();

function create() {
  player = this.physics.add.sprite(100, 450, 'player');
  ground.create(400, 568, "ground").setScale(2).refreshBody();
}

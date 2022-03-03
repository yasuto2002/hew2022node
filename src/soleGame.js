import Phaser from 'phaser';
import axios from "axios";
import $ from "jquery";
// import Pusher from 'pusher-js';
// Pusher.logToConsole = true;

// var pusher = new Pusher('7937483f3e4f68010253', {
//     cluster: 'ap3'
// });

// var pusherChannel = pusher.subscribe('test_channel');


// pusherChannel.bind('test_event', function (data) {
//     alert(data.message);
// });

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1530,
  heigth: 600,
  // backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false,
    },
  }
};

const game = new Phaser.Game(config);
var npc;
var stars;
var timedEvent1;
var timedEvent2;
var ran = 0;
var jumpbutton = document.getElementById("jump");
var numflg = 0;
var gameOver = false;
var score = 0;
var scoreText;
var timeScore = 60;
var timeSubtraction;
var setPosition;
var timeid
var over;
var clear;
var interval_id;
var countNum;
var doownId;
var countTime = document.querySelectorAll(".time");;

function getRandam(n, m) {
  for (let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * (m + 1 - n)) + n;
    return num;
  }
};

function preload() {
  this.load.image('background', 'game/assets/images/backgroung1.png');
  this.load.image('spike', 'soleGame/assets/images/spike.png');
  // At last image must be loaded with its JSON
  this.load.atlas('player', 'game/assets/images/spritesheet.png', 'game/assets/images/kenney_player_atlas.json');
  this.load.image('tiles', 'soleGame/assets/tilesets/block.png'); //ここ
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'soleGame/assets/tilemaps/level4.json'); //ここ
  this.load.image('star', 'soleGame/assets/images/Coin.png');
  // this.load.spritesheet('dude', 'soleGame/assets/images/dude.png', {
  //   frameWidth: 32,
  //   frameHeight: 48
  // });
  this.load.atlas('dude', 'soleGame/assets/images/death.png', 'soleGame/assets/images/death.json');
  // this.load.spritesheet('dude', 'soleGame/assets/images/skeleton.png', {
  //   frameWidth: 36,
  //   frameHeight: 38.4
  // });
  this.load.image('Goal', 'soleGame/assets/images/goal.png');
}

function create() {

  for (let x = 0; x < 10; x++) {
    let backgroundImage = this.add.image(2048 * x, 0, 'background').setOrigin(0, 0);
    // backgroundImage.setScale(2, 0.8);
  }

  // const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
  // backgroundImage.setScale(2, 0.8);
  const map = this.make.tilemap({
    key: 'map'
  });
  const tileset = map.addTilesetImage('kenny_simple_platformer', 'tiles');
  const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
  platforms.setCollisionByExclusion(-1, true);
  this.player = this.physics.add.sprite(50, 300, 'player');
  this.player.setBounce(0.1);
  this.physics.world.setBounds(0, 0, 4480, 380 * 2);
  this.cameras.main.setBounds(0, 0, 4480, 100 * 2);
  this.cameras.main.setZoom(1.1);
  this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, platforms);
  this.player.body.setGravityY(300);
  this.player.body.setSize(this.player.width - 90, this.player.height);
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'robo_player_',
      start: 3,
      end: 4,
    }),
    frameRate: 4,
    repeat: -1
  });
  this.anims.create({
    key: 'idle',
    frames: [{
      key: 'player',
      frame: 'robo_player_2'
    }],
    frameRate: 10,
  });
  this.anims.create({
    key: 'jump',
    frames: [{
      key: 'player',
      frame: 'robo_player_1'
    }],
    frameRate: 10,
  });
  this.anims.create({
    key: 'die',
    frames: [{
      key: 'player',
      frame: 'robo_player_0'
    }],
    frameRate: 10,
  });
  this.cursors = this.input.keyboard.createCursorKeys();
  this.spikes = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  map.getObjectLayer('Spikes').objects.forEach((spike) => {
    const spikeSprite = this.spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
    spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
  });
  this.physics.add.collider(this.player, this.spikes, playerHit, null, this);



  //Add star
  // stars = this.physics.add.group({
  //   key: 'star',
  //   repeat: 15,
  //   setXY: {
  //     x: 900,
  //     y: 0,
  //     stepX: 570 + getRandam(10, 40)
  //   }
  // });
  stars = this.physics.add.group();
  stars.add(this.physics.add.sprite(480, 0, 'star'));
  stars.add(this.physics.add.sprite(736, 0, 'star'));
  stars.add(this.physics.add.sprite(1632, 0, 'star'));
  stars.add(this.physics.add.sprite(2848, 0, 'star'));
  stars.add(this.physics.add.sprite(3552, 0, 'star'));
  stars.children.iterate(function (child) {

    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(this.player, stars, collectStar, null, this);
  // Add npc
  // npc = this.physics.add.group({
  //   key: 'dude',
  //   setXY: {
  //     x: 900,
  //     y: 550,
  //   }
  // });
  // 1218
  // npc = this.physics.add.group({
  //   key: 'dude',
  //   repeat: 15,
  //   setXY: {
  //     x: 790,
  //     y: 0,
  //     stepX: 570
  //   }
  // });
  //1218
  npc = this.physics.add.group();
  npc.add(this.physics.add.sprite(288, 0, 'dude'));
  npc.add(this.physics.add.sprite(1045, 0, 'dude'));
  npc.add(this.physics.add.sprite(1568, 0, 'dude'));
  npc.add(this.physics.add.sprite(2368, 0, 'dude'));
  npc.add(this.physics.add.sprite(3104, 0, 'dude'));
  npc.children.iterate(function (child) {
    child.body.setSize(child.width - 40, child.height);
    //  Give each star a slightly different bounce
    child.setBounce(0.2);
    child.setCollideWorldBounds(true);

  });

  // npc = this.physics.add.sprite(100, 450, 'dude');
  // npc.setBounce(0.2);
  // npc.setCollideWorldBounds(true);
  //  Our npc animations, turning, walking left and walking right.
  //0223
  // this.anims.create({
  //   key: 'leftNpc',
  //   frames: this.anims.generateFrameNumbers('dude', {
  //     start: 0,
  //     end: 3
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  // this.anims.create({
  //   key: 'turnNpc',
  //   frames: [{
  //     key: 'dude',
  //     frame: 4
  //   }],
  //   frameRate: 20
  // });

  // this.anims.create({
  //   key: 'rightNpc',
  //   frames: this.anims.generateFrameNumbers('dude', {
  //     start: 5,
  //     end: 8
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // });
  //0223
  this.anims.create({
    key: 'leftNpc',
    frames: this.anims.generateFrameNames('dude', {
      prefix: 'skeleton_',
      start: 3,
      end: 5,
    }),
    frameRate: 4,
    repeat: -1
  });
  this.anims.create({
    key: 'rightNpc',
    frames: this.anims.generateFrameNames('dude', {
      prefix: 'skeleton_',
      start: 3,
      end: 5,
    }),
    frameRate: 4,
    repeat: -1
  });
  // this.anims.create({
  //   key: 'idle',
  //   frames: [{
  //     key: 'dude',
  //     frame: 'skeleton_14'
  //   }],
  //   frameRate: 10,
  // });
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNames('dude', {
      prefix: 'skeleton_',
      start: 6,
      end: 8,
    }),
    frameRate: 4,
    repeat: -1
  });

  this.physics.add.collider(npc, platforms);

  // var timedEvent = this.time.delayedCall(0, onEvent1, [], this);
  // timedEvent = this.time.addEvent({
  //   delay: 1000,
  //   callback: onEvent1,
  //   callbackScope: this,
  //   loop: true
  // });

  //1218
  timedEvent1 = this.time.addEvent({
    delay: 4000,
    startAt: 2000,
    callback: onEvent1,
    callbackScope: this,
    loop: true,
  });

  timedEvent2 = this.time.addEvent({
    delay: 4000,
    callback: onEvent2,
    callbackScope: this,
    loop: true,
  });
  this.physics.add.overlap(this.player, npc, hitNpc, null, this);
  //1218



  // timedEvent1 = this.time.addEvent({
  //   delay: 2000,
  //   callback: onEvent1,
  //   callbackScope: this,
  //   loop: true
  // });
  // timedEvent2 = this.time.addEvent({
  //   delay: 3000,
  //   callback: onEvent2,
  //   callbackScope: this,
  //   loop: true
  // });

  // timedEvent3 = this.time.addEvent({
  //   delay: 6000,
  //   callback: onEvent3,
  //   callbackScope: this,
  //   repeat: 4
  // });

  //0227
  // this.button1 = this.add.text(90, 42).setScrollFactor(0).setFontSize(32);
  // this.button1.setText("→");
  // this.button1.setOrigin(0.5)
  // this.button1.setPadding(10)
  // // this.button1.setStyle({
  // //     backgroundColor: '#111',
  // // })
  // this.button1.setInteractive({
  //   useHandCursor: true
  // })


  // this.button2 = this.add.text(122, 48).setScrollFactor(0).setFontSize(20);
  // this.button2.setText("↗");
  // this.button2.setOrigin(0.5)
  // this.button2.setPadding(10)
  // // this.button1.setStyle({
  // //     backgroundColor: '#111',
  // // })
  // this.button2.setInteractive({
  //   useHandCursor: true
  // })

  // this.button1.on('pointerover', () => {
  //   this.player.setVelocityX(200);
  //   this.player.play('walk', true);
  //   numflg = 1;
  // });
  // this.button1.on('pointerout', () => {
  //   this.player.setVelocityX(0);
  //   this.player.play('idle', true);
  //   numflg = 0;
  // });
  // this.button2.on('pointerover', () => {
  //   if (this.player.body.onFloor()) {
  //     // this.player.setVelocityY(-400);
  //     this.player.setVelocity(200, -350);
  //     this.player.play('jump', true);
  //     numflg = 1;
  //     timeid = window.setTimeout(() => {
  //       if (!this.player.body.onFloor()) {
  //         this.player.setVelocity(0, 0);
  //         this.player.play('idle', true);
  //       }
  //     }, 1375);
  //   }
  // });
  // this.button2.on('pointerout', () => {
  //   if (timeid != undefined) {
  //     window.clearTimeout(timeid);
  //   }
  //   this.player.setVelocityX(0);
  //   this.player.play('idle', true);
  //   numflg = 0;
  // });
  //0227
  // this.text.strokeRoundedRect(32, 32, 300, 200, 32);
  // .on('pointerdown', startGame)
  // .on('pointerover', () => startButton.setStyle({
  //   fill: '#f39c12'
  // }))
  const {
    centerX,
    centerY
  } = this.cameras.main;

  // this.add.text(centerX, centerY, 'GAME OVER!').setOrigin(0.5, 0.5);
  this.text = this.add.text(centerX, 42).setOrigin(0.5, 0).setScrollFactor(0).setFontSize(32);
  this.text.setText('SCORE:' + 0);
  this.over_text = this.add.text(centerX, centerY).setOrigin(0.5, 0.5).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
  this.over_text.setText('START');
  var timedstart = this.time.delayedCall(1000, textChange, [], this);

  this.Timetext = this.add.text(1400, 42).setScrollFactor(0).setFontSize(32);
  this.Timetext.setText(timeScore);
  timeSubtraction = this.time.addEvent({
    delay: 1000,
    callback: Subtraction,
    callbackScope: this,
    repeat: 59
  });
  // setPosition = this.time.delayedCall(10000, setpotishon, [], this);
  //console.log(this.player.body.position.x);

  var Scorereport = async () => {
    let surl = "https://yasutosub.com/GameRecord";
    let params = new URLSearchParams();
    params.append("mail_address", maile);
    params.append("point", score);
    let status;
    try {
      status = await axios.post(surl, params);
      console.log(status.data);
      if (status.data.status) {
        return;
      } else {
        location.href = "/Error";
        return;
      }
    } catch (error) {
      location.href = "/Error";
      return;
    }
  }

  var timecount = async () => {
    countNum--;
    console.log(countNum);
    // document.getElementById("time").innerHTML = countNum;
    // countTime.innerHTML = countNum;
    await setCount(countNum);
    if (countNum == 0) {
      clearInterval(doownId);
      await Scorereport();
      location.href = "/";
    }
  }

  var setCount = async (countNum) => {
    console.log(countTime);
    // countTime[0].childNodes.appendChild(countNum);
    $('.time').text(countNum)
    return;
  }


  over = async () => {
    this.player.play('die', true);
    this.physics.pause();
    gameOver = true;
    this.over = this.add.text(centerX, centerY).setOrigin(0.5, 0.5).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
    this.over.setText('GAME OVER!');
    clearInterval(interval_id);
    setTimeout(function () {
      let scoreBord = document.getElementById('Lscore');
      scoreBord.classList.remove('none');
      let game = document.getElementById('game');
      game.classList.add('none');
    }, 5000);
    countNum = 10;
    doownId = await window.setInterval(timecount, 1000);
  }
  clear = async () => {
    this.physics.pause();
    gameOver = true;
    this.over = this.add.text(centerX, centerY).setOrigin(0.5, 0.5).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
    this.over.setText('GAME CLEAR!');
    clearInterval(interval_id);
    if (!maile) {
      location.href = "/Logreg";
      return;
    }
    setTimeout(function () {
      let scoreBord = document.getElementById('Wscore');
      scoreBord.classList.remove('none');
      let game = document.getElementById('game');
      game.classList.add('none');
    }, 5000);
    countNum = 10;
    doownId = await window.setInterval(timecount, 1000);
  }

  //0303
  // this.goals = this.physics.add.group({
  //   allowGravity: false,
  //   immovable: true
  // });
  // map.getObjectLayer('Goal').objects.forEach((goal) => {
  //   const goalSprite = this.goals.create(goal.x, goal.y + 200 - goal.height, 'Goal').setOrigin(0);
  //   goalSprite.body.setSize(goal.width, goal.height - 20).setOffset(0, 20);
  //   this.physics.add.collider(this.player, goalSprite, clear, null, this);
  // });
  //0303
  this.goals = this.physics.add.sprite(4128, 320, 'Goal');
  this.physics.add.collider(this.goals, platforms);
  this.physics.add.collider(this.player, this.goals, clear, null, this);
  this.physics.add.collider(npc, this.goals, over, null, this);
  // this.physics.add.collider(this.player, this.goals, clear, null, this);
}

// function setpotishon() {
//     this.player.setX(900);
// }


function Eventjump() {
  player.setVelocityX(0);
}

function Subtraction() {
  timeScore -= 1;
  this.Timetext.setText(timeScore);
  if (timeScore == 0) {
    // this.physics.pause();
    // this.player.setTint(0xff0000);
    // gameOver = true;
    // this.over = this.add.text(1100 / 2, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
    // this.over.setText('GAME OVER');
    // timeSubtraction.destroy();
    over();
  }
  return;
}

function textChange() {
  this.over_text.setText('');
}

function onEvent1() {
  for (const npcSprite of npc.getChildren()) {
    npcSprite.setFlipX(false);
    npcSprite.setVelocityX(50);
    npcSprite.play('rightNpc', true);
  }
}

// function onEvent1() {
//   for (const npcSprite of npc.getChildren()) {
//     if (npc.body.onFloor()) {
//       npc.setVelocityX(10);
//       npc.play('leftNpc', true);
//     }
//     return;
//   }
// }

function onEvent2() {
  for (const npcSprite of npc.getChildren()) {
    npcSprite.setFlipX(true);
    npcSprite.setVelocityX(-50);
    npcSprite.play('leftNpc', true);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  this.text.setText('SCORE:' + score);
}

function hitNpc(player, npc) {
  // this.physics.pause();
  // player.setTint(0xff0000);
  // gameOver = true;
  // this.over = this.add.text(1100 / 2, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
  // this.over.setText('GAME OVER');
  // timeSubtraction.destroy();
  over();
}
// function onEvent2() {
//   for (const npcSprite of npc.getChildren()) {
//     npcSprite.setVelocityX(0);
//     npcSprite.play('turnNpc', true);
//     // npcSprite.play('turnNpc', true);
//     // npcSprite.setVelocityX(0);
//   }
// }

// function onEvent3() {
//   for (const npcSprite of npc.getChildren()) {
//     npcSprite.setVelocityX(10);
//     npcSprite.play('rightNpc', true);
//     // npcSprite.play('turnNpc', true);
//     // npcSprite.setVelocityX(0);
//   }
// }


function update() {


  // I want to walk npc
  // ran = getRandam(0, 70);
  // if (ran == 0) {
  //   if (num == 0) {
  //     npc.setVelocityX(-30);
  //     npc.play('leftNpc', true);
  //     num = 1;
  //   } else if (num == 1) {
  //     npc.setVelocityX(30);
  //     npc.play('rightNpc', true);
  //     num = 0;
  //   }
  // }

  // var fn = function () {
  //   ran = getRandam(0, 70);
  //   if (ran != 0) {
  // for (const npcSprite of npc.getChildren()) {
  //   npcSprite.setVelocityX(-10);
  //   npcSprite.play('leftNpc', true);
  // }
  // }
  // }

  // var id = setInterval(fn, 1);
  //Player processing
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-223);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(223);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else {
    // If no keys are pressed, the player keeps still
    if (numflg != 1) {
      this.player.setVelocityX(0);
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
    }

    // jumpbutton.addEventListener("mouseover", () => {
    //     console.log("a");
    //     this.player.setVelocityX(200);
    //     this.player.play('walk', true);
    //     numflg = 1;
    // })
    // jumpbutton.addEventListener("mouseout", () => {
    //     console.log("ab");
    //     this.player.setVelocityX(0);
    //     this.player.play('idle', true);
    //     numflg = 0;
    // })

  }

  // Player can jump while walking any direction by pressing the space bar
  // or the 'UP' arrow
  if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
    this.player.setVelocityY(-450);
    this.player.play('jump', true);
  }
  if (this.player.body.velocity.x > 0) {
    this.player.setFlipX(false);
  } else if (this.player.body.velocity.x < 0) {
    // otherwise, make them face the other side
    this.player.setFlipX(true);
  }


}
// pusherChannel.bind('test_event', function (data) {
//     console.log('a');
//     onEvent1();
//     numflg = 0;
// });

//Collision detection between spikes and players
function playerHit(player, spike) {
  player.setVelocity(0, 0);
  player.setX(50);
  player.setY(0);
  player.play('idle', true);
  player.setAlpha(0);
  let tw = this.tweens.add({
    targets: player,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  });
}
// pusherChannel.bind('test_event', function (data) {
//     onEvent1();
// });

import io from "socket.io-client";
import Phaser from 'phaser';
var socket = io();
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var isEnter = false;
// var room = "room1";

// window.onload()
//   socket.emit('client_to_server_personal', {
//     roomid: input.value
//   });



const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1600,
  heigth: 600,
  backgroundColor: "#000000",
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
var timeid;
var timedEvent;
var wallSprite;
var walls;
var timewall;
var timeScore = 65;
var timeSubtraction;
var timedstart;
var interval_id;
var over_text;
var Timetext;
const IAM = {
  token: null, // トークン
  name: null, // 名前
  is_join: false // 入室中？
};
const MEMBER = {
  0: "マスター"
};

function removeMemberList(token) {
  // 内部変数から削除
  delete MEMBER[token];
}

socket.on("token", (data) => {
  // トークンを保存
  IAM.token = data.token;
  socket.emit("join", {
    token: IAM.token,
    name: room
  });
});

socket.on("join-result", (data) => {
  //------------------------
  // 正常に入室できた
  //------------------------
  if (data.status) {
    // 入室フラグを立てる
    IAM.is_join = true;
    console.log(data);
    // すでにログイン中のメンバー一覧を反映
    for (let i = 1; i < data.list.length; i++) {
      const cur = data.list[i];
      // console.log(item);
      if (!(cur.token in MEMBER)) {
        addMemberList(cur.token, cur.name);
      }
    }
  };

});

socket.on("member-join", (data) => {
  console.log(`${data.name}さんが入室しました`);
  addMemberList(data.token, data.name);
});
socket.on("member-quit", (data) => {
  if (room == data.name) {
    const name = MEMBER[data.token];
    console.log(`${name}さんが退室しました`);
    removeMemberList(data.token);
  }
});

function addMemberList(token, name) {
  // 内部変数に保存
  MEMBER[token] = name;
}


function getRandam(n, m) {
  for (let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * (m + 1 - n)) + n;
    return num;
  }
};



function preload() {
  this.load.image('background', 'game/assets/images/background.png');
  this.load.image('spike', 'game/assets/images/spike.png');
  this.load.image('Goal', 'game/assets/images/Goal.png');
  this.load.image('Wall', 'game/assets/images/wall.png');
  // At last image must be loaded with its JSON
  this.load.atlas('player', 'game/assets/images/kenney_player.png', 'game/assets/images/kenney_player_atlas.json');
  this.load.image('tiles', 'game/assets/tilesets/platformPack_tilesheet.png');
  // Load the export Tiled JSON
  this.load.tilemapTiledJSON('map', 'game/assets/tilemaps/level1.json');
  this.load.image('star', 'game/assets/images/star.png');
  this.load.spritesheet('dude', 'game/assets/images/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  });
}

function create() {
  // for (let x = 0; x < 10; x++) {
  //     let backgroundImage = this.add.image(1024 * x, 0, 'background').setOrigin(0, 0);
  //     backgroundImage.setScale(2, 0.8);
  // }

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
  this.physics.world.setBounds(0, 0, 3100 * 2, 380 * 2);
  this.cameras.main.setBounds(0, 0, 3100 * 2, 380 * 2);
  this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, platforms);
  this.player.body.setGravityY(300);
  npc = this.physics.add.sprite(20, 300, 'player');
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNames('player', {
      prefix: 'robo_player_',
      start: 2,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'idle',
    frames: [{
      key: 'player',
      frame: 'robo_player_0'
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

  walls = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  map.getObjectLayer('Walls').objects.forEach((wall) => {
    const wallSprite = walls.create(wall.x, wall.y + 200 - wall.height, 'Wall').setOrigin(0);
    this.physics.add.collider(this.player, wallSprite);
    this.physics.add.collider(npc, wallSprite);
  });


  this.goals = this.physics.add.group({
    allowGravity: false,
    immovable: true
  });
  map.getObjectLayer('Goal').objects.forEach((goal) => {
    const goalSprite = this.goals.create(goal.x, goal.y + 200 - goal.height, 'Goal').setOrigin(0);
    goalSprite.body.setSize(goal.width, goal.height - 20).setOffset(0, 20);
    this.physics.add.collider(this.player, goalSprite, gameClear, null, this);
    this.physics.add.collider(npc, goalSprite, npcgoal, null, this);
  });
  // this.physics.add.collider(this.player, this.spikes, playerHit, null, this);


  // timewall = this.time.delayedCall(5000, deletewall, [], this);
  //Add star
  stars = this.physics.add.group({
    key: 'star',
    repeat: 15,
    setXY: {
      x: 900,
      y: 0,
      stepX: 570 + getRandam(10, 40)
    }
  });
  stars.children.iterate(function (child) {

    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(this.player, stars, collectStar, null, this);
  // this.physics.add.collider(stars, npc);
  this.physics.add.overlap(npc, stars, npcStar, null, this);
  //Add npc
  // npc = this.physics.add.group({
  //     key: 'dude',
  //     setXY: {
  //         x: 900,
  //         y: 550,
  //     }
  // });

  // npc = this.physics.add.group({
  //     key: 'dude',
  //     repeat: 15,
  //     setXY: {
  //         x: 790,
  //         y: 0,
  //         stepX: 570
  //     }
  // });

  // npc = this.physics.add.sprite(20, 300, 'player');
  npc.setBounce(0.1);
  npc.setCollideWorldBounds(true);
  npc.body.setGravityY(300);
  npc.setTint(0xff0000);
  this.physics.add.collider(npc, this.spikes, npcHit, null, this);
  //  Our npc animations, turning, walking left and walking right.
  // this.anims.create({
  //     key: 'leftNpc',
  //     frames: this.anims.generateFrameNumbers('dude', {
  //         start: 0,
  //         end: 3
  //     }),
  //     frameRate: 10,
  //     repeat: -1
  // });

  // this.anims.create({
  //     key: 'turnNpc',
  //     frames: [{
  //         key: 'dude',
  //         frame: 4
  //     }],
  //     frameRate: 20
  // });

  // this.anims.create({
  //     key: 'rightNpc',
  //     frames: this.anims.generateFrameNumbers('dude', {
  //         start: 5,
  //         end: 8
  //     }),
  //     frameRate: 10,
  //     repeat: -1
  // });
  this.physics.add.collider(npc, platforms);

  // timedEvent = this.time.addEvent({
  //   delay: 1000,
  //   callback: LocationEvent,
  //   callbackScope: this,
  //   loop: true
  // });

  //koko
  // timedEvent1 = this.time.addEvent({
  //     delay: 4000,
  //     startAt: 2000,
  //     callback: onEvent1,
  //     callbackScope: this,
  //     loop: true,
  // });

  // timedEvent2 = this.time.addEvent({
  //     delay: 4000,
  //     callback: onEvent2,
  //     callbackScope: this,
  //     loop: true,
  // });
  // this.physics.add.overlap(this.player, npc, hitNpc, null, this);

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
  this.button1 = this.add.text(200, 32).setScrollFactor(0).setFontSize(32);
  this.button1.setText("→");
  this.button1.setOrigin(0.5)
  this.button1.setPadding(10)
  // this.button1.setStyle({
  //     backgroundColor: '#111',
  // })
  this.button1.setInteractive({
    useHandCursor: true
  })

  this.button1.on('pointerover', () => {
    this.player.setVelocityX(200);
    this.player.play('walk', true);
    numflg = 1;
    socket.emit('chat message', {
      room: room,
      value: 2,
      player_id: player_id
    });
  });
  this.button1.on('pointerout', () => {
    this.player.setVelocityX(0);
    this.player.play('idle', true);
    numflg = 0;
    socket.emit('chat message', {
      room: room,
      value: 3,
      player_id: player_id,
      location: this.player.x
    });
  });


  this.button2 = this.add.text(126, 34).setScrollFactor(0).setFontSize(32);
  this.button2.setText("↑");
  this.button2.setOrigin(0.5)
  this.button2.setPadding(10)
  // this.button1.setStyle({
  //     backgroundColor: '#111',
  // })
  this.button2.setInteractive({
    useHandCursor: true
  })

  this.button2.on('pointerover', () => {
    if (this.player.body.onFloor()) {
      this.player.setVelocityY(-400);
      this.player.play('jump', true);
      numflg = 1;
      socket.emit('chat message', {
        room: room,
        value: 0,
        player_id: player_id
      });
    }
  });
  this.button2.on('pointerout', () => {
    this.player.setVelocityX(0);
    this.player.play('idle', true);
    numflg = 0;
    socket.emit('chat message', {
      room: room,
      value: 3,
      player_id: player_id,
      location: this.player.x
    });
  });



  this.button3 = this.add.text(160, 38).setScrollFactor(0).setFontSize(20);
  this.button3.setText("↗");
  this.button3.setOrigin(0.5)
  this.button3.setPadding(10)
  // this.button1.setStyle({
  //     backgroundColor: '#111',
  // })
  this.button3.setInteractive({
    useHandCursor: true
  })

  this.button3.on('pointerover', () => {
    if (this.player.body.onFloor()) {
      this.player.setVelocityY(-500);
      this.player.play('jump', true);
      this.player.setVelocityX(300);
      numflg = 1;
      timeid = window.setTimeout(() => {
        if (!this.player.body.onFloor()) {
          this.player.setVelocity(0, 0);
          this.player.play('idle', true);
        }
      }, 1375);
      socket.emit('chat message', {
        room: room,
        value: 4,
        player_id: player_id
      });
    }
  });
  this.button3.on('pointerout', () => {
    this.player.setVelocityX(0);
    this.player.play('idle', true);
    numflg = 0;
    socket.emit('chat message', {
      room: room,
      value: 3,
      player_id: player_id,
      location: this.player.x
    });

  });

  this.button4 = this.add.text(84, 38).setScrollFactor(0).setFontSize(20);
  this.button4.setText("↖");
  this.button4.setOrigin(0.5)
  this.button4.setPadding(10)
  // this.button1.setStyle({
  //     backgroundColor: '#111',
  // })
  this.button4.setInteractive({
    useHandCursor: true
  })

  this.button4.on('pointerover', () => {
    if (this.player.body.onFloor()) {
      this.player.setVelocityY(-400);
      this.player.play('jump', true);
      this.player.setVelocityX(-200);
      numflg = 1;
      socket.emit('chat message', {
        room: room,
        value: 5,
        player_id: player_id
      });
    }
  });
  this.button4.on('pointerout', () => {
    this.player.setVelocityX(0);
    this.player.play('idle', true);
    numflg = 0;
    socket.emit('chat message', {
      room: room,
      value: 3,
      player_id: player_id,
      location: this.player.x
    });
  });

  this.button5 = this.add.text(32, 32).setScrollFactor(0).setFontSize(32);
  this.button5.setText("←");
  this.button5.setOrigin(0.5)
  this.button5.setPadding(10)
  // this.button1.setStyle({
  //     backgroundColor: '#111',
  // })
  this.button5.setInteractive({
    useHandCursor: true
  })

  this.button5.on('pointerover', () => {
    if (this.player.body.onFloor()) {
      this.player.setVelocityX(-200);
      this.player.play('walk', true);
      numflg = 1;
      socket.emit('chat message', {
        room: room,
        value: 1,
        player_id: player_id
      });
    }
  });
  this.button5.on('pointerout', () => {
    this.player.setVelocityX(0);
    this.player.play('idle', true);
    numflg = 0;
    socket.emit('chat message', {
      room: room,
      value: 3,
      player_id: player_id,
      location: this.player.x
    });
  });

  // this.text.strokeRoundedRect(32, 32, 300, 200, 32);
  // .on('pointerdown', startGame)
  // .on('pointerover', () => startButton.setStyle({
  //   fill: '#f39c12'
  // }))
  this.text = this.add.text(750, 32).setScrollFactor(0).setFontSize(32);
  this.text.setText('SCORE:' + 0);
  over_text = this.add.text(650, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
  // this.over_text.setText('START');
  // timedstart = this.time.delayedCall(6000, textChange, [], this);

  Timetext = this.add.text(1400, 32).setScrollFactor(0).setFontSize(32);
  Timetext.setText(60);
  // timeSubtraction = this.time.addEvent({
  //   delay: 1000,
  //   startAt: 0,
  //   callback: Subtraction,
  //   callbackScope: this,
  //   repeat: 64
  // });

}

socket.on('Start', function () {
  console.log("Start");
  console.log(socket.id);
  start();
})

function start() {
  interval_id = setInterval(() => {
    Subtraction();
  }, 1000)
}

function Subtraction() {
  timeScore -= 1;
  if (timeScore == 60) {
    over_text.setText('START');
    deletewall();
  }
  if (timeScore <= 60) {
    Timetext.setText(timeScore);
  } else {
    Timetext.setText(timeScore - 60);
  }
  if (timeScore == 59) {
    textChange();
  }
  if (timeScore == 0) {
    clearInterval(interval_id);
    this.physics.pause();
    this.player.setTint(0xff0000);
    gameOver = true;
    this.over = this.add.text(650, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
    this.over.setText('GAME OVER');
  }
  return;
}

function textChange() {
  over_text.setText('');
}


function LocationEvent() {
  socket.emit('submit Location', {
    room: room,
    location: this.player.x
  });
}

function deletewall() {
  for (const wall of walls.getChildren()) {
    wall.disableBody(true, true);
  }
}
// function onEvent1() {
//     for (const npcSprite of npc.getChildren()) {
//         npcSprite.setVelocityX(100);
//         npcSprite.play('rightNpc', true);
//     }
// }
// function onEvent1() {
//     // for (const npcSprite of npc.getChildren()) {
//     if (npc.body.onFloor()) {
//         console.log(numflg);
//         npc.setVelocityX(10);
//         npc.play('leftNpc', true);
//     }
//     return;
//     // }
// }

// function onEvent2() {
//     for (const npcSprite of npc.getChildren()) {
//         npcSprite.setVelocityX(-100);
//         npcSprite.play('leftNpc', true);
//     }
// }
function npcStar(gonpc, star) {
  star.disableBody(true, true);
}

function npcgoal(npc, goal) {
  this.physics.pause();
  gameOver = true;
  this.over = this.add.text(610, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
  this.over.setText('GAME OVER!');
  timeSubtraction.destroy();
}

function gameClear() {
  this.physics.pause();
  gameOver = true;
  this.over = this.add.text(610, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');
  this.over.setText('GAME CLEAR');
  timeSubtraction.destroy();
}

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  this.text.setText('SCORE:' + score);
}
socket.on('submit Location', function (location) {
  npc.x = location.location;
});

// function hitNpc(player, npc) {
//     this.physics.pause();
//     player.setTint(0xff0000);
//     gameOver = true;
//     this.over = this.add.text(1100 / 2, 580 / 2).setScrollFactor(0).setFontSize(80).setColor('#ffffff');;
//     this.over.setText('GAME OVER');
// }
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
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-224);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(224);
    if (this.player.body.onFloor()) {
      this.player.play('walk', true);
    }
  } else {
    if (numflg != 1) {
      this.player.setVelocityX(0);
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

  if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
    this.player.setVelocityY(-400);
    this.player.play('jump', true);
  }
  if (this.player.body.velocity.x > 0) {
    this.player.setFlipX(false);
  } else if (this.player.body.velocity.x < 0) {
    this.player.setFlipX(true);
  }

}
// pusherChannel.bind('test_event', function (data) {
//   console.log("a");
//   if (data.message == 0) {
//     gojump();
//   } else if (data.message == 1) {
//     goleft();
//   } else if (data.message == 2) {
//     goright();
//   } else if (data.message == 3) {
//     stop();
//   }
//   if (npc.body.velocity.x > 0) {
//     npc.setFlipX(false);
//   } else if (npc.body.velocity.x < 0) {
//     npc.setFlipX(true);
//   }
//   return;
// });


socket.on('chat message', function (msg) {
  if (msg.player_id != player_id) {
    if (msg.value == 0) {
      gojump();
    } else if (msg.value == 1) {
      goleft();
    } else if (msg.value == 2) {
      goright();
    } else if (msg.value == 3) {
      stop();
      npc.x = msg.location;
    } else if (msg.value == 4) {
      rightJump();
    } else if (msg.value == 5) {
      leftJump();
    }
    if (npc.body.velocity.x > 0) {
      npc.setFlipX(false);
    } else if (npc.body.velocity.x < 0) {
      npc.setFlipX(true);
    }
  }
})

function gojump() {
  if (npc.body.onFloor()) {
    npc.setVelocityY(-440);
    npc.play('jump', true);
  }
  return;
}

function goleft() {
  npc.setVelocityX(-200);
  if (npc.body.onFloor()) {
    npc.play('walk', true);
  }
  return;
}

function goright() {
  npc.setVelocityX(200);
  if (npc.body.onFloor()) {
    npc.play('walk', true);
  }
  return;
}

function stop() {
  npc.setVelocityX(0);
  if (npc.body.onFloor()) {
    npc.play('idle', true);
  }
}

function rightJump() {
  npc.setVelocityX(300);
  npc.setVelocityY(-540);
  npc.play('jump', true);
  timeid = window.setTimeout(() => {
    if (!npc.body.onFloor()) {
      npc.setVelocity(0, 0);
      npc.play('idle', true);
    }
  }, 1375);
  return;
}

function leftJump() {
  npc.setVelocityX(-200);
  npc.setVelocityY(-440);
  npc.play('jump', true);
  timeid = window.setTimeout(() => {
    if (!npc.body.onFloor()) {
      npc.setVelocity(0, 0);
      npc.play('idle', true);
    }
  }, 1375);
  return;
}

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

function npcHit(npc, spike) {
  npc.setVelocity(0, 0);
  npc.setX(50);
  npc.setY(0);
  npc.play('idle', true);
  npc.setAlpha(0);
  let tw = this.tweens.add({
    targets: npc,
    alpha: 1,
    duration: 100,
    ease: 'Linear',
    repeat: 5,
  });
}

socket.emit('gameStart', {
  room: room,
  value: 2,
  player_id: player_id
});
socket.on('gameStart', function (msg) {
  if (msg.player_id != player_id) {
    socket.emit('Start', {
      room: room,
      value: 2,
      player_id: player_id
    });
  }
})

socket.on('breakRoom', function (data) {
  if (room == data.name) {
    console.log("相手が退出しました");
  }
})

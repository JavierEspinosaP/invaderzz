function preload() {

    this.load.plugin('rexsoundfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsoundfadeplugin.min.js', true);


    this.load.audio('backgroundMusic1', 'assets/sounds/background.wav')
    this.load.audio('backgroundMusic2', 'assets/sounds/background2.wav')
    this.load.audio('powerUp', 'assets/sounds/powerUp.wav')
    this.load.audio('calibratingSystem', 'assets/sounds/calibratingSystem.wav')
    this.load.audio('startUp', 'assets/sounds/ship_power2.wav')
    this.load.audio('powerDown', 'assets/sounds/ship_down.wav')

    this.load.image('ship', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('bullet_charge', 'assets/bullet_charge.png');
    this.load.image('background', 'assets/nebula.jpg');
    this.load.atlas('space', 'assets/space.png', 'assets/space.json');
    this.load.image('stars', 'assets/stars.png');
    this.load.image('asteroid1_0', 'assets/spritesheet_asteroids/asteroid1/frame_00_delay-0.1s.png');
    this.load.image('asteroid1_1', 'assets/spritesheet_asteroids/asteroid1/frame_01_delay-0.1s.png');
    this.load.image('asteroid1_2', 'assets/spritesheet_asteroids/asteroid1/frame_02_delay-0.1s.png');
    this.load.image('asteroid1_3', 'assets/spritesheet_asteroids/asteroid1/frame_03_delay-0.1s.png');
    this.load.image('asteroid1_4', 'assets/spritesheet_asteroids/asteroid1/frame_04_delay-0.1s.png');
    this.load.image('asteroid1_5', 'assets/spritesheet_asteroids/asteroid1/frame_05_delay-0.1s.png');
    this.load.image('asteroid1_6', 'assets/spritesheet_asteroids/asteroid1/frame_06_delay-0.1s.png');
    this.load.image('asteroid1_7', 'assets/spritesheet_asteroids/asteroid1/frame_07_delay-0.1s.png');
    this.load.image('asteroid1_8', 'assets/spritesheet_asteroids/asteroid1/frame_08_delay-0.1s.png');
    this.load.image('asteroid1_9', 'assets/spritesheet_asteroids/asteroid1/frame_09_delay-0.1s.png');
    this.load.image('asteroid1_10', 'assets/spritesheet_asteroids/asteroid1/frame_10_delay-0.1s.png');
    this.load.image('asteroid1_11', 'assets/spritesheet_asteroids/asteroid1/frame_11_delay-0.1s.png');
    this.load.image('asteroid1_12', 'assets/spritesheet_asteroids/asteroid1/frame_12_delay-0.1s.png');
    this.load.image('asteroid1_13', 'assets/spritesheet_asteroids/asteroid1/frame_13_delay-0.1s.png');
    this.load.image('asteroid1_14', 'assets/spritesheet_asteroids/asteroid1/frame_14_delay-0.1s.png');
    this.load.image('asteroid1_15', 'assets/spritesheet_asteroids/asteroid1/frame_15_delay-0.1s.png');
    this.load.image('asteroid1_16', 'assets/spritesheet_asteroids/asteroid1/frame_16_delay-0.1s.png');
    this.load.image('asteroid1_17', 'assets/spritesheet_asteroids/asteroid1/frame_17_delay-0.1s.png');
    this.load.image('asteroid1_18', 'assets/spritesheet_asteroids/asteroid1/frame_18_delay-0.1s.png');
    this.load.image('explosion1', 'assets/explosions/explosion1/explosion1 (1).png');
    this.load.image('explosion2', 'assets/explosions/explosion1/explosion1 (2).png');
    this.load.image('explosion3', 'assets/explosions/explosion1/explosion1 (3).png');
    this.load.image('explosion4', 'assets/explosions/explosion1/explosion1 (4).png');
    this.load.image('explosion5', 'assets/explosions/explosion1/explosion1 (5).png');
    this.load.image('explosion6', 'assets/explosions/explosion1/explosion1 (6).png');
    this.load.image('explosion7', 'assets/explosions/explosion1/explosion1 (7).png');
    this.load.image('explosion8', 'assets/explosions/explosion1/explosion1 (8).png');
    this.load.image('explosion9', 'assets/explosions/explosion1/explosion1 (9).png');
    this.load.image('explosion10', 'assets/explosions/explosion1/explosion1 (10).png');
    this.load.image('explosion11', 'assets/explosions/explosion1/explosion1 (11).png');
    this.load.image('explosion12', 'assets/explosions/explosion1/explosion1 (12).png');
    this.load.image('explosion13', 'assets/explosions/explosion1/explosion1 (13).png');
    this.load.image('explosion14', 'assets/explosions/explosion1/explosion1 (14).png');
    this.load.image('explosion15', 'assets/explosions/explosion1/explosion1 (15).png');
    this.load.image('explosion16', 'assets/explosions/explosion1/explosion1 (16).png');
    this.load.image('explosion17', 'assets/explosions/explosion1/explosion1 (17).png');
    this.load.image('explosion18', 'assets/explosions/explosion1/explosion1 (18).png');
    this.load.image('explosion19', 'assets/explosions/explosion1/explosion1 (19).png');
    this.load.image('explosion20', 'assets/explosions/explosion1/explosion1 (20).png');
    this.load.image('explosion21', 'assets/explosions/explosion1/explosion1 (21).png');
    this.load.image('explosion22', 'assets/explosions/explosion1/explosion1 (22).png');
    this.load.image('explosion23', 'assets/explosions/explosion1/explosion1 (23).png');
    this.load.image('explosion24', 'assets/explosions/explosion1/explosion1 (24).png');

    this.load.image('explosion2_1', 'assets/explosions/explosion2/explosion2 (1).png');
    this.load.image('explosion2_2', 'assets/explosions/explosion2/explosion2 (2).png');
    this.load.image('explosion2_3', 'assets/explosions/explosion2/explosion2 (3).png');
    this.load.image('explosion2_4', 'assets/explosions/explosion2/explosion2 (4).png');
    this.load.image('explosion2_5', 'assets/explosions/explosion2/explosion2 (5).png');
    this.load.image('explosion2_6', 'assets/explosions/explosion2/explosion2 (6).png');
    this.load.image('explosion2_7', 'assets/explosions/explosion2/explosion2 (7).png');
    this.load.image('explosion2_8', 'assets/explosions/explosion2/explosion2 (8).png');
    this.load.image('explosion2_9', 'assets/explosions/explosion2/explosion2 (9).png');
    this.load.image('explosion2_10', 'assets/explosions/explosion2/explosion2 (10).png');


    this.load.image('explosion3_1', 'assets/explosions/explosion3/explosion3 (1).png');
    this.load.image('explosion3_2', 'assets/explosions/explosion3/explosion3 (2).png');
    this.load.image('explosion3_3', 'assets/explosions/explosion3/explosion3 (3).png');
    this.load.image('explosion3_4', 'assets/explosions/explosion3/explosion3 (4).png');
    this.load.image('explosion3_5', 'assets/explosions/explosion3/explosion3 (5).png');
    this.load.image('explosion3_6', 'assets/explosions/explosion3/explosion3 (6).png');
    this.load.image('explosion3_7', 'assets/explosions/explosion3/explosion3 (7).png');
    this.load.image('explosion3_8', 'assets/explosions/explosion3/explosion3 (8).png');
    this.load.image('explosion3_9', 'assets/explosions/explosion3/explosion3 (9).png');
    this.load.image('explosion3_10', 'assets/explosions/explosion3/explosion3 (10).png');
    this.load.image('explosion3_11', 'assets/explosions/explosion3/explosion3 (11).png');
    this.load.image('explosion3_12', 'assets/explosions/explosion3/explosion3 (12).png');
    this.load.image('explosion3_13', 'assets/explosions/explosion3/explosion3 (13).png');
    this.load.image('explosion3_14', 'assets/explosions/explosion3/explosion3 (14).png');
    this.load.image('explosion3_15', 'assets/explosions/explosion3/explosion3 (15).png');
    this.load.image('explosion3_16', 'assets/explosions/explosion3/explosion3 (16).png');
    this.load.image('explosion3_17', 'assets/explosions/explosion3/explosion3 (17).png');
    this.load.image('explosion3_18', 'assets/explosions/explosion3/explosion3 (18).png');
    this.load.image('explosion3_19', 'assets/explosions/explosion3/explosion3 (19).png');


}
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            //mio
            fps: 60,
            gravity: { y: 0 }
        }
    },
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let bullets;
let totalBullets = 50;
let level = 1;
let lives = 3;
let score = 0;
let ship;
let speed;
let stats;
let cursors;
let lastFired = 0;
let keyA;
let keyS;
let keyD;
let keyW;
let angle
let bulletCharge;
let powerups;
let text
let emitter
let bg
let stars
let asteroid1

let game = new Phaser.Game(config);

function preload() {
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

}


let grd;

function create() {

    bg = this.add.tileSprite(400, 300, 800, 600, 'background').setScrollFactor(0);
    stars = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);
    this.add.image(-730, 480, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6).setScale(2)

    this.anims.create({
        key: 'asteroid1_animation',
        frames: [
            { key: 'asteroid1_0' },
            { key: 'asteroid1_1' },
            { key: 'asteroid1_2' },
            { key: 'asteroid1_3' },
            { key: 'asteroid1_4' },
            { key: 'asteroid1_5' },
            { key: 'asteroid1_6' },
            { key: 'asteroid1_7' },
            { key: 'asteroid1_8' },
            { key: 'asteroid1_9' },
            { key: 'asteroid1_10' },
            { key: 'asteroid1_11' },
            { key: 'asteroid1_12' },
            { key: 'asteroid1_13' },
            { key: 'asteroid1_14' },
            { key: 'asteroid1_15' },
            { key: 'asteroid1_16' },
            { key: 'asteroid1_17' },
            { key: 'asteroid1_18' },
        ],
        frameRate: 16,
        repeat: -1
    });

    asteroid1 = this.physics.add.sprite(300, -20, 'asteroid1')
        .play('asteroid1_animation').setScale(0.2)


    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    //  Using the Scene Data Plugin we can store data on a Scene level
    this.data.set('lives', 3);
    this.data.set('level', 1);
    this.data.set('score', 0);
    this.data.set('Bullets', '0')

    text = this.add.text(50, 50, '', { font: '16px PressStart', fill: '#ffd900' });

    text.setText([
        'Level: ' + this.data.get('level'),
        'Lives: ' + this.data.get('lives'),
        'Score: ' + this.data.get('score'),
        'Bullets: ' + totalBullets
    ]);



    ship = this.physics.add.image(400, 300, 'ship');


    ship.setDamping(true);
    ship.setDrag(0.3);
    //nuevo
    ship.setAngularDrag(400);
    //
    ship.setMaxVelocity(300);

    ship.setDepth(15);

    bulletCharge = this.physics.add.sprite(200, 0, 'bullet_charge');

    bulletCharge.setScale(0.4);

    powerups = this.physics.add.group();
    powerups.add(bulletCharge, ship);

    this.physics.add.overlap(ship, bulletCharge, function () {
        bulletCharge.destroy();
        // aumenta en 10 el contador de balas
        totalBullets += 10;
        // actualiza el contador de balas en la pantalla
        text.setText([
            'Level: ' + level,
            'Lives: ' + lives,
            'Score: ' + score,
            'Bullets: ' + totalBullets
        ]);
    })

    var particles = this.add.particles('space');

    emitter = particles.createEmitter({
        frame: 'blue',
        speed: 100,
        lifespan: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 500;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value) {
                return Phaser.Math.Percent(ship.body.speed, 0, 1000);
            }
        },
        // Añado la posición de la nave como la posición de emisión
        x: ship.x,
        y: ship.y,
        angle: {
            onEmit: function (particle, key, t, value) {
                var v = Phaser.Math.Between(-10, 10);
                return (ship.angle - 180) + v;
            }
        },
        scale: { start: 0.6, end: 0 },
        blendMode: 'ADD'
    });


    var Bullet = new Phaser.Class({

        Extends: Phaser.Physics.Arcade.Image,

        initialize:

            function Bullet(scene) {
                //esto es lo mio
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(600, 1);

            },

        fire: function (x, y) {

            // Almacenar la rotación de la nave cuando se dispara la bala
            this.rotation = ship.rotation;

            // Establecer la posición inicial de la bala y hacerla visible y activa en el juego
            const xBullet = Math.sin(this.rotation) * 30;
            const yBullet = Math.cos(this.rotation) * 30;
            this.setPosition(x + xBullet, y - yBullet);
            this.setActive(true);
            this.setVisible(true);


        },

        update: function (time, delta) {

            // Calcular la velocidad en el eje x e y a partir de la rotación de la bala y la velocidad deseada
            const xVelocity = Math.sin(this.rotation) * this.speed;
            const yVelocity = Math.cos(this.rotation) * this.speed;

            // Actualizar la posición de la bala en función de la velocidad en el eje x e y
            this.y -= yVelocity * delta;
            this.x += xVelocity * delta;

            // Ocultar y desactivar la bala si sale de la pantalla
            if (this.y < -30 || this.y > 630 || this.x < -30 || this.x > 830) {
                this.setActive(false);
                this.setVisible(false);
            }


            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);

        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    console.log(bullets);

    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
    console.log(cursors);
}

function update(time, delta) {

    // if (asteroid1) {
    //     // actualiza la posición del sprite
    //     asteroid1.y += 2; // mueve el sprite 10 pixels hacia abajo en cada frame
    //     // si el sprite se sale de la pantalla, destrúyelo
    //     if (asteroid1.y > this.scale.height) {
    //         asteroid1.destroy();
    //         asteroid1 = null; // establece la variable en null para indicar que ya no existe
    //     }
    // }

    // else {
    //     // si el sprite no existe, crea uno nuevo con coordenadas x aleatorias
    //     asteroid1 = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), 0, 'asteroid1');
    // }

    if (asteroid1) {
        // actualiza la posición del sprite
        asteroid1.y += 1; // mueve el sprite 10 pixels hacia abajo en cada frame
        // si el sprite se sale de la pantalla, destrúyelo
        if (asteroid1.y > this.scale.height) {
            asteroid1.destroy();
            asteroid1 = null; // establece la variable en null para indicar que ya no existe
        }
    }
    else{
        this.anims.create({
            key: 'asteroid1_animation',
            frames: [
                { key: 'asteroid1_0' },
                { key: 'asteroid1_1' },
                { key: 'asteroid1_2' },
                { key: 'asteroid1_3' },
                { key: 'asteroid1_4' },
                { key: 'asteroid1_5' },
                { key: 'asteroid1_6' },
                { key: 'asteroid1_7' },
                { key: 'asteroid1_8' },
                { key: 'asteroid1_9' },
                { key: 'asteroid1_10' },
                { key: 'asteroid1_11' },
                { key: 'asteroid1_12' },
                { key: 'asteroid1_13' },
                { key: 'asteroid1_14' },
                { key: 'asteroid1_15' },
                { key: 'asteroid1_16' },
                { key: 'asteroid1_17' },
                { key: 'asteroid1_18' },
            ],
            frameRate: 16,
            repeat: -1
        });
    
        asteroid1 = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), 0, 'asteroid1')
            .play('asteroid1_animation').setScale(0.2)
    }



    // comprueba si el sprite 'bulletCharge' ha sido creado
    if (bulletCharge) {
        // actualiza la posición del sprite
        bulletCharge.y += 2; // mueve el sprite 10 pixels hacia abajo en cada frame
        // si el sprite se sale de la pantalla, destrúyelo
        if (bulletCharge.y > this.scale.height) {
            bulletCharge.destroy();
            bulletCharge = null; // establece la variable en null para indicar que ya no existe
        }
    }
    else {
        // si el sprite no existe, crea uno nuevo con coordenadas x aleatorias
        bulletCharge = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), 0, 'bullet_charge');
        bulletCharge.setScale(0.4);
        this.physics.add.overlap(ship, bulletCharge, function () {
            bulletCharge.destroy();
            // aumenta en 10 el contador de balas
            totalBullets += 10;
            // actualiza el contador de balas en la pantalla
            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);
        });
    }


    // Actualizo la posición de emisión en cada frame
    emitter.setPosition(ship.x, ship.y);

    let physics = this.physics

    if (keyW.isDown) {
        physics.velocityFromRotation(ship.rotation + 300, 500, ship.body.acceleration);
    }
    else {
        ship.setAcceleration(0);
    }

    if (keyA.isDown) {
        ship.setAngularVelocity(-300);
    }
    else if (keyD.isDown) {
        ship.setAngularVelocity(300);
    }
    else {
        ship.setAngularVelocity(0);
    }

    if (cursors.space.isDown && time > lastFired) {
        // Comprobar el número de balas disparadas
        if (totalBullets > 0) {
            // Crear una nueva bala y dispararla
            const bullet = bullets.get();
            if (bullet) {
                bullet.fire(ship.x, ship.y);
                lastFired = time + 100;
                totalBullets--; // Incrementar el contador de balas disparadas
            }
        } else {
            // Si se ha disparado el número máximo de balas permitido, deshabilitar el disparo
            lastFired = time + 100;
        }
    }

    bg.tilePositionY += 0.2
    stars.tilePositionY += 0.4
    this.physics.world.wrap(ship, 32);
}
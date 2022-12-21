var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
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

var game = new Phaser.Game(config);

function preload() {
    this.load.image('ship', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
}

function create() {

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);




    ship = this.physics.add.image(400, 300, 'ship');

    ship.setDamping(true);
    ship.setDrag(0.3);
    ship.setMaxVelocity(300);


    const x = this.scale.width * 0.5
    const y = this.scale.height * 0.5

    // // red rectangle
    // const rect = this.add.rectangle(x, y, 100, 50, 0xff0000, 1)


    // vector to edge of rectangle
    const vec = this.physics.velocityFromAngle(ship.angle - 90, 50)

    // draw a circle to show the position
    this.add.circle(ship.x + vec.x, ship.y + vec.y, 10, 0xffffff, 1)

    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

            function Bullet(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                this.speed = Phaser.Math.GetSpeed(600, 1);
            },

        fire: function (x, y) {
            angle = ship.rotation
            const xBullet = Math.sin(ship.rotation) * 30
            const yBullet = Math.cos(ship.rotation) * 30
            // console.log(Math.cos(ship.rotation));
            // console.log(ship.rotation);
            this.setPosition(x + xBullet, y - yBullet);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta) {
            const xBullet = Math.sin(angle)
            const yBullet = Math.cos(angle)
            console.log(xBullet);
            console.log(yBullet);
            this.y -= (this.speed * delta) * yBullet;
            this.x += (this.speed * delta) * xBullet;
            //   console.log(this.y);
            if (this.y < -30) {

                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 1000000000,
        runChildUpdate: true
    });
    console.log(bullets);





    cursors = this.input.keyboard.createCursorKeys();

    speed = Phaser.Math.GetSpeed(300, 1);
    console.log(cursors);
}

function update(time, delta) {

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
        var bullet = bullets.get();

        if (bullet) {
            bullet.rotation = ship.rotation;
            // Disparar la bala en la dirección que mira el navío
            bullet.fire(ship.x, ship.y);
            lastFired = time + 50;
        }
    }
    this.physics.world.wrap(ship, 32);
}
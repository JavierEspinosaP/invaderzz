function update(time, delta) {
    gravity = (time - startTime) / 100000


    if (Math.round(backgroundMusic1.seek) == 141) {
        this.plugins.get('rexsoundfadeplugin').fadeOut(backgroundMusic1, 10000);        
        backgroundMusic2.play();
        // Reproduce la pista de audio y desvanece su volumen al mismo tiempo
        this.plugins.get('rexsoundfadeplugin').fadeIn(backgroundMusic2, 10000, 0.5, 0);

    }
    if (Math.round(backgroundMusic2.seek) == 141) {
        backgroundMusic1.play();
        backgroundMusic1.setVolume(0.2);
        // Reproduce la pista de audio y desvanece su volumen al mismo tiempo
        this.plugins.get('rexsoundfadeplugin').fadeOut(backgroundMusic2, 10000);
        this.plugins.get('rexsoundfadeplugin').fadeIn(backgroundMusic1, 10000, 0.5, 0);

    }
    

    if (asteroid1) {
        // actualiza la posición del sprite
        asteroid1.y += (1 * (gravity + 0.3) * ((asteroid1.y / 15) + 21)) / 30 // mueve el sprite 10 pixels hacia abajo en cada frame
        // si el sprite se sale de la pantalla, destrúyelo
        emitter2.setLifespan(asteroid1.y / 2)
        emitter2.setAlpha((asteroid1.y / 3000));


        if (asteroid1.y > this.scale.height) {
            lives -= 1;

            this.anims.create({
                key: 'explosion1_animation',
                frames: [
                    { key: 'explosion1' },
                    { key: 'explosion2' },
                    { key: 'explosion3' },
                    { key: 'explosion4' },
                    { key: 'explosion5' },
                    { key: 'explosion6' },
                    { key: 'explosion7' },
                    { key: 'explosion8' },
                    { key: 'explosion9' },
                    { key: 'explosion10' },
                    { key: 'explosion11' },
                    { key: 'explosion12' },
                    { key: 'explosion13' },
                    { key: 'explosion14' },
                    { key: 'explosion15' },
                    { key: 'explosion16' },
                    { key: 'explosion17' },
                    { key: 'explosion18' },
                    { key: 'explosion19' },
                    { key: 'explosion20' },
                    { key: 'explosion21' },
                    { key: 'explosion22' },
                    { key: 'explosion23' },
                    { key: 'explosion24' },
                ],
                frameRate: 16,
                repeat: 0
            });
            explosion1 = this.physics.add.sprite(asteroid1.x, 550, 'explosion1')
                .play('explosion1_animation').setScale(0.5)
            setTimeout(function () {
                explosion1.destroy();
                explosion1 = null;
            }, 1500);

            asteroid1.destroy();
            asteroid1 = null; // establece la variable en null para indicar que ya no existe
            emitter2.stop();
            hits = 0;
            differenceHits = 0;
            text.setText([
                'Level: ' + level,
                'Lives: ' + lives,
                'Score: ' + score,
                'Bullets: ' + totalBullets
            ]);
        }
        if (lives == 0) {
            this.scene.pause();
        }

    }
    else {

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
        

        asteroid1 = this.physics.add.sprite(Phaser.Math.Between(30, this.scale.width - 30), -10, 'asteroid1')
            .play('asteroid1_animation').setScale(0.2)    
            
            
            let particles = this.add.particles('space');

            emitter2 = particles.createEmitter({
                frame: 'yellow',
                speed: 600,
                lifespan: {
                    onEmit: function (particle, key, t, value) {
                        return Phaser.Math.Percent(100, 0, 300) * 500;
                    }
                },
                alpha: {
                    onEmit: function (particle, key, t, value) {
                        return Phaser.Math.Percent(100, 0, 1000);
                    }
                },
                x: asteroid1.x,
                y: asteroid1.y,
                angle: {
                    onEmit: function (particle, key, t, value) {
                        var v = Phaser.Math.Between(-10, 10);
                        return (-90) + v;
                    }
                },
                scale: { start: 1, end: 0 },
                blendMode: 'ADD'
            });


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

    if (asteroid1) {
        emitter2.setPosition(asteroid1.x, asteroid1.y)
    }

    //Si hits se incrementa, se crea una explosion2


    if (hits != differenceHits) {

        if (asteroid1) {
            this.anims.create({
                key: 'explosion2_animation',
                frames: [
                    { key: 'explosion2_1' },
                    { key: 'explosion2_2' },
                    { key: 'explosion2_3' },
                    { key: 'explosion2_4' },
                    { key: 'explosion2_5' },
                    { key: 'explosion2_6' },
                    { key: 'explosion2_7' },
                    { key: 'explosion2_8' },
                    { key: 'explosion2_9' },
                    { key: 'explosion2_10' },
                ],
                frameRate: 16,
                repeat: 0
            });

            explosion2 = this.physics.add.sprite(asteroid1.x, asteroid1.y, 'explosion2')
                .play('explosion2_animation').setScale(0.1)
            setTimeout(function () {
                if (explosion2) {
                    explosion2.destroy();
                    explosion2 = null;
                }
            }, 1500);

            differenceHits += 1;

            if (hits == 0) {
                differenceHits = 0;
            }

            if (hits == 0) {
                this.anims.create({
                    key: 'explosion3_animation',
                    frames: [
                        { key: 'explosion3_1' },
                        { key: 'explosion3_2' },
                        { key: 'explosion3_3' },
                        { key: 'explosion3_4' },
                        { key: 'explosion3_5' },
                        { key: 'explosion3_6' },
                        { key: 'explosion3_7' },
                        { key: 'explosion3_8' },
                        { key: 'explosion3_9' },
                        { key: 'explosion3_10' },
                        { key: 'explosion3_11' },
                        { key: 'explosion3_12' },
                        { key: 'explosion3_13' },
                        { key: 'explosion3_14' },
                        { key: 'explosion3_15' },
                        { key: 'explosion3_16' },
                        { key: 'explosion3_17' },
                        { key: 'explosion3_18' },
                        { key: 'explosion3_19' }
                    ],
                    frameRate: 16,
                    repeat: 0
                });
            
                explosion3 = this.physics.add.sprite(asteroidDeathX, asteroidDeathY , 'explosion3_1')
                    .play('explosion3_animation').setScale(0.3)
                    setTimeout(function () {
                        explosion3.destroy();
                        explosion3 = null;
                    }, 1200);
            }
        }

    }

    let physics = this.physics

    if (shipUpSound.isPlaying) {
        isPlaying = true
    }
        
    else {
        isPlaying = false

    }
    
    if (ship.body.acceleration.x !== 0 || ship.body.acceleration.y !== 0) {
        shipAcceleration = true
    }
    else {
        shipAcceleration = false
    }

    let configShipUpSound = {
        seek: ship.body.speed/500
    }


    if (shipAcceleration === true && isPlaying === false) {
        shipUpSound.play(configShipUpSound)
    }
    if (shipAcceleration === true && shipUpSound.seek > 20) {
        shipUpSound.play({seek: 5})
    }
    if (keyW.isUp && shipAcceleration === false) {
        shipUpSound.stop()
    }

    setInterval(() => {
        if (ship.body.speed > 30) {
         shipSpeed = ship.body.speed   
        }
        else {
            shipSpeed = 0
        }
        
    }, 50);

    let configShipDownSound = {
        seek: 1/ship.body.speed*100
    }


    if (shipSpeed > ship.body.speed && shipDownSound.isPlaying === false) {
        shipDownSound.play(configShipDownSound)
      }

 
    if (keyW.isDown) {
        physics.velocityFromRotation(ship.rotation + 300, 500, ship.body.acceleration);
        shipDownSound.stop()
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

    if(keyW.isUp){
        
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
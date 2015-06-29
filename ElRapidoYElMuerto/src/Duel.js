
ElRapidoYElMuerto.Duel = function (game) {

    //this.rocketsBitmap;
    //this.rocketsLayer;

    //this.explosionsBitmap;
    //this.explosionsLayer;

    //this.missilesBitmap;
    //this.missilesLayer;

    //this.missileLauncher;
    //this.rocketLauncher;

    //this.land;
    //this.cities;

    // this.rocketSpeed = 10;
    // this.missileSpeed = 10000;
    // this.missileDelay = 10000;

    //this.silo1;
    //this.silo2;

    this.bmpTirador = null;
    this.bmpEnemigo = null;
    this.cursores = null;
    this.txtSegundos = null;
    this.txtHerida = null;    
    this.bang = null;
    this.cuentaAtras = null;
    this.sndDisparo = null;
    this.sndDisparoFallado = null;
    this.sndCajaMusica = null;
    this.dueloIniciado = false;
    this.btEmpezar = null;
    this.dif = null;
};

ElRapidoYElMuerto.Duel.prototype = {

    create: function () {
        this.dueloIniciado = false;
        /*Reproducimos el sonido de la caja de musica en loop*/
	    this.sndCajaMusica = this.add.audio('cajamusica',1,true);
	    this.sndCajaMusica.play();

	    this.add.image(0, 0, 'duelpage');
    
        // Cargo el sonido del disparo y del disparo fallado
	    this.sndDisparo = this.add.audio('disparo');
	    this.sndDisparoFallado = this.add.audio('disparofallado');

        /*Cargo los botones*/
        /*Boton de partida nueva*/
	    this.btEmpezar = this.add.button(10, 80, 'reloj', this.empezar, this, 2, 1, 0);
	    this.btEmpezar.input.useHandCursor = true;

        // Estos rands me daran numeros aleatorios para colocar la bmpTirador 
	    var randx = null;
	    var randy = null;
	    var randTam = null;
	    this.dif = ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo].dificultad + ElRapidoYElMuerto.enemigo.dificultad;

        // Añado los sprites del bmpEnemigo y la bmpTirador
	    randx = this.rnd.realInRange(0, this.game.width);
	    randy = this.rnd.realInRange(0, this.game.height);
        //Ajusto la posicion del enemigo para que no se salga de la zona de duelo
	    if (randy < 210) { randy = 210; }
	    if (randy > 390) { randy = 390; }
	    if (randx < 210) { randx = 210; }
	    if (randx > 460) { randx = 460; }
	    this.bmpEnemigo = this.add.sprite(randx, randy, 'enemigo');
	    randx = this.rnd.realInRange(0, this.game.width);
	    randy = this.rnd.realInRange(0, this.game.height);
	    this.bmpTirador = this.add.sprite(randx, randy, 'mirilla');
	    this.physics.enable(this.bmpTirador, Phaser.Physics.ARCADE);

        //Escalo el enemigo aaleatoriamente para simular la distancia a la que se encuentra
	    randTam = this.rnd.realInRange(1, 4);
	    this.bmpEnemigo.scale.set(randTam);
	    this.bmpEnemigo.smoothed = false;
        // Animo al tirador
	    this.bmpEnemigo.animations.add('respirar', [0, 1, 2, 3, 4, 5], 3, true);
	    this.bmpEnemigo.play('respirar');

        // Escalo la mirilla dependiendo de lo FEO que sea el pistolero
	    this.bmpTirador.scale.setTo(ElRapidoYElMuerto.tirador.feo, ElRapidoYElMuerto.tirador.feo);
        //ElRapidoYElMuerto.tirador.tam = (this.bmpTirador.width / 2);

        //Calculo la velocidad dependiendo de lo BUENO que sea el pistolero
	    ElRapidoYElMuerto.tirador.vel = ElRapidoYElMuerto.tirador.vel * ElRapidoYElMuerto.tirador.bueno;

        //Creo las fisicas del tirador para localizarlo
        //this.physics.p2.enable(this.bmpTirador);
        //this.physics.p2.enable(this.bmpEnemigo);
        //this.bmpTirador.body.setCircle(32);

	    this.txtSegundos = this.add.text(80, 80, "");
        //Lo convierto en texto del oeste
	    textoOeste(this.txtSegundos, 60, false, true);

        //text = this.game.add.text(20, 20, 'move with arrow keys', { fill: '#ffffff' });

	    this.cursores = this.input.keyboard.createCursorKeys();
	    this.bang = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    this.bang.onDown.add(this.shoot, this);

	},

	update: function () {
	    //Esto hace que el sprite de la bmpTirador no salga disparado 
	    //this.bmpTirador.body.setZeroVelocity();

	    //if (this.cursores.left.isDown) {
	    //    if (this.bmpTirador.body.x > ElRapidoYElMuerto.tirador.tam) {
	    //        this.bmpTirador.body.moveLeft(ElRapidoYElMuerto.tirador.vel);
	    //    }
	    //}
	    //else if (this.cursores.right.isDown) {
	    //    if (this.bmpTirador.body.x<(640-16)){
	    //        this.bmpTirador.body.moveRight(ElRapidoYElMuerto.tirador.vel);
	    //    }
	    //}

	    //if (this.cursores.up.isDown) {
	    //    if (this.bmpTirador.body.y > ElRapidoYElMuerto.tirador.tam) {
	    //        this.bmpTirador.body.moveUp(ElRapidoYElMuerto.tirador.vel);
	    //    }
	    //}
	    //else if (this.cursores.down.isDown) {
        //    if (this.bmpTirador.body.y<(480-16)){
        //        this.bmpTirador.body.moveDown(ElRapidoYElMuerto.tirador.vel);
	    //    }
	    //}
	    if (this.dueloIniciado) {
	        //  only move when you click
	        if (this.input.mousePointer.isDown) {
	            this.bmpTirador.body.velocity.setTo(0, 0);
	            this.shoot();
	        }
	        else {
	            //  400 is the speed it will move towards the mouse
	            this.physics.arcade.moveToPointer(this.bmpTirador, 100);

	            //  if it's overlapping the mouse, don't move any more
	            if (Phaser.Rectangle.contains(this.bmpTirador.body, this.input.x, this.input.y)) {
	                this.bmpTirador.body.velocity.setTo(0, 0);
	            }
	        }
	    }
	},

	render: function () {
	    if (this.dueloIniciado) {
	        this.txtSegundos.text = "" + milToSec(this.cuentaAtras.duration);
	    }
	    //this.txtSegundos.text = "" + Math.round(this.cuentaAtras.duration);
	    //this.game.debug.text("Time until shot: " + Math.round(this.cuentaAtras.duration), 32, 32);
	   // this.game.debug.text("x->" + this.bmpTirador.getBounds().x + " y->" + this.bmpTirador.getBounds().y, 32, 32);
	},

	empezar: function () {
		this.sndCajaMusica.stop();
	    //Añado un tiempo aleatorio dependiendo de lo MALO que sea el pistolero para calcular el tiempo que queda hasta el final del duelo
	    var randTime = this.rnd.realInRange(0, 10) + (ElRapidoYElMuerto.tirador.malo - this.dif);

	    //Creamos un temporizador
	    this.cuentaAtras = this.time.create(true);

	    //Indicamos el tiempo aleatorio que va a durar
	    var tiempo = Phaser.Timer.SECOND * randTime;
	    this.cuentaAtras.loop(tiempo, this.finCuentaAtras, this);

	    this.txtSegundos.text = "" + milToSec(tiempo);
	    //Iniciamos el temporizador
	    this.cuentaAtras.start();
	    this.dueloIniciado = true;
	},

	shoot: function () {
	    this.sndCajaMusica.stop();
        this.cuentaAtras.pause();
        if (this.chequearDisparo(this.bmpTirador, this.bmpEnemigo)) {
            this.sndDisparo.play();
            this.hasVencido();
        }
        else {
            this.sndDisparoFallado.play();
            this.hasMuerto();
        }
        this.cuentaAtras.resume();
    },

    chequearDisparo: function() {
        var limitesTirador = this.bmpTirador.getBounds();
        var limitesEnemigo = this.bmpEnemigo.getBounds();
        var distX = limitesTirador.x - limitesEnemigo.x;
        var distY = limitesTirador.y - limitesEnemigo.y;

        if ((distX>0)&&(distX<limitesEnemigo.width))
        {
            if((distY>0)&&(distY<limitesEnemigo.height)) {
                //alert("Balazo en x->" + distX + " y->" + distY);
                return true;
            }
        }
        return false;
    },

    finCuentaAtras: function(){
        this.hasMuerto();
    },

    hasMuerto: function () {
        this.sndCajaMusica.stop();
        this.state.start('Dead');
    },

    hasVencido: function () {
        this.sndCajaMusica.stop();
		this.state.start('Win');
	}
};

function milToSec(num) {
    return Math.round((num/1000));
}

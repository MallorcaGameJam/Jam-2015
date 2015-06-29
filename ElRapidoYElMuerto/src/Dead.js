
ElRapidoYElMuerto.Dead  = function (game) {

	this.music = null;
	this.button = null;

};

ElRapidoYElMuerto.Dead.prototype = {

	create: function () {
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        /*Añado el fondo de pantalla*/
		this.add.sprite(0, 0, 'deadpage');

        /*Añado un titulo*/
		var txtTitle = this.add.text(this.world.centerX, this.world.centerY-100, "Hoy has sido el muerto...", { align: "center" });
	    //Lo convierto en texto del oeste
		textoOeste(txtTitle, 30, true, true);

		var txtDead = this.add.text(this.world.centerX, this.world.centerY-20, ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo].txtVida, { align: "center" });
	    //Lo convierto en texto del oeste
		textoOeste(txtDead, 18);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
	    /*Sprites boton parametros posX, posY,imagen,funcion,Over,Normal,Click*/
		this.btComenzar = this.add.button(this.world.centerX - 100, 360, 'button', this.Menu, this, 0, 1, 2);
		this.btComenzar.input.useHandCursor = true;


	    /*Añado los textos de los botones*/
		var txtBtComenzar = this.add.text(this.world.centerX, 400, "INICIO");
		textoOeste(txtBtComenzar, 18,false,true);
	},

	update: function () {

	},

	Menu: function (pointer) {

        /*Detengo la musica*/
		// this.music.stop();
		/*Vuelvo a la pantalla principal*/
		this.state.start('MainMenu');

	},

    render: function (pointer){
        this.game.debug.text("", 32, 32);
    }

};

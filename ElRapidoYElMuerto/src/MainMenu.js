
ElRapidoYElMuerto.MainMenu = function (game) {

	this.music = null;
	this.btSeleccionar = null;
	this.btPuntuaciones = null;

};

ElRapidoYElMuerto.MainMenu.prototype = {

	create: function () {
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        /*Añado el fondo de pantalla*/
		this.add.sprite(0, 0, 'titlepage');

        /*Añado un titulo*/
		var txtTitle = this.add.text(this.world.centerX, 80, "El rapido y el muerto");
        //Lo convierto en texto del oeste
		textoOeste(txtTitle, 50,true,true);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
        /*Sprites boton parametros posX, posY,imagen,funcion,Over,Normal,Click*/
		this.btSeleccionar = this.add.button(this.world.centerX - 200, 340, 'button', this.comenzar, this, 0, 1, 2);
		this.btSeleccionar.input.useHandCursor = true;
	    /*Boton de mejores puntuaciones*/
		this.btPuntuaciones = this.add.button(this.world.centerX, 340, 'button', this.verPuntuaciones, this, 0, 1, 2);
		this.btPuntuaciones.input.useHandCursor = true;

	    /*Añado los textos de los botones*/
		var txtBtSeleccionar = this.add.text(this.world.centerX-110, 380, "COMENZAR");
		textoOeste(txtBtSeleccionar, 18,false,true);
		var txtBtPuntuaciones = this.add.text(this.world.centerX+95, 380, "COMO JUGAR");
		textoOeste(txtBtPuntuaciones, 18,false,true);
	},

	update: function () {

	},

	comenzar: function (pointer) {

        /*Detengo la musica*/
	    // this.music.stop();
	    ElRapidoYElMuerto.tirador.numTirador = 0;
	    ElRapidoYElMuerto.enemigo.numEnemigo = 0;
	    ElRapidoYElMuerto.enemigo.dificultad = 0;
		/*Inicio el juego*/
		this.state.start('Select');

	},

	verPuntuaciones: function (pointer) {

	    /*Detengo la musica*/
	    // this.music.stop();
	    /*Inicio el juego*/
	    this.state.start('Points');

	},

    render: function (pointer){
        this.game.debug.text("", 32, 32);
    }

};

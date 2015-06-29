
ElRapidoYElMuerto.PreDuel = function (game) {
	this.music = null;
	this.btComenzar = null;
	this.bmpEnemigo = null;
};

ElRapidoYElMuerto.PreDuel.prototype = {

	create: function () {
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();
        /*Reinicio al pistolero elegido*/

        /*Añado el fondo de pantalla*/
		this.add.sprite(0, 0, 'selectpage');

	    /*Añado un titulo*/
		var txtTitle = this.add.text(this.world.centerX, 80, "ESTE ES TU ADVERSARIO");
	    //Lo convierto en texto del oeste
		textoOeste(txtTitle, 30, true,true);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
	    /*Sprites boton parametros posX, posY,imagen,funcion,Over,Normal,Click*/
		this.btComenzar = this.add.button(this.world.centerX-100, 360, 'button', this.startGame, this, 0, 1, 2);
		this.btComenzar.input.useHandCursor = true;
	    
        /*Cargo el enemigo actual*/
		this.dataEnemigo = ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo];

	    /*Cargo la imagen del enemigo elegido*/
		this.bmpEnemigo = this.add.sprite(this.world.centerX + 40, 120, this.dataEnemigo.img);

        /*Cargo el texto de presentacion del enemigo*/
		var txtPresentacion = this.add.text(this.world.centerX - 140, 240, this.dataEnemigo.txtHistoria);
		textoOeste(txtPresentacion, 18);

	    /*Añado los textos de los botones*/
		var txtBtComenzar = this.add.text(this.world.centerX, 400, "IR AL DUELO");
		textoOeste(txtBtComenzar, 18,false,true);
	},

	update: function () {

	},

	

	startGame: function (pointer) {
        /*Detengo la musica*/
	    // this.music.stop();     
	    /*Inicio el duelo*/
		this.state.start('Duel');

	},

    render: function (pointer){
        //this.game.debug.text("", 32, 32);
    }

};


ElRapidoYElMuerto.Win  = function (game) {

	this.music = null;
	this.btContinuar = null;
    this.btAbandonar = null
};

ElRapidoYElMuerto.Win.prototype = {

    create: function () {
        //El usuario recibe el dinero y la fama del enemigo abatido
        ElRapidoYElMuerto.tirador.dinero = ElRapidoYElMuerto.tirador.dinero + ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo].dinero;
        ElRapidoYElMuerto.tirador.fama = ElRapidoYElMuerto.tirador.fama + ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo].fama;
        
        /*Añado la musica*/
		// this.music = this.add.audio('titleMusic');
		// this.music.play();

        /*Añado el fondo de pantalla*/
	    this.add.sprite(0, 0, 'winpage');

        /*Añado un titulo*/
	    var txtTitle = this.add.text(this.world.centerX, this.world.centerY - 100, "Hoy has sido el rapido!", { align: "center" });
	    //Lo convierto en texto del oeste
	    textoOeste(txtTitle, 30, true, true);

	    var txtTmp = ElRapidoYElMuerto.enemigos[ElRapidoYElMuerto.enemigo.numEnemigo].txtMuerte + "\nTienes " + 
            ElRapidoYElMuerto.tirador.dinero + "$ y " +
            ElRapidoYElMuerto.tirador.fama + " fama" 
	    var txtWin = this.add.text(this.world.centerX, this.world.centerY - 20, txtTmp, { align: "center" });
	    //Lo convierto en texto del oeste
	    textoOeste(txtWin, 18);

	    /*Cargo los botones*/
	    /*Boton de partida nueva*/
		this.btContinuar = this.add.button(this.world.centerX - 200, 340, 'button', this.continuar, this, 2, 1, 0);
		this.btContinuar.input.useHandCursor = true;
	    /*Boton de mejores puntuaciones*/
		this.btAbandonar = this.add.button(this.world.centerX, 340, 'button', this.abandonar, this, 2, 1, 0);
		this.btAbandonar.input.useHandCursor = true;

	    /*Añado los textos de los botones*/
		var txtBtcomenzar = this.add.text(this.world.centerX - 110, 380, "CONTINUAR");
		textoOeste(txtBtcomenzar, 18,false,true);
		var txtBtcomenzar = this.add.text(this.world.centerX + 95, 380, "ABANDONAR");
		textoOeste(txtBtcomenzar, 18,false,true);
	},

	update: function () {

	},

	continuar: function (pointer) {
        //Cargo el siguiente pistolero
	    ElRapidoYElMuerto.enemigo.numEnemigo++;
	    if (ElRapidoYElMuerto.enemigo.numEnemigo > ElRapidoYElMuerto.enemigos.length - 1) {
	        ElRapidoYElMuerto.enemigo.numEnemigo = 0;
	        ElRapidoYElMuerto.enemigo.dificultad++;
	    }
        /*Detengo la musica*/
	    // this.music.stop();
        
		/*Vuelvo a la pantalla de seleccion*/
		this.state.start('PreDuel');

	},

	abandonar: function (pointer) {

	    /*Detengo la musica*/
	    // this.music.stop();
	    /*Vuelvo a la pantalla principal*/
	    this.state.start('MainMenu');

	},

    render: function (pointer){
        this.game.debug.text("", 32, 32);
    }

};

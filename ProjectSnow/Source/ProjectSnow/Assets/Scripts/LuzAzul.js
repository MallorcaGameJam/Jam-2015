#pragma strict
@script RequireComponent(AudioSource)
var MaterialDefault:Material;
var MaterialLuz01:Material;
var Bola:GameObject;
var Plataforma01:GameObject;
var Audio:AudioSource;
function Start(){
	Bola = GameObject.Find("Ball");
	Plataforma01 = gameObject;
	Audio = GetComponent.<AudioSource>();
}
function OnCollisionEnter(collision : Collision){
	if (collision.gameObject == Bola){
		Plataforma01.GetComponent.<Renderer>().material = MaterialLuz01;
		Audio.Play();
	}
}
function OnCollisionExit(collision : Collision){
	if (collision.gameObject == Bola){
		Plataforma01.GetComponent.<Renderer>().material = MaterialDefault;
	}
}
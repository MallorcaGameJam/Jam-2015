#pragma strict
@script RequireComponent(AudioSource)
var MaterialRojo01:Material;
var MaterialBolaRojo:Material;
var BolaLuz:GameObject;
var Bola:GameObject;
var Plataforma01:GameObject;
var Audio:AudioSource;
function Start(){
	Bola = GameObject.Find("Ball");
	BolaLuz = GameObject.Find("Sphere.001");
	Plataforma01 = gameObject;
	Audio = GetComponent.<AudioSource>();
}
function OnCollisionEnter(collision : Collision){
	if (collision.gameObject == Bola){
		Plataforma01.GetComponent.<Renderer>().material = MaterialRojo01;
		BolaLuz.GetComponent.<Renderer>().material = MaterialBolaRojo;
		Audio.Play();
	}
}
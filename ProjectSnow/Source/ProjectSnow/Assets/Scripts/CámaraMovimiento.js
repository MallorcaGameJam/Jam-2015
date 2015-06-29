#pragma strict

var Personaje:Transform;
var y:float;
var z:float;
function Start(){
	y = Personaje.position.y - transform.position.y;
	z = Personaje.position.z - transform.position.z;
}

function FixedUpdate () {
	//transform.LookAt(Vector3( Personaje.position.x, Personaje.position.y, Personaje.position.z));
	transform.position.x = Personaje.position.x;
	transform.position.y = Personaje.position.y - y;
	transform.position.z = Personaje.position.z - z;
}
#pragma strict
var PlatformRigid:Rigidbody;
var Velocidad:Vector3;
var VelocidadMax:float;
function Start () {
	PlatformRigid.maxAngularVelocity = VelocidadMax;
}

function FixedUpdate () {
	Velocidad = PlatformRigid.angularVelocity;
	PlatformRigid.maxAngularVelocity = VelocidadMax;
	PlatformRigid.AddTorque (Vector3.down * 10000);
}
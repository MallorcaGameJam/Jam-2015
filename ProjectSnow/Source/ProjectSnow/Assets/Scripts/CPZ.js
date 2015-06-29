#pragma strict
var PlatformRigid:Rigidbody;
var Velocidad:Vector3;
var VelocidadMax:float;
function Start () {
	PlatformRigid.maxAngularVelocity = VelocidadMax;
}

function FixedUpdate () {
	PlatformRigid.maxAngularVelocity = VelocidadMax;
	Velocidad = PlatformRigid.angularVelocity;
	PlatformRigid.AddTorque (Vector3.forward * 10000);
}
#pragma strict

var torque: float;
var Rigid: Rigidbody;
var Velocidad:Vector3;
private var Z01:Vector3 = Vector3( 0, 0, 1);
private var Z02:Vector3 = Vector3( 0, 0, -1);
private var X01:Vector3 = Vector3( 1, 0, 0);
private var X02:Vector3 = Vector3( -1, 0, 0);
function Start() {
	Rigid.maxAngularVelocity = 11;
}
function FixedUpdate() {
	Velocidad = Rigid.angularVelocity;

	if (Input.GetKey(KeyCode.A)){
		Rigid.AddTorque(Z01 * torque);
	}
	if (Input.GetKey(KeyCode.D)){
		Rigid.AddTorque(Z02 * torque);
	}
	if (Input.GetKey(KeyCode.W)){
		Rigid.AddTorque(X01 * torque);
	}
	if (Input.GetKey(KeyCode.S)){
		Rigid.AddTorque(X02 * torque);
	}
}
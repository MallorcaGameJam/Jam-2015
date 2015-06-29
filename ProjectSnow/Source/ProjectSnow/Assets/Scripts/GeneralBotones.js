#pragma strict
function Update () {
	if (Input.GetKey(KeyCode.R)){
		Application.LoadLevel(0);
	}
	if (Input.GetKey(KeyCode.Escape)){
		Application.Quit();
	}
}
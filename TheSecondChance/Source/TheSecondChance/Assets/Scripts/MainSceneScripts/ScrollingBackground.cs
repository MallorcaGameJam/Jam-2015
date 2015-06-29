using UnityEngine;
using System.Collections;

public class ScrollingBackground : MonoBehaviour {

	public Vector3 Direction=Vector3.left;
	public float Speed = 5f;

	public float MinRange = 2f; 
	public float MaxRange = 6f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		updatePosition (Time.deltaTime);
	}
	void updatePosition(float deltaTime)
	{
		Vector3 newPos = Direction * deltaTime * Speed;
		newPos += transform.position;
		var cameraHalfWidth = Camera.main.orthographicSize * ( (float) Screen.width / Screen.height );
		if (transform.position.x < -cameraHalfWidth) 
		{
			newPos.x = cameraHalfWidth * 3f;
		}
		transform.position = newPos;

	}
}

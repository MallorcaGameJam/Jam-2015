using UnityEngine;
using System.Collections;

public class MarioStyleCameraFollow : MonoBehaviour {

	private Vector2 _velocity;

	public BoxCollider2D BackgroundBounds;
	public Vector2 Smoothing;
	public GameObject Player;

	private Vector3 _min;
	private Vector3 _max;
	// Use this for initialization
	void Awake () 
	{
		if (Player == null)
		{
			Player = GameObject.FindGameObjectWithTag("Player");
		}
		_min = BackgroundBounds.bounds.min;
		_max = BackgroundBounds.bounds.max;
	}

	void FixedUpdate()
	{

		transform.position = figureNewPosition ();
		
	} 
	
	// Update is called once per frame
	void Update () {
	
	}

	Vector3 figureNewPosition()
	{
		float posX = Mathf.SmoothDamp(transform.position.x, Player.transform.position.x, ref _velocity.x, Smoothing.x * Time.deltaTime);
		float posY = Mathf.SmoothDamp(transform.position.y, Player.transform.position.y, ref _velocity.y, Smoothing.y * Time.deltaTime);

		var cameraHalfWidth = Camera.main.orthographicSize * ( (float) Screen.width / Screen.height );
		posX = Mathf.Clamp (posX, _min.x + cameraHalfWidth, _max.x - cameraHalfWidth);
		posY = Mathf.Clamp(posY, _min.y + Camera.main.orthographicSize, _max.y - Camera.main.orthographicSize);

		return new Vector3(posX, posY, transform.position.z);
	}
}

using UnityEngine;
using System.Collections;

public class SinObstacle : MonoBehaviour {

	public float damageAmount=5.0f;

	private Rigidbody2D _rb2d;
	private GameObject lastCollidedObject=null;
	private float _totalTime;
	private float _lastCollisionTime;

	// Use this for initialization
	void Awake () {
		_rb2d = gameObject.GetComponent<Rigidbody2D> ();
		_lastCollisionTime = 0f;
	}
	
	// Update is called once per frame
	void Update () {
		_totalTime += Time.deltaTime;
	}
	void OnTriggerEnter2D(Collider2D other) 
	{
		GameObject gObj = other.gameObject;
		if (gObj.tag == "Player") 
		{
			//if((_totalTime-_lastCollisionTime)>5f)
			//{
				lastCollidedObject=gObj;
				_lastCollisionTime = _totalTime;
				PlayerController controller = gObj.GetComponent<PlayerController> ();
				Debug.Log("Damage "+ damageAmount );
				controller.TakeDamage (damageAmount);
			//}
		}
		else if (gObj.tag == "Obstacle") 
		{
			//Hacer que suba o baje
			Vector3 oldVelocity = _rb2d.velocity;
			_rb2d.velocity=Vector3.zero;
			Vector3 newPos=transform.position+Vector3.up;
			transform.position=newPos;
			_rb2d.velocity=oldVelocity;

			Rigidbody2D gObjRb2d=gObj.GetComponent<Rigidbody2D>();
			gObjRb2d.velocity=Vector3.zero;
			gObj.transform.position = -newPos;
			gObjRb2d.velocity=oldVelocity;
		}
	}
}

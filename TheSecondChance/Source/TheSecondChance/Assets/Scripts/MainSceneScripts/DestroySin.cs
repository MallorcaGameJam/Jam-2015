using UnityEngine;
using System.Collections;

public class DestroySin : MonoBehaviour {

	/*
	// Use this for initialization
	void Start () {
	
	}
	*/

	void OnTriggerEnter2D(Collider2D other) 
	{
		if (other.gameObject.tag == "Obstacle") 
		{
			//Destroy (other.gameObject);
			other.gameObject.SetActive(false);
		}
	}

	/*
	// Update is called once per frame
	void Update () {
	
	}
	*/
}

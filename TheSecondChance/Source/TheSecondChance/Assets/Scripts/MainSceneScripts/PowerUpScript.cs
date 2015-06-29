using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PowerUpScript : MonoBehaviour {


	//public HudPanel;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnTriggerEnter2D(Collider2D other) 
	{
		GameObject gObj = other.gameObject;
		if (gObj.tag == "Player") 
		{
			PlayerController controller = gObj.GetComponent<PlayerController> ();
			controller.Score += 10f;
			gameObject.SetActive(false);
		}
	}
}

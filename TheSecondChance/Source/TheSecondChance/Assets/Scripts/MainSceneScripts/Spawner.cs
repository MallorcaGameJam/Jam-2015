using UnityEngine;
using System.Collections;

public class Spawner : MonoBehaviour {

	public GameObject[] SampleList;
	public float MinY = -3f;
	public float MaxY = 3f; 
	public float MinRange = 1f; 
	public float MaxRange = 3f;
	public float Speed = 12f;
	public Vector3 SpawnDirection = Vector3.left;
	public float SpawnSpeed=5f;
	private float _totalTime = 0f;
	private float _lastSpawnTime = 0f;
	private Rigidbody2D _rb2d;
	private Vector3 _velocity=Vector3.up;
	private bool _isSpawning;

	private ObjectPuller _puller;

	public bool IsSpawning {
		get{return _isSpawning;}
		set
		{
			_isSpawning=value;
			_lastSpawnTime = _totalTime;
			if(!_isSpawning)
			{
				_puller.KillAll();
			}
		}
	}

	// Use this for initialization
	void Awake () {
		_rb2d = gameObject.GetComponent<Rigidbody2D> ();
		_rb2d.velocity = _velocity * Speed;
		_puller = new ObjectPuller ()
		{
			MinListLength = 2 * SampleList.Length,
			SampleList = this.SampleList
		};
		_puller.PopulatePullList ();
	}
	
	// Update is called once per frame
	void Update () 
	{
		updatePosition ();
		_totalTime += Time.deltaTime;
		if (isSpwanTime () && IsSpawning) 
		{
			spawn();
		}

	}
	void updatePosition()
	{
		if(transform.position.y > MaxY||transform.position.y < MinY)
		{
			_velocity *=-1;
			_rb2d.velocity=Vector3.zero;
			Vector3 newPos=transform.position;
			float myY=Mathf.Clamp(transform.position.y,MinY,MaxY);
			newPos.y = myY;
			transform.position = newPos;
			_rb2d.velocity=_velocity*Speed;
		}
	}
	bool isSpwanTime()
	{
		bool b = false;
		//Decicir random
		float randFloat=Random.Range (MinRange, MaxRange);
		if ((_totalTime - _lastSpawnTime) > randFloat) 
		{
			_lastSpawnTime=_totalTime;
			spawn();
		}
		return b;
	}
	void spawn()
	{
		_puller.Spawn(transform.position, SpawnDirection * SpawnSpeed);

		/*
		if (SampleList.Length > 0) 
		{
			//spawn logic
			int randInt=(int)Random.Range(0, SampleList.Length);
			GameObject gObj = Instantiate(SampleList[randInt]);
			gObj.transform.position=transform.position+(SpawnDirection);
			Rigidbody2D rb2d = gObj.GetComponent<Rigidbody2D>();
			rb2d.velocity=(SpawnDirection * SpawnSpeed);

			//Falta el box collider como trigger en el item

		}
		*/
	}

}

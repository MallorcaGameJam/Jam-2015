using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LevelManager : MonoBehaviour {

	public Spawner GodSpawner;
	public GameObject GodImage;
	public Spawner SatanSpawner;
	public GameObject SatanImage;
	public float MinSwitchTime = 4f;
	public float MaxSwitchTime = 10f;
	private bool _isSatan = false;
	public Spawner PowerUpSpawner;
	private Randomizer _randomizer; 
	// Use this for initialization
	void Awake () 
	{
		ToggleObstacleSpawner ();
		CreateRandomizer ();
	}
	private void CreateRandomizer()
	{
		if (_randomizer == null) {
			_randomizer = new Randomizer ()
			{
				MinRange = MinSwitchTime,
				MaxRange = MaxSwitchTime,
				TotalTime = 0f,
				LastTime = 0f
			};
		}
	}
	// Update is called once per frame
	void Update () 
	{
		if (_randomizer == null) 
		{
			CreateRandomizer();
		}
		_randomizer.TotalTime += Time.deltaTime;
		if (isSpwanTime ()) 
		{
			ToggleObstacleSpawner();
		}
	}

	public bool isSpwanTime()
	{
		return _randomizer.isTime ();
	}

	public void ToggleObstacleSpawner()
	{

		_isSatan = !_isSatan;

		if (_isSatan) 
		{
			SatanImage.SetActive(_isSatan);
			SatanSpawner.IsSpawning=_isSatan;

			GodImage.SetActive(!_isSatan);
			GodSpawner.IsSpawning=!_isSatan;
		} 
		else 
		{
			GodImage.SetActive(!_isSatan);
			GodSpawner.IsSpawning = !_isSatan;

			SatanImage.SetActive(_isSatan);
			SatanSpawner.IsSpawning = _isSatan;

		}

	}

}

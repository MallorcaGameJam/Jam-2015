using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ObjectPuller{

	public GameObject[] SampleList {
		get;
		set;
	}
	private List<GameObject> _pullList;

	private float _minListLength;
	public float MinListLength {
		get{return _minListLength;}
		set{_minListLength=value;}
	}
	public ObjectPuller()
	{
		_pullList = new List<GameObject> ();
	}


	public void PopulatePullList()
	{
		for (int i = 0; i < MinListLength; i++) 
		{
			setRandObjFromSampleList();
		}
	}
	void setRandObjFromSampleList()
	{
		int next=getNextInt();
		_pullList.Add(GameObject.Instantiate(SampleList[next]));
		_pullList [_pullList.Count - 1].SetActive (false);

	}
	int getNextInt()
	{
		return Random.Range (0, SampleList.Length - 1);
	}
	public void Spawn(Vector3 position, Vector3 velocity)
	{
		bool found = false;
		int count = 0;
		while (!found && count<_pullList.Count) 
		{
			if(!_pullList[count].activeInHierarchy)
			{
				found = true;
				_pullList[count].SetActive(true);
				_pullList[count].transform.position=position;
				Rigidbody2D rb2d = _pullList[count].GetComponent<Rigidbody2D>();
				rb2d.velocity=velocity;
			}
			count ++;
		}
		if(count==_pullList.Count-1)
		{
			setRandObjFromSampleList();
		}
	}
	public void KillAll()
	{
		for (int i = 0; i < _pullList.Count; i++) 
		{
			if(_pullList[i].gameObject.activeInHierarchy)
			{
				_pullList[i].gameObject.SetActive(false);
			}
		}
	}
}

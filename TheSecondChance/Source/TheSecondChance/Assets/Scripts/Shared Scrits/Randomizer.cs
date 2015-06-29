using UnityEngine;
using System.Collections;

public class Randomizer {

	public float MinRange {
		get;
		set;
	}
	public float MaxRange {
		get;
		set;
	}
	public float TotalTime {
		get;
		set;
	}
	public float LastTime {
		get;
		set;
	}

	public bool isTime()
	{
		bool b = false;
		//Decicir random
		float randFloat=Random.Range (MinRange, MaxRange);

		if ((TotalTime - LastTime) > randFloat) 
		{
			LastTime=TotalTime;
			b=true;
		}
		return b;
	}

}

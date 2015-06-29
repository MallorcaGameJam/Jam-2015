using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class PlayerController : MonoBehaviour {

	public Slider lifeSlider;
	public Text ScoreNumberText;
	public float ScorePerSecond = 5f;
	public float life = 100f;
	public float HopSpeed = 10f;
	public float DeathHopSpeed = 10f;
	private float currentLife;
	private SpriteRenderer _renderer;
	private float _score;
	private Rigidbody2D _rb2d;
	private Animator _anim;

	bool _isDead;
	public bool IsDead {
		get{return _isDead;}
		private set
		{
			_isDead=value;
			Life=0;
		}
	}
	public Vector3 HopForce
	{
		get
		{
			return Vector3.up * HopSpeed;
		}
	}
	public float Score {
		get
		{
			return _score;
		}
		set
		{
			_score=value;

			ScoreNumberText.text=""+(int)_score;
			PlayerPrefs.SetInt("Score",(int)_score);
		}
	}
	private float _life;
	public float Life {
		get{return _life;}
		set
		{
			if(_life <= 0 && !IsDead )
			{
				StartDying();
			}
			_life = value;
			lifeSlider.value = _life;
		}
	}
	public void Restart()
	{
		currentLife = life;
		lifeSlider.value = currentLife;
	}

	// Use this for initialization
	void Awake () 
	{
		Restart ();
		_renderer = gameObject.GetComponent<SpriteRenderer> ();
		_rb2d = gameObject.GetComponent<Rigidbody2D> ();
		_anim = gameObject.GetComponent<Animator> ();
	}
	void hopInTheAir()
	{
		_rb2d.AddForce (HopForce);
	}
	// Update is called once per frame
	void Update () 
	{
		if (Input.GetMouseButtonDown (0) && !IsDead) 
		{
			hopInTheAir();
		}
		if (_renderer.color != Color.white) 
		{
			Color c=_renderer.color;
			c.g +=((Color.white.g-c.g)/2)*Time.deltaTime;
			c.b +=((Color.white.g-c.b)/2)*Time.deltaTime;
			_renderer.color=c;

		}
		UpdateScore (Time.deltaTime * ScorePerSecond);
		if (!IsInBounds ()) 
		{
			//Debug.Log("Player out of bounds");

			if(!IsDead)
			{
				StartDying();
			}
			else
			{
				Dye ();
			}

			resetRigidBody2D();
		}
	}
	void StartDying()
	{
		IsDead = true;
		_anim.SetBool("StartDying", true);
		if (!isInLowerLeftBounds ()) 
		{
			//Aixo no fa el salt que vull

			_rb2d.velocity = Vector3.zero;
			_rb2d.AddForce(HopForce * DeathHopSpeed);
		}
		//Debug.Log("Player Is dying Force = "+_rb2d.velocity+" "+_rb2d.gravityScale);
	}
	void Dye()
	{
		//Debug.Log("Player died");
		Life = 0;
		Application.LoadLevel(5);
		//Passar a la pantalla game over
	}

	Vector3 getHalfCameraBounds()
	{
		var cameraHalfWidth = Camera.main.orthographicSize * ( (float) Screen.width / Screen.height );
		return new Vector3 (cameraHalfWidth, Camera.main.orthographicSize, 0f);
	}
	bool isInLowerLeftBounds()
	{
		Vector3 camerHalfBounds = getHalfCameraBounds ();
		bool b = transform.position.y > -camerHalfBounds.y && transform.position.x > -camerHalfBounds.x;
		return b;

	}
	bool isInUpperRightBounds()
	{
		Vector3 camerHalfBounds = getHalfCameraBounds ();
		bool b = transform.position.y < camerHalfBounds.y && transform.position.x < camerHalfBounds.x;
		return b;
	}
	bool IsInBounds()
	{
		bool b = false;
		if (isInLowerLeftBounds() && isInUpperRightBounds()) 
		{
			b=true;
		}
		return b;
	}
	void resetRigidBody2D()
	{
		_rb2d.velocity = Vector3.zero;
		transform.position = figureNewPosition ();
	}
	Vector3 figureNewPosition()
	{
		float posX = transform.position.x;
		float posY = transform.position.y;
		
		Vector3 cameraHalfBounds=getHalfCameraBounds();
			posX = Mathf.Clamp (posX, -cameraHalfBounds.x, cameraHalfBounds.x);
		posY = Mathf.Clamp(posY, -cameraHalfBounds.y, cameraHalfBounds.y);
		
		return new Vector3(posX, posY, transform.position.z);
	}
	public void UpdateScore(float deltaScore)
	{
		Score += deltaScore;
	}
	public void TakeDamage(float damage)
	{
		//eseto va mal
		_renderer.color = Color.red;
		Life = Life - damage;
		/*
		currentLife -= damage;
		lifeSlider.value = currentLife;
		*/
	}
}

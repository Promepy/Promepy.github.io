/*
The case of the Python Syndicate
Stage 1

Officer: 8730866
CaseNum: 301-0-59451837-8730866

I gotta give it to you kid, you’ve made an excellent start, but now it’s time
to take things up a level. For some time I’ve suspected that there’s something
big going down in Console City.

These cases that we’ve been working are all connected somehow. I need to use
that considerable brain of yours to work it all out. Let’s start by laying out
who we know.

Place each mugshot in its designated position by doing the following:

- Create a new variable for the X and Y coordinates of each mugshot.
    - One has already been done for you.
    - Make sure you use the same style and format for the variable name.
- Find coordinates for the mugshot and initialise your variable with these
values.
- Replace the hard-coded constants in the corresponding image command so that
the mugshot appears in its designated position.

*/

var photoBoard;
var robbieKrayImage;
var pawelKarpinskiImage;
var annaKarpinskiImage;
var rockyKrayImage;
var linaLovelaceImage;
var cecilKarpinskiImage;



//declare your new variables below
var pawelKarpinskiLocationX = 408;
var pawelKarpinskiLocationY = 40;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	robbieKrayImage = loadImage("krayBrothers2.png");
	pawelKarpinskiImage = loadImage("karpinskiBros2.png");
	annaKarpinskiImage = loadImage("karpinskiWoman.png");
	rockyKrayImage = loadImage("krayBrothers1.png");
	linaLovelaceImage = loadImage("lina.png");
	cecilKarpinskiImage = loadImage("karpinskiBros1.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw()
{
	image(photoBoard, 0, 0);



	//And update these image commands with your x and y coordinates.
	image(pawelKarpinskiImage, pawelKarpinskiLocationX, pawelKarpinskiLocationY);

	//image(robbieKrayImage, 115, 40);
	//image(annaKarpinskiImage, 701, 40);
	//image(rockyKrayImage, 115, 309);
	//image(linaLovelaceImage, 408, 309);
	//image(cecilKarpinskiImage, 701, 309);

}
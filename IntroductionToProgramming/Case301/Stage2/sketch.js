/*
The case of the Python Syndicate
Stage 3


Officer: 8730866
CaseNum: 301-2-90239896-8730866

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Countess hamilton has been declared and initialised
- Modify the x and y parameters of each image command using the x and y
properties from the Countess hamilton object so the images remain at their correct
positions on the board.
- To do this you will need to combine add and subtract operators with the
relevant property for each parameter



*/

var photoBoard;
var pawel_karpinski_img;
var lina_lovelace_img;
var countess_hamilton_img;
var rocky_kray_img;
var cecil_karpinski_img;
var anna_karpinski_img;

var countess_hamilton_object;




function preload()
{
	photoBoard = loadImage('photoBoard.png');
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	lina_lovelace_img = loadImage("lina.png");
	countess_hamilton_img = loadImage("countessHamilton.png");
	rocky_kray_img = loadImage("krayBrothers1.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	anna_karpinski_img = loadImage("karpinskiWoman.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	countess_hamilton_object = {
		x: 701,
		y: 40,
		image: countess_hamilton_img
	};
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(countess_hamilton_object.image, countess_hamilton_object.x, countess_hamilton_object.y);
	image(pawel_karpinski_img, 115-701+countess_hamilton_object.x, 40-40+countess_hamilton_object.y);
	image(lina_lovelace_img, 408-701+countess_hamilton_object.x, 40-40+countess_hamilton_object.y);
	image(rocky_kray_img, 115-701+countess_hamilton_object.x, 309-40+countess_hamilton_object.y);
	image(cecil_karpinski_img, 408-701+countess_hamilton_object.x, 309-40+countess_hamilton_object.y);
	image(anna_karpinski_img, 701-701+countess_hamilton_object.x, 309-40+countess_hamilton_object.y);

}
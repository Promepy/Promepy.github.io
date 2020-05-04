/*
The case of the Python Syndicate
Stage 4

Officer: 8730866
CaseNum: 301-3-27163404-8730866

To really crack the Python Syndicate we need to go in deep. I want to understand
all the connections. I have the data but it’s a mess and I need you to sort it out.

Organise each syndicate member into an object. I’ve done one for you as an example.
Be sure to replicate the naming conventions for your own objects.
Use image command together with the objects you created to organise the mugshots.

- Once you have done this you can comment out or delete the old variables.

*/

var photoBoard;
var pawel_karpinski_img;
var robbie_kray_img;
var bones_karpinski_img;
var rocky_kray_img;
var anna_karpinski_img;
var countess_hamilton_img;

var robbie_kray_obj;


//declare your new objects below


var pawel_karpinski_pos_x = 115;
var pawel_karpinski_pos_y = 40;
var bones_karpinski_pos_x = 701;
var bones_karpinski_pos_y = 40;
var rocky_kray_pos_x = 115;
var rocky_kray_pos_y = 309;
var anna_karpinski_pos_x = 408;
var anna_karpinski_pos_y = 309;
var countess_hamilton_pos_x = 701;
var countess_hamilton_pos_y = 309;


function preload()
{
	photoBoard = loadImage('photoBoard.png');
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	robbie_kray_img = loadImage("krayBrothers2.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");
	rocky_kray_img = loadImage("krayBrothers1.png");
	anna_karpinski_img = loadImage("karpinskiWoman.png");
	countess_hamilton_img = loadImage("countessHamilton.png");

}

function setup()
{
	createCanvas(photoBoard.width, photoBoard.height);
	robbie_kray_obj = {
		x: 408,
		y: 40,
		image: robbie_kray_img
	};



	//define your new objects below
}

function draw()
{
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(pawel_karpinski_img, pawel_karpinski_pos_x, pawel_karpinski_pos_y);
	image(robbie_kray_obj.image, robbie_kray_obj.x, robbie_kray_obj.y);
	image(bones_karpinski_img, bones_karpinski_pos_x, bones_karpinski_pos_y);
	image(rocky_kray_img, rocky_kray_pos_x, rocky_kray_pos_y);
	image(anna_karpinski_img, anna_karpinski_pos_x, anna_karpinski_pos_y);
	image(countess_hamilton_img, countess_hamilton_pos_x, countess_hamilton_pos_y);


}
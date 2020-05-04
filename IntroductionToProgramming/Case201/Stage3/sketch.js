/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 8730866
CaseNum: 201-3-62344248-8730866

As you enter the ALGOL warehouse you are struck by the most horrendous stench - it’s not the fish. Lying amongst piles of fish carcasses you find the body of Judge Hopper. Gathering yourself together, you tie a handkerchief around your nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...


*/

var img;

function preload()
{
    img = loadImage('scene.png');
}

function setup()
{
    createCanvas(img.width,img.height);
}

function draw()
{

    image(img,0,0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to draw around the Judge's body below
    beginShape();
    vertex(640, 570);
    vertex(653, 515);
    vertex(625, 550);
    vertex(560, 290);
    vertex(410, 335);
	vertex(390, 285);
    vertex(505, 260);
    vertex(540, 180);
    vertex(640, 180);
    vertex(680, 230);
    vertex(710, 235);
    vertex(710, 175);
    vertex(745, 180);
    vertex(730, 275);
    vertex(680, 275);
    vertex(750, 455);
    vertex(720, 465);
    vertex(740, 535);
    vertex(705, 555);
    vertex(700, 525);
    vertex(665, 575);
    vertex(645, 571);
	endShape();
}

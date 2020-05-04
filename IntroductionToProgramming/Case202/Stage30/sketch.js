/*

Officer: 8730866
CaseNum: 202-3-40271122-8730866

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce cyan filled text with green outline in Diggity font.
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(567,500);
	textSize(29);
}

function draw()
{
	background(255);

	fill(0,255,255);
	stroke(0,0,0);
	textFont(RonsFont);
	text("x", 65,390);
	fill(255,192,203);
	stroke(255,0,0);
	text("Is", 481,87);
	fill(255,165,0);
	stroke(0,255,0);
	textFont(Ballpointprint);
	text("should", 52,155);
	text("I", 157,243);
	stroke(0,0,255);
	text("mon", 194,184);
	fill(255,255,0);
	textFont(Melissa);
	text("sort", 387,155);
	text("secrets,", 382,243);
	text("?", 212,122);
	fill(255,192,203);
	stroke(0,255,0);
	text("rling", 80,29);
	fill(255,165,0);
	stroke(255,0,0);
	textFont(Ballpointprint);
	text("The", 319,243);
	text("I", 372,184);
	text("away", 157,155);
	fill(0,255,255);
	stroke(0,255,0);
	textFont(Diggity);
	text("guard", 208,214);
	text("go", 127,155);
	text("for", 218,155);
	fill(255,192,203);
	stroke(255,0,255);
	textFont(RonsFont);
	text("no", 71,87);
	fill(255,165,0);
	stroke(0,0,0);
	textFont(Diggity);
	text("break", 277,155);
	textFont(Ballpointprint);
	text("can", 192,243);
	stroke(0,0,255);
	textFont(Diggity);
	text("we", 12,155);
	text("and", 343,155);
	text("Perhaps", 471,122);
	fill(255,255,0);
	stroke(255,0,255);
	textFont(Melissa);
	text("more", 110,243);
	push();
	fill(255,165,0);
	stroke(0,0,255);
	textFont(Diggity);
	text("Are", 228,122);
	pop();
	stroke(255,0,0);
	textFont(RonsFont);
	text("If", 303,184);
	text("me", 406,122);
	push();
	textFont(Melissa);
	text("much", 64,243);
	pop();
	textFont(Diggity);
	text("silence.", 13,274);
	text("ed", 260,214);
	stroke(0,255,0);
	textFont(Ballpointprint);
	text("your", 80,332);
	fill(0,255,255);
	textFont(RonsFont);
	text("can", 407,184);
	stroke(0,0,255);
	textFont(Ballpointprint);
	text("our", 19,122);
	text("My", 16,29);
	fill(255,192,203);
	stroke(0,0,0);
	textFont(Diggity);
	text("?", 449,122);
	stroke(0,0,255);
	text("the", 458,243);
	push();
	textFont(Ballpointprint);
	text("are", 128,214);
	pop();
	stroke(255,0,0);
	text("?", 297,243);
	stroke(0,0,0);
	textFont(Melissa);
	text("all", 468,155);
	textFont(Ballpointprint);
	text("?", 271,184);
	fill(0,255,255);
	stroke(0,255,0);
	textFont(Diggity);
	text("safe", 158,122);
	text("ignore", 186,87);
	stroke(255,0,0);
	textFont(Melissa);
	text("ionsh", 99,122);
	fill(255,165,0);
	stroke(0,0,0);
	textFont(RonsFont);
	text("avoiding", 308,122);
	stroke(0,255,0);
	textFont(Melissa);
	text("sometimes.", 295,214);
	fill(0,255,255);
	stroke(255,0,255);
	textFont(Diggity);
	text("out.", 490,155);
	push();
	fill(255,255,0);
	stroke(0,255,0);
	textFont(Melissa);
	text("Bob,", 118,29);
	text("this", 430,155);
	pop();
	textFont(Ballpointprint);
	text("of", 154,184);
	text("c", 16,214);
	fill(255,165,0);
	stroke(0,0,0);
	textFont(Melissa);
	text("not", 458,214);
	fill(0,255,255);
	stroke(255,0,255);
	text("a", 261,155);
	fill(255,255,0);
	stroke(0,255,0);
	textFont(Diggity);
	text("I", 7,87);
	stroke(0,0,0);
	textFont(Melissa);
	text("ip", 138,122);
	stroke(0,0,255);
	textFont(RonsFont);
	text("can", 21,87);
	fill(255,192,203);
	stroke(0,255,0);
	textFont(Melissa);
	text("relat", 61,122);
	stroke(255,0,255);
	textFont(Diggity);
	text("how", 15,243);
	text("so", 177,214);
	fill(255,165,0);
	textFont(Melissa);
	text("you", 61,184);
	fill(0,255,255);
	textFont(Ballpointprint);
	text("ash.", 25,214);
	fill(255,165,0);
	stroke(0,0,255);
	textFont(RonsFont);
	text("longer", 107,87);
	fill(255,192,203);
	stroke(255,0,0);
	textFont(Ballpointprint);
	text("ey", 228,184);
	text("s,", 118,332);
	fill(255,165,0);
	stroke(0,255,0);
	text("I'm", 392,214);
	push();
	fill(255,192,203);
	stroke(255,0,0);
	textFont(Melissa);
	text("Forever", 12,332);
	pop();
	textFont(Diggity);
	text("continual", 323,87);
	text("delays.", 411,87);
	stroke(255,0,0);
	textFont(Melissa);
	text("da", 62,29);
	fill(255,192,203);
	text("so,", 341,184);
	text("sure", 491,214);
	fill(0,255,255);
	stroke(0,0,255);
	textFont(Diggity);
	text("Are", 13,184);
	fill(255,255,0);
	stroke(0,0,0);
	textFont(RonsFont);
	text("You", 77,214);
	text("send", 457,184);
	push();
	fill(255,165,0);
	stroke(255,0,0);
	textFont(Melissa);
	text("Daisy", 16,390);
	text("you", 276,122);
	pop();
	stroke(255,0,0);
	textFont(Ballpointprint);
	text("take", 237,243);
	text("these", 249,87);
	text("short", 93,184);



}

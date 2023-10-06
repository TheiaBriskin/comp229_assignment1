// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 550;
document.getElementById("theCanvas").appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/basket_background.png";

// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "images/bug_red1.png";

//initialize bug location to 0
var bug = {
    x: 0,
    y: 0,
	speed: 256, // movement in pixels per second
};

//initialize score to 0
var score = 0;

//initialize hop interval to 2 second
var hopInterval = 2000;

//set hopping
var hop = setInterval(function () {
    resetLocation();
}, hopInterval);

//initialize bugCaught to 0
var bugCaught = 0;

// Handle mouse click events to check if the user clicked on the bug
canvas.addEventListener("mousedown", clicked, false);
function clicked(e) {
    e.preventDefault();

    // Get the location of the mouse click
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    // Check if the user clicked on the bug
    if (
        x >= bug.x &&
        x <= bug.x + bugImage.width &&
        y >= bug.y &&
        y <= bug.y + bugImage.height
    ) {
        // Increment the score and update the display
        score++;
        document.getElementById("score").innerHTML = "Score: " + score;

        // Reset the bug's location
        resetLocation();

       
        // reduce hop interval, but should not be less than 0
        if (hopInterval - 100 >= 50) {
            clearInterval(hop);
            hopInterval -= 100;
            hop = setInterval(function () {
                resetLocation();
            }, hopInterval);

        } 
    }
}

// Reset the bug location when the player catches a bug or restarts the game
var resetLocation = function () {
	
	// Throw the bug somewhere on the screen randomly
	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
};

// Reset hopping interval
var resetSpeed = function () {
    clearInterval(hop);
    hopInterval = 2000;
    hop = setInterval(function () {
        resetLocation();
    }, hopInterval);
};
var resetScore = function () {
    score = 0;
    // reset the speed
    resetSpeed();
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}

	// Score
	ctx.fillStyle = "rgb(0, 0, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
    document.getElementById("score").innerHTML = "Score : " + score;
};

// The main game loop
var main = function () {
	render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
main();

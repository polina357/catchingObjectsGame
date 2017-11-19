var score = document.getElementById('counter');
score.count = 0;
var gameField = document.getElementById('game');
var catcher = document.getElementById('catcher');
var obj = document.getElementById('timer');
var timerX;

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset,
		right: box.right
	};
}

function random(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

var start = document.getElementById('startButton');
start.onclick = function() {
	setTimeout(timer, 1000);
	var dropInt = setInterval(dropBox, random(700, 2000));

	var stop = document.getElementById('stopButton');
	stop.onclick = function() {
		clearInterval(dropInt);
		clearTimeout(timerX);
		alert('Your score is ' + score.count);
		score.innerHTML = 0;
		score.count = 0;
		obj.innerHTML = 60;
	};
};

function timer() {

	obj.innerHTML--;

	if (obj.innerHTML == 0) {
		setTimeout(function() {}, 1000);
		clearInterval(dropBox);
		clearInterval(timer);
		alert('Your score is ' + score.count);
	} else {
		timerX = setTimeout(timer, 1000);
	}
}

function dropBox() {
	var left = random(0, gameField.offsetWidth - 30);
	var thisBox = document.createElement("div");
	thisBox.className = 'box';
	thisBox.style.left = left + "px";

	gameField.appendChild(thisBox);
	move(thisBox);
}

function move(thisBox) {
	var coords = getCoords(thisBox);
	var topPos = coords.top;
	var leftPos = coords.left;
	var rightPos = coords.right;
	thisBox.style.top = topPos + 10 + 'px';

	var catcherCoords = getCoords(catcher);
	var topC = catcherCoords.top;
	var leftC = catcherCoords.left;
	var rightC = catcherCoords.right;

	if (topPos >= (topC - 30) && leftPos >= leftC && rightPos <= rightC) {
		thisBox.remove();
		score.count++;
		score.innerHTML = score.count;
	} else if (topPos >= (topC + 10)) {
		thisBox.remove();
	} else {
		setTimeout(move, 50, thisBox);
	}
}
catcher.onmousedown = function(e) {
	var coords = getCoords(catcher);
	var shiftX = e.pageX - coords.left;
	var fieldCoords = getCoords(gameField);

	document.onmousemove = function(e) {
		var newLeft = e.pageX - shiftX;
		if (newLeft < 0) {
			newLeft = 0;
		}
		var rightEdge = gameField.offsetWidth - catcher.offsetWidth;
		if (newLeft > rightEdge) {
			newLeft = rightEdge;
		}
		catcher.style.left = newLeft + 'px';
	};

	document.onmouseup = function() {
		document.onmousemove = document.onmouseup = null;
	};
	return false;
};

catcher.ondragstart = function() {
	return false;
};
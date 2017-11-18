var start = document.getElementById('startButton');
start.onclick = function() {
	setTimeout(timer, 1000);
	dropBox();
};

function timer() {
	var obj = document.getElementById('timer');
	obj.innerHTML--;

	if (obj.innerHTML == 0) {
		alert('Stop');
		setTimeout(function() {}, 1000);
	} else {
		setTimeout(timer, 1000);
	}
}

var score = document.getElementById('score');
var gameField = document.getElementById('game');
var catcher = document.getElementById('catcher');
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

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

// Generating falling elements
function random(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function dropBox() {
	var length = random(0, gameField.offsetWidth);
	var thisBox = document.createElement("div");
	thisBox.className = 'box';
	thisBox.style.left = length + "px";

	gameField.appendChild(thisBox);
	move(thisBox);
}

function move(thisBox) {
	var coords = getCoords(thisBox);
		var topPos = coords.top;
		var leftPos = coords.left;
		thisBox.style.top = topPos + 15 + 'px';
		if ((topPos + 15) >= parseInt(catcher.style.top) && leftPos >= parseInt(catcher.style.left)) {
			thisBox.remove();
			score.innerHTML = 1;
		} else {
			move(thisBox);
		}
}
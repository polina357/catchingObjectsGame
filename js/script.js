var score = document.getElementById('counter');
score.count = 0;
var gameField = document.getElementById('game');
var catcher = document.getElementById('catcher');
var modal = document.getElementById('myModal');

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

var dropInt;
var start = document.getElementById('startButton');
start.onclick = function() {
	start.disabled = true;
	dropInt = setInterval(dropBox, random(700, 2000));
};

var stop = document.getElementById('stopButton');
stop.onclick = function() {
	clearInterval(dropInt);
	generateHistory();
	modal.style.display = "block";
	score.innerHTML = 0;
	score.count = 0;
};

function generateHistory() {
	var id;
	if (localStorage.length == 0) {
		id = 0;
	} else {
		id = localStorage.length;
	}

	if (score.count != 0) {
		localStorage.setItem(id, score.count);
		id++;
	}

	var history = document.getElementById('history');

	while (history.firstChild) {
		history.removeChild(benchTable.firstChild);
	}

	var tbody = document.createElement('TBODY');
	for (var i = 0; i < id; i++) {
		var tr = document.createElement('TR');
		tbody.appendChild(tr);
		var td1 = document.createElement('td');
		tr.appendChild(td1);
		td1.appendChild(document.createTextNode('' + i.toString()));
		var td2 = document.createElement('td');
		tr.appendChild(td2);
		td2.appendChild(document.createTextNode('' + localStorage.getItem(i)));
	}
	history.appendChild(tbody);
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
	modal.style.display = "none";
};

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
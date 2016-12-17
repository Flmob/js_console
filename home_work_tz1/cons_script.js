var outp = document.getElementById('content_text');
var inp = document.getElementById('inpLine');
var acc = document.getElementById('enterBtn');

inp.onkeyup = function (e) {
	// e = e || window.event;
	if (e.keyCode === 13) {
		consWork(inp);
	}
	// Отменяем действие браузера
	return false;
}

acc.onclick = function() {
	consWork(inp);
}

function consWork(obj) {
	var command = obj.value;
	if(command===''||command===' ') return;
	else if(command === ">clc") outp.value = '';
	else outp.value+=(command + '\n');
	obj.value = '>';
}

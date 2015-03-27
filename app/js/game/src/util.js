'use strict';

module.exports = { 
	gameLogUpdate: function(msg) {
		var logwindow = document.getElementById('status-updates');
		logwindow.innerHTML += '<span>' + msg + '</span>';
		logwindow.scrollTop = logwindow.scrollHeight;
	}
}


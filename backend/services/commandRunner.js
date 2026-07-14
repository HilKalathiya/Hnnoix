const { spawn } = require("child_process");

function run(command, args = [], options = {}) {
	const child = spawn(command, args, {
		...options
	});

	return child;
}

module.exports = {
	run,
};
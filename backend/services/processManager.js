const { uePath, amfPath, gnbPath, binaryPath } = require("../config/path");
const { run } = require("./commandRunner");
const path = require('path');
const websocketManager = require('../src/websocket/websocketManager')

const processes = {
	gnb: null,
	ue: null,
};

const status = {
	gnb: "stopped",
	ue: "stopped",
};

async function startGNB() {

	if (processes.gnb) {
		return {
			status: "running",
			message: "gNB is already running",
		};
	}

	const child = run(
		"sudo",
		[
			path.join(binaryPath, "nr-softmodem"),
			"-O",
			gnbPath,
			"--rfsim",
			"--gNBs.[0].min_rxtxtime",
			"3",
		],

	);

	processes.gnb = child;
	status.gnb = "running";

	websocketManager.broadcast({
		type: "status",
		process: "gnb",
		status: "running",
	});

	child.stdout.on("data", (data) => {
		const text = data.toString();
		console.log("GNB STDOUT: ", text)

		websocketManager.broadcast({
			type: "log",
			process: "gnb",
			stream: "stdout",
			message: text,
		});
	});

	child.stderr.on("data", (data) => {

		console.log("GNB STDERR: ", data.toString())

		websocketManager.broadcast({
			type: "log",
			process: "gnb",
			stream: "stderr",
			message: data.toString(),
		});
	});

	child.on("close", (code) => {

		console.log(`GNB exited with code ${code}`);

		processes.gnb = null;
		status.gnb = "stopped";

		websocketManager.broadcast({
			type: "status",
			process: "gnb",
			status: "stopped",
		});

	});

	child.on("error", (err) => {

		console.error("GNB ERR: ", err.message);

		processes.gnb = null;
		status.gnb = "stopped";

		websocketManager.broadcast({
			type: "status",
			process: "gnb",
			status: "stopped",
		});

	});

	return {
		status: "running",
		message: "gNB started successfully",
	};

}

async function stopGNB() {

	if (!processes.gnb) {

		return {
			status: "stopped",
			message: "gNB is not running",
		};

	}

	websocketManager.broadcast({
		type: "status",
		process: "gnb",
		status: "stopping",
	});

	processes.gnb.kill("SIGINT");

	return {
		status: "stopping",
		message: "Stopping gNB",
	};

}

function getGNBStatus() {
	return status.gnb;
}

function getUEStatus() {
	return status.ue;
}


async function startUE() {

	if (processes.ue) {
		return {
			status: "running",
			message: "UE is already running",
		};
	}

	const child = run(
		"sudo",
		[
			path.join(binaryPath, "nr-uesoftmodem"),
			"-O",
			uePath,
			"-C", "3619200000",
			"--band", "78",
			"--ssb", "516",
			"-r", "106",
			"--rfsim",
		],
	);

	processes.ue = child;
	status.ue = "running";

	websocketManager.broadcast({
		type: "status",
		process: "ue",
		status: "running",
	});

	child.stdout.on("data", (data) => {

		// console.log("UE STDOUT: ", data.toString())

		websocketManager.broadcast({
			type: "log",
			process: "ue",
			stream: "stdout",
			message: data.toString(),
		});
	});


	child.stderr.on("data", (data) => {

		console.log("UE STDERR: ", data.toString())

		websocketManager.broadcast({
			type: "log",
			process: "ue",
			stream: "stderr",
			message: data.toString(),
		});
	});

	child.on("close", (code) => {

		console.log(`UE exited with code ${code}`);

		processes.ue = null;
		status.ue = "stopped";

		websocketManager.broadcast({
			type: "status",
			process: "ue",
			status: "stopped",
		});

	});

	child.on("error", (err) => {

		console.error("UE ERR:" ,err.message);

		processes.ue = null;
		status.ue = "stopped";

		websocketManager.broadcast({
			type: "status",
			process: "ue",
			status: "stopped",
		});

	});

	return {
		status: "running",
		message: "UE started successfully",
	};

}

async function stopUE() {

	if (!processes.ue) {

		return {
			status: "stopped",
			message: "UE is not running",
		};

	}
	websocketManager.broadcast({
		type: "status",
		process: "ue",
		status: "stopping",
	});

	processes.ue.kill("SIGINT");

	return {
		status: "stopping",
		message: "Stopping UE",
	};

}
module.exports = {
	startGNB, stopGNB, getGNBStatus, startUE, stopUE, getUEStatus
}


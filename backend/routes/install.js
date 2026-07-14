const express = require('express');
const { spawn } = require("child_process");

const installRouter = express.Router();

installRouter.get('/open-5gs', (req, res) => {
	const command = `
		cd &&
		sudo add-apt-repository ppa:open5gs/latest -y &&
		sudo apt update &&
		sudo apt install open5gs -y
    `;

	const child = spawn("bash", ["-c", command]);

	child.stdout.on("data", (data) => {
		console.log(data.toString());
	});

	child.stderr.on("data", (data) => {
		console.error(data.toString());
	});

	child.on("close", (exitCode) => {

		if (exitCode !== 0) {
			return res.status(500).json({
				success: false,
				message: "Open5GS installation failed."
			});
		}

		// Verify installation
		const verify = spawn("bash", [
			"-c",
			"systemctl list-unit-files | grep open5gs"
		]);

		let output = "";

		verify.stdout.on("data", (data) => {
			output += data.toString();
		});

		verify.on("close", (verifyCode) => {

			if (verifyCode === 0) {
				return res.json({
					success: true,
					alreadyInstalled: false,
					message: "Open5GS installed successfully.",
					services: output
				});
			}

			return res.status(500).json({
				success: false,
				message: "Installation completed but verification failed."
			});

		});

	});
});

installRouter.get("/mongodb", (req, res) => {

	// Check if mongod and mongosh exist
	const check = spawn("bash", [
		"-c",
		"command -v mongod >/dev/null 2>&1 && command -v mongosh >/dev/null 2>&1"
	]);

	check.on("close", (code) => {

		let command = "";

		if (code === 0) {

			console.log("MongoDB already installed.");

			command = `
                sudo systemctl start mongod
                sudo systemctl enable mongod
            `;

		} else {

			console.log("Installing MongoDB...");

			command = `
                curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
                sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor &&

                echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
                sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list &&

                sudo apt update &&

                sudo apt install -y mongodb-org &&

                sudo systemctl start mongod &&

                sudo systemctl enable mongod
            `;
		}

		const child = spawn("bash", ["-c", command]);

		child.stdout.on("data", (data) => {
			console.log(data.toString());
		});

		child.stderr.on("data", (data) => {
			console.error(data.toString());
		});

		child.on("close", (exitCode) => {

			if (exitCode !== 0) {
				return res.status(500).json({
					success: false,
					message: "MongoDB installation failed."
				});
			}

			// Verify service
			const verify = spawn("bash", [
				"-c",
				"systemctl is-active mongod"
			]);

			let status = "";

			verify.stdout.on("data", (data) => {
				status += data.toString();
			});

			verify.on("close", (verifyCode) => {

				if (verifyCode === 0 && status.trim() === "active") {

					return res.json({
						success: true,
						alreadyInstalled: code === 0,
						message: "MongoDB is installed and running."
					});

				}

				return res.status(500).json({
					success: false,
					message: "MongoDB installed but service is not running."
				});

			});

		});

	});

});



module.exports = installRouter
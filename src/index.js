require('dotenv').config();
require('./v1/modules/Logging.js').run()
env = process.env;
const express = require('express');
const httpU = require('http');
const httpsU = require('https');
const { Server } = require("socket.io");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const S3 = require('aws-sdk').S3;
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const sha512 = require('js-sha512').sha512;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
global.Config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json'));

const useHttps = Config.useHttps;
const R2 = new S3({
	endpoint: env.R2ENDPOINT,
	accessKeyId: env.R2ACCESSKEY,
	secretAccessKey: env.R2SECRETACCESSKEY,
	s3DisableBodySigning: false,
	s3ForcePathStyle: true,
});
const transporter = nodemailer.createTransport({
	host: env.EMAILSMTP,
	port: 587,
	auth: {
		user: env.EMAILADDRESS,
		pass: env.EMAILPASSWORD
	}
});

let httpserver = useHttps ? httpsU.createServer(options, app) : httpU.createServer(app);
const io = require('socket.io')(httpserver);

const ForbiddenFiles = ["Logging.js"];
let cores = fs.readdirSync("./src/v1/modules");
for (const i in cores) {
	let file = cores[i];
	if (!ForbiddenFiles.includes(file)) {
		const userModule = require("./v1/modules/" + file);
		console.debug("Init module " + file);
		userModule.run(app, path, R2, io, fs, transporter, sha512);
	};
}
app.use('/res', express.static('./src/v1/res'));
app.all('/v1/*', (req, res) => res.status(404).send('404 Not Found'));
app.all('/*', (req, res) => res.status(404).sendFile(__dirname + '/v1/html/404.html'));


httpserver.listen(env.PORT, () => console.log(`scuffed.io listening on port ${env.PORT} with Websocket on ${env.WEBSOCKETPORT}!`));
console.debug("scuffed.io loaded.");
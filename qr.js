const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Den_King,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("den-king-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function DENKING_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Den_King = den_king({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Den_King.ev.on('creds.update', saveCreds)
			Qr_Code_By_Den_King.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Den_King.sendMessage(Qr_Code_By_Den_King.user.id, { text: '' + b64data });
	
				   let DENKING_MD_TEXT = `
*DENKING 𝙈𝘿 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘾𝙃*
*DENKING 𝙏𝙀𝘾𝙃*
*𝙇𝙀𝙂𝙄𝙏 𝘽𝙊𝙏*
____________________________________
╔════◇
║『 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍𝙎』

║ ❒ DENKING 𝙏𝙀𝘾𝙃: _https://wa.me/254725099642_

║ ❒ DENKING 𝙏𝙀𝘾𝙃: _https://wa.me/254725290208_

╚════════════════════❒
╔═════◇
║ 『••• OWNER INFO •••』
║ 

║ ❒ 𝐎𝐰𝐧𝐞𝐫: _https://wa.me/254725099642_

║ ❒ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/GoPZhE9zc6Y3ul0RnD4HXw_

║

║ 
╚════════════════════╝ 
 *DENKING MD*
___________________________________

Don't Forget To Give Star To My Repo`
					
	 await Qr_Code_By_Den_King.sendMessage(Qr_Code_By_Den_King.user.id,{text:DENKING_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Den_King.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					DENKING_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await DENKING_MD_QR_CODE()
});
module.exports = router

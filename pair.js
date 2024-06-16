PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Den_King,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("den-king-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function DENKING_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Den_King = Den_King({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Den_King.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Den_King.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Den_King.ev.on('creds.update', saveCreds)
            Pair_Code_By_Den_King.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Den_king.sendMessage(Pair_Code_By_Den_King.user.id, { text: '' + b64data });

               let DENKING_MD_TEXT = `
*DENKING MD 𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘾𝙃*
*DENKING TECH*
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

║ ❒ 𝐖𝐚𝐆𝐫𝐨𝐮𝐩: _https://chat.whatsapp.com/I4YnNl6k0Qh35b6GxSLcfj_

║

║ 
╚════════════════════╝ 
 *DENKING MD*
___________________________________

Don't Forget To Give Star To My Repo`
 await Pair_Code_By_Den_King.sendMessage(Pair_Code_By_Den_King.user.id,{text:DENKING_MD_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Den_King.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    DENKING_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await DENKING_MD_PAIR_CODE()
});
module.exports = router

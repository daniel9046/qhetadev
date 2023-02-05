/* Dependencies */
require('dotenv').config()
const MPPClient = require('multiplayerpianojs')
const Collection = require('@discordjs/collection').Collection
const WebSocket = require('ws');
const fs = require('fs')
const HttpsServer = require('https').createServer;

server = HttpsServer({
    cert: fs.readFileSync("/etc/letsencrypt/live/qheta.daniel9046.tk/fullchain.pem"),
    key: fs.readFileSync("/etc/letsencrypt/live/qheta.daniel9046.tk/privkey.pem")
}, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(2096);
const wss = new WebSocket.Server({ server: server })
wss.on('connection', onConnection);

function onConnection(ws, req) {
    function sendArray(arr) {
        ws.send(JSON.stringify(arr));
    }
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    client.mpp.on('a', msg => {
        sendArray([{m:'chatMsg', a:msg.a, p:msg.p}])
    })
    console.log(`onConnection`);
}

function onError(ws, err) {
    client.mpp.sendMessage(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    function sendArray(arr) {
        ws.send(JSON.stringify(arr));
    }

    var messageArray = JSON.parse(data)
    for(let msg of messageArray) {
        if (!msg.hasOwnProperty("m")) return;
        if(msg.m == "kill") {
            sendArray([{m:'notif', text:"Trying to Kill Qheta"}]);
            process.exit(0)
        }

        if(msg.m == "chat") {
            sendArray([{m:'notif', text:"Trying to Send MSG"}]);
            client.mpp.sendMessage(msg.message)
        }
    }
}

// Setup our custom client
let client = {
    commands: new Collection(),
    settings: require('./settings.json')
}
require('./engine/extends.js')(client)

client.settings.name = `${client.settings.name} ${client.settings.prefix}h`

if(!client.settings.MPP_TOKEN) {
    console.log(new Error('NO MPP TOKEN ENTERED, FORCE EXITING TO AVOID BAN.'))
    process.exit(1)
    return
}

client.mpp = new MPPClient(client.settings.MPP_TOKEN)

// Event handling
client.mpp.on('connected', () => {
    console.log('Connected to MPP.')
    console.log('INFO: Starting WSS')
    client.mpp.setChannel(client.settings.defaultChannel)
    client.reloadCommands()
    //client.mpp.sendMessage(`Bot has been deployed.`)
    client.mpp.setUser("๖ۣۜ𝓠𝓱𝓮𝓽𝓪 ｢ :help ｣ [NEW]", '#ff8ff9')
})

client.findParticipantByName = function(name) {
    for (let part in client.mpp.room.users) {
    part = client.mpp.room.users[part];
    if (part.name.toLowerCase() == name.toLowerCase() || part.name.toLowerCase().includes(name) || part.id.toLowerCase().includes(name)) return part;
    }
}

client.mpp.on('userJoin', async usr => {
    console.log(`joined ${usr.name}`)
})

client.mpp.on('message', async msg => {

  if (!msg.content.startsWith(client.settings.prefix)) return

  await client.executeCommand(msg)
      .catch(e => client.mpp.sendMessage(`Error executing command: ${e}`))
      .then(() => console.log(`${msg.author.name} || ${msg.content}`))
})

// Connect the client
client.mpp.connect()
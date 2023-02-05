const Command = require('../command.js')

module.exports = class HelpCommand extends Command {
  constructor (client) {
    super('base64', ['b64','btoa'], 'Encode BASE64.', {
      usage: `${client.settings.prefix}base64 [input]`,
      category: 'gen'
    })
  }

  async run (client, msg) {
    var input = msg.content.split(" ").slice(1).join(" ");
    if(!input) {
      client.mpp.sendMessage(`base64: Usage: ${prefix}base64 [input]`)
      client.mpp.sendMessage(`base64 Encode base64 text.`)
      return;
    } else {
      client.mpp.sendMessage("base64: "+ Buffer.from(input).toString('base64'))
    }
  }
}

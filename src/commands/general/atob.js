const Command = require('../command.js')

module.exports = class HelpCommand extends Command {
  constructor (client) {
    super('atob', ['ub64'], 'decode BASE64.', {
      usage: `${client.settings.prefix}atob [input]`,
      category: 'gen'
    })
  }

  async run (client, msg) {
    var input = msg.content.split(" ").slice(1).join(" ");
    if(!input) {
      client.mpp.sendMessage(`atob: Usage: ${prefix}atob [input]`)
      client.mpp.sendMessage(`atob Decode base64 text.`)
      return;
    } else {
      client.mpp.sendMessage("atob: "+ atob(input))
    }
  }
}

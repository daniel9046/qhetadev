const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('uwu', [], 'UWUify your message', {
      usage: `${client.settings.prefix}uwu [message]`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {
    client.mpp.sendMessage('Building ...')
  }
}
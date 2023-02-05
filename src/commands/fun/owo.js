const Command = require('../command.js')
module.exports = class Example extends Command {
  constructor (client) {
    super('owo', [], 'uwu alias', {
      usage: `${client.settings.prefix}owo [message]`,
      category: 'fun',
      requiresAdmin: false, //Is user on dev list in settings
      requiresCrown: false  //Is user room owner
    })
  }

  async run (client, msg) {
    client.mpp.sendMessage('Building ...')
  }
}
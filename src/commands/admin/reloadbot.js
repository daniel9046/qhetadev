const Command = require('../command.js')

module.exports = class ReloadCommand extends Command {
  constructor (client) {
    super('re', ['reloadbot','rebot'], 'Reloads the command handler.', {
      usage: `${client.settings.prefix}reload`,
      category: 'dev',
      requiresAdmin: true
    })
  }

  async run (client, msg) {
    client.reloadCommands().then(() => {
        client.mpp.sendMessage('Command handler refreshed!')
    })
  }
}
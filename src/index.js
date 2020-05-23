const quickdb = require('quick.db')
const bcrypt = require('bcrypt')
const { config } = require('./config')
const loggedIn = {}
const database = quickdb

module.exports.server = () => {}

module.exports.player = (player, serv) => {
  const cancelPacket = (ignore, cancel) => {
    if (loggedIn[player.username]) return
    cancel()
  }
  player.on('spawned', () => {
    loggedIn[player.username] = false
    if (database.has(player.username)) player.chat(config.messages.login)
    else player.chat(config.messages.register)
  })

  // add commands
  player.commands.add({
    base: config.commands.login.base,
    info: config.commands.login.info,
    usage: config.commands.login.usage,
    op: false,
    async action (password) {
      if (loggedIn[player.username]) {
        return player.chat(config.messages.alreadyLoggedIn)
      }
      if (!database.has(player.username)) {
        return player.chat(config.messages.register)
      }
      const hash = database.get(player.username)
      if (await bcrypt.compare(password, hash)) {
        loggedIn[player.username] = true // remove the player from not logged in list
        player.chat(config.messages.loginSuccess)
      } else {
        player.chat(config.messages.loginFail)
      }
    }
  })

  player.commands.add({
    base: config.commands.register.base,
    info: config.commands.register.info,
    usage: config.commands.register.usage,
    op: false,
    async action (rawargs) {
      const args = rawargs.split(' ')
      if (database.has(player.username)) {
        return player.chat(config.messages.alreadyRegistered)
      }
      if (args[0] !== args[1]) {
        return player.chat(config.messages.registerFail)
      }
      database.set(
        player.username,
        await bcrypt.hash(args[0], config.saltRounds)
      )
      player.chat(config.messages.registerSuccess)
      player.chat(config.messages.login)
    }
  })

  if (config.protection) {
    player.on('chat_cancel', (ignore, cancel) => {
      if (loggedIn[player.username]) return
      player.chat(config.messages.noChat)
      cancel()
    })
    player.on('command_cancel', ({ command }, cancel) => {
      const cmd = command.split(' ')[0]
      if (loggedIn[player.username]) return
      if (config.allowedCommands.includes(cmd)) return
      player.chat(config.messages.noCommands)
      cancel()
    })
    player.on('move_cancel', cancelPacket)
    player.on('placeBlock_cancel', cancelPacket)
    player.on('dig_cancel', cancelPacket)
    player.on('dug_cancel', cancelPacket)
    player.on('punch_cancel', cancelPacket)
  }
}

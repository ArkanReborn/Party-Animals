const Discord = require('discord.js')
const {
  parse
} = require("twemoji-parser");
const {
  MessageEmbed
} = require("discord.js");
module.exports = {
  name: "addemojis",
  aliases: ['emadd'],
  category: "moderation",
  run: async (client, message, args) => {
    if (message.channel.type === "dm") {
      return message.channel.send(`This command can only be used in a server!`)
    } else if (message.channel.type !== "dm") {

      if (!message.member.hasPermission("MANAGE_EMOJIS")) {
        return message.channel.send(`:x: | **You Don't Have Permission To Use This Command**`)
      }
      const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)
      if (!emojis) return message.channel.send(`:x: | **Provde The emojis to add**`);
      emojis.forEach(emote => {
        let emoji = Discord.Util.parseEmoji(emote);
        if (emoji.id) {
          const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
       emoji.animated ? "gif" : "png"
}`
          message.guild.emojis.create(
              `${Link}`,
              `${`${emoji.name}`}`
            ).then(em => message.channel.send(em.toString() + `has been added! \nLink to download the emoji [here](${Link})`)).catch(error => {
              message.channel.send(":x: | an Error occured. Please contact support!")
              console.log(error)
            })

        }
      })
    }
  }
}
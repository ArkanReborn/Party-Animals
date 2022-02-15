const Discord = require("discord.js");
module.exports = {
  name: "poll",
  description: "Create a simple yes or no poll",
  category: "fun",
  accessableby: "Members",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
      return message.channel.send(`You do not have the permissions!, ${message.author.username}`);
    const channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) {
      return message.channel.send(`You did not mention / give the id of your channel!`);
    }
    let question = args.slice(1).join(" ")
    if (!question) return message.channel.send(`You did not specify your question!`);
    const Embed = new Discord.MessageEmbed()
      .setTitle(`New poll!`)
      .setDescription(`${question}`)
      .setFooter(`${message.author.username} created this poll.`)
      .setColor(`RANDOM`);
    let msg = await bot.channels.cache.get(channel.id).send(Embed);
    await msg.react("👍");
    await msg.react("👎");
  },
};
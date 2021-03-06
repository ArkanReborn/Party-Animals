const {
    MessageEmbed
} = require('discord.js')
const config = require("../../config.json")
const modlog = config.modlog
const tsmodlog = config.tsmodlog
module.exports = {
    name: "bulk-clear",
    description: "Clears 100 messages from chat",
    category: "moderation",
    accessableby: "Moderators",
    aliases: ["bulk-purge", "bulk-delete", "blc"],
    run: async (bot, message, args) => {
        bot.modlog = `<#${modlog}>`;
        bot.tsmodlog = `<#${tsmodlog}>`

        if (message.deletable) message.delete();
        if (message.partial) await message.fetch();

        if (message.channel.type === "dm") {
            return message.channel.send(`This command can only be used in a server!`)
        } else if (message.channel.type !== "dm") {

            if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
                return message.channel.send(`You do not have the correct permissions to do this action, ${message.author.username}`);

            let deleteAmount = 100;

            await message.channel.bulkDelete(deleteAmount, true)

            const embed = new MessageEmbed()
                .setTitle(`${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true,
                    format: 'png'
                }))
                .setDescription(`Successfully deleted ${deleteAmount} messages`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor('#f2f2f2')
            await message.channel.send(embed)
            if (message.guild.id === "930503589707792435") {
                return bot.channels.cache.get(tsmodlog).send(`${message.author.tag} deleted ${deleteAmount} messages in ${message.channel.name}`)
            } else {
                bot.channels.cache.get(modlog).send(`${message.author} deleted ${deleteAmount} messages in ${message.channel}`)
                if (!modlog) return;
            }
        }
    }
}
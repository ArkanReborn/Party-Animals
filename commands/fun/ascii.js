const discord = require("discord.js");
const figlet = require("figlet");

module.exports = {
    name: "ascii",
    aliases: ["asci"],
    category: "fun",
    usage: "ascii <text>",
    description: "Returns provided text in ascii format.",
    run: async (bot, message, args) => {

        let text = args.join(" ");
        if (!text) {
            return message.channel.send(`Please provide text for the ascii conversion!`)
        }
        let maxlen = 25
        if (text.length > 25) {
            return message.channel.send(`Please put text that has 30 characters or less because the conversion won't be good!`)
        }
        figlet(text, function (err, data) {
            message.channel.send(data, {
                code: 'AsciiArt'
            });
        })

    }
};
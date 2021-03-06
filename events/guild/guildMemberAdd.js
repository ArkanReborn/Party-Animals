const { MessageEmbed } = require("discord.js");
const humanizeDuration = require('humanize-duration');
const xp = require('../../schemas/xp.js');
const mongoose = require("mongoose");
const db = require("../../schemas/db.js");

module.exports = async (bot, data) => {
    activities = [`${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`, `${bot.users.cache.size} users!`], i = 0;
    let guildID = data.guild.id;
    let guildName = data.guild.name;
    let userID = data.user.id;
    let userName = data.user.username;

    if (data.user.id !== bot.user.id) {
        if (data.guild.channels) {
            let logChannel = await data.guild.channels.cache.find(c => c.name === "mod-logs" || undefined);
            if (logChannel) {
                let currentDate = new Date();
                let userJoinDate = data.user.createdAt;
                let time = currentDate - userJoinDate
                let accountTime = humanizeDuration(currentDate - userJoinDate)
                const embed = new MessageEmbed()
                    .setColor("#0efefe")
                    .setTitle("User Joined")
                    .setThumbnail(data.user.displayAvatarURL())
                    .setDescription(`${data.user} ${data.user.tag}`)
                    .setFooter(`ID: ${data.user.id}`)
                    .setTimestamp()

                if (time <= 604800000) { //604800000  is 7 days in MS
                    embed.addField("**Warning** new user account:", `Account created ${accountTime} ago.`);
                    logChannel.send(embed);
                } else {
                    logChannel.send(embed);
                }
            }
            let welcomeCH;
            db.findOne({ guildID: data.guild.id, channels: { $elemMatch: { command: "welcome" } } }, async (err, exists) => {
                if (exists) {
                    welcomeCH = await bot.channels.cache.get(exists.channels.filter(x => x.command === "welcome")[0].channelID);
                }
            });

            let welcomeMSG;
            db.findOne({ guildID: guildID }, async (err, exists) => {
                if (exists) {
                    if (exists.welcomeMessage.length > 0) {
                        let msg = exists.welcomeMessage.toString().replace(/\[user\]/g, `${data.user}`);
                        let msgArray = msg.split(" ");
                        let msgMap = await msgArray.map((guild, index) => {
                            if (guild.replace(/[0-9]/g, "") == "[]") {
                                let channel = bot.channels.cache.get(guild.substring(1, guild.length - 1));
                                return msgArray[index] = `${channel}`;
                            } else return msgArray[index];
                        });
                        welcomeMSG = msgMap.join(" ");
                        if (welcomeCH && welcomeMSG) {
                            welcomeCH.send(`${welcomeMSG}`);
                        }
                    }
                }
            }).catch(err => err);
        }
    }

    xp.findOne({ guildID: guildID, userID: userID }, (err, exists) => {
        if (!exists) {
            const newXP = new xp({
                _id: mongoose.Types.ObjectId(),
                guildID: guildID, guildName: guildName,
                userID: userID, userName: userName, xp: 0, level: 0
            })
            newXP.save().catch(err => console.log(err));
        }
    });
}
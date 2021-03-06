const Discord = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: "buy",
    description: "Buy something from the store!",
    category: "Economy",

    run: async (client, message, args) => {

        let user = message.author;

        let author = await db.fetch(`money_${user.id}.pocket`)

        let Embed = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You need 3500 coins to purchase Bronze VIP`);

        let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`You need 10000 coins to purchase Silver VIP`);

        switch (args[0]) {
            case 'bronze':
            case 'vip1':
                if (author < 3500) return message.channel.send(Embed)

                await db.fetch(`bronze_${user.id}`);
                await db.set(`bronze_${user.id}`, true)

                let Embed2 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`Purchased Bronze VIP for 3500 coins!`);

                await db.subtract(`money_${user.id}.pocket`, 3500)
                message.channel.send(Embed2)
                break;

            case "silver":
            case "vip2":
                if (author < 10000) return message.channel.send(Embed3)

                await db.fetch(`silver_${user.id}`)
                await db.set(`silver_${user.id}`, true)

                let emb = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`Purchased Silver VIP for 10000 coins!`)

                    message.channel.send(emb)
                await db.subtract(`money_${user.id}.pocket`, 10000)
            break; 

            case "fish":
            case "fishing":
                let Embed6 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(` You need 500 coins to purchase a fishing rod`);

                if (author < 500) return message.channel.send(Embed6);
                let iffish = await db.get(`fish_${user.id}`);
                if (iffish !== null) {
                    if (iffish.rod === 1) return message.channel.send("You already have a fishing rod!");
                }
                //await db.fetch(`fish_${user.id}`)
                await db.add(`fish_${user.id}.rod`, 1);
                await db.set(`fish_${user.id}.fish`, [])

                let Embed7 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription(`Purchased a Fishing rod For 500 Coins`);

                await db.subtract(`money_${user.id}.pocket`, 500)
                message.channel.send(Embed7)
                break;
            default:
                let embed3 = new Discord.MessageEmbed()
                    .setColor("#FFFFFF")
                    .setDescription('Enter an item to buy')
                message.channel.send(embed3)
                break;

        }
    }
}
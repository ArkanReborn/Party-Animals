const fs = require("fs");
const { stripIndents } = require("common-tags");

module.exports = async (bot, process, error, origin) => {
    const date = new Date();
    const formatDate = stripIndents`
        ${(date.getMonth() + 1).toString().padStart(2, '0')}-${
        date.getDate().toString().padStart(2, '0')}-${
        date.getFullYear().toString().padStart(4, '0')}`

    const formatTime = stripIndents`${
        date.getHours().toString().padStart(2, '0')}-${
        date.getMinutes().toString().padStart(2, '0')}-${
        date.getSeconds().toString().padStart(2, '0')}`

    var dir = './logs';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.appendFile(`./logs/${formatDate} UncaughtException.log`, `${formatDate} ${formatTime}: ${error} at ${origin}\n`, function (err) {
        if (err) throw err;
        console.log(`A new UncaughtException has been logged to: ${formatDate} UncaughtException.log`)
    });

    let owner = await bot.users.cache.get(`${process.env.USERID}`);
    owner.send(`New uncaughtExcemption error ${error}. At origin: ${origin}`);
}
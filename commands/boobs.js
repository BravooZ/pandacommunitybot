const Discord = require("discord.js");
const request = require('snekfetch');
const fs = require("fs")

exports.run = (client, message, args) => {
    var max = 12449;
    var min = 10000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);
    if (!message.channel.nsfw) {
        message.channel.send(":underage: Comando NSFW. Por favor mude para o canal NSFW para usar este comando.")
    } else {
        request.get("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg").then(r => {
            fs.writeFile(`boobs.jpg`, r.body)
            message.channel.sendFile(r.body)
            fs.unlink(`./boobs.jpg`)
        })

    }
}

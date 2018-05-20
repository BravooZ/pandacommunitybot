const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")
const Discord = require('discord.js')

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":underage: Comando NSFW. Por favor mude para o canal NSFW para usar este comando.")

    var subreddits = [
        'HENTAI_GIF',
        'hentai_irl'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor(0xe542f4)
                .setTitle('🔞 NSFW 🔞')
                .setImage(url)
            message.channel.send({ embed });
        })
}

module.exports.help = {
  name: 'hentai'
}

const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Não podes fazer isso.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Não consegui encontrá-los");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> tem ${warnlevel} aviso/s.`);

}

module.exports.help = {
  name: "warnlevel"
}

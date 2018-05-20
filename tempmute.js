const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply('Não foi possível encontrar o usuário.');
  if(tomute.hasPermission('ADMINISTRATOR')) return message.reply('Não é possivel mutar essa pessoa!');
  let muterole = message.guild.roles.find(`name`, 'muted');
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: 'mute',
        color: '0xf9e20c',
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.reply('Você não especificou o tempo!');

  await(tomute.addRole(muterole.id));
  message.reply(`${tomute.id} foi mutado por ${ms(ms(mutetime))}`);
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`${tomute.id} foi desmutado!`);
  }, ms(mutetime));

}

module.exports.help = {
  name:'tempmute'
}

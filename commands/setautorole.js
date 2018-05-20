const db = require('quick.db')

exports.run = (bot, message, args, func) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Isso requer que você tenha a role com `Administrador`') // Tell them that they dont have the proper perms
    if (!args.join(" ")) return message.channel.send('Por favor insira argumentos. `setAutoRole <roleName>`') // Tell them if they didn't supply arguments

    db.updateText(`autoRole_${message.guild.id}`, args.join(" ").trim()).then(i => { // .trim() removes the whitespaces on both ends of the string.

        message.channel.send('Função automática alterada com sucesso para: `' + i.text + '`'); // This tells them what they just set the autorole to.

    })

}


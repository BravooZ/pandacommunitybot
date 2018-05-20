const db = require('quick.db')

exports.run = (bot, message, args, func) => {

    // Return Statements
    if (!message.member.roles.find('name', '👑Fundador👑')) return func.embed(message.channel, '**Este comando requer a role do proprietário**', 120000) // This returns if it CANT find the owner role on them. It then uses the function to send to message.channel, and deletes the message after 120000 milliseconds (2minutes)
    if (!args.join(" ") && args.join(" ").toUpperCase() !== 'NONE') return func.embed(message.channel, '**Por favor mencione um canal**\n > *~setwelcome message*') // This returns if they don't message a channel, but we also want it to continue running if they want to disable the log

    // Fetch the new channel they mentioned
    let newMessage;
    if (args.join(" ").toUpperCase() === 'NONE') newMessage = ''; // If they wrote the word none, it sets newMessage as empty.
    else newMessage = args.join(" ").trim(); // If they didn't write none, set what they wrote as the message

    // This will update the .text of the joinMessageDM_guildID object.
    db.set(`joinMessage_${message.guild.id}`, newMessage).then(i => {
        func.embed(message.channel, `**Texto de boas-vindas atualizado com êxito para:**\n > *${args.join(" ").trim()}*`) // Finally, send in chat that they updated the channel.
    })

}

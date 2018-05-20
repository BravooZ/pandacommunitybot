exports.run = (bot, message, args, func) => {

    let msg = message.content.toUpperCase();
    let prefix = '»'

        message.delete();

        if (msg === prefix + 'HOOK') {
            return func.hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'33FF68','https://cdn4.iconfinder.com/data/icons/global-logistics-3/512/129-512.png')
        }

        let hookArgs = message.content.slice(prefix.length + 4).split(",");

        func.hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]);

}

module.exports.help = {
  name:'hook'
}

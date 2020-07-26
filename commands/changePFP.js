var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
	name: 'changepfp',
	description: 'Changes the profile-picture of the bot',
	execute(message, args) {

var pfp = message.client.AvatarURL

        console.log(pfp)

        var date = new Date()

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#d6e090')
            .setTitle(`**change profile-pic**`)
            .addFields(
                { name: 'Username', value: message.member.user.tag},
                { name: 'Command', value: message.content},
                { name: 'Date', value: date},
                { name: 'After', value: args[0], inline: true}
            )
            .setThumbnail(message.client.AvatarURL)
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE)
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        if (message.member.id != '320574128568401920') {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")  
        }
        else if(args.length != 1) {
            return message.channel.send("Seems like you entered the command wrong. If you think this was a mistake please contact <@320574128568401920>")  
        }

        message.client.user.setAvatar(args[0]);
	},
};
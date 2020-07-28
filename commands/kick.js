var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kicks a member from the Server',
	execute(client, message, args) {

        var date = new Date()

        var banReason = ''
        for (var i = 1; i < args.length; i++) {
            banReason = banReason + args[i] + ' '
        }

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#C1C1C1')
            .setTitle(`**Member kicked**`)
            .addFields(
                { name: 'Admin', value: message.member.user.tag, inline: true},
                { name: 'Kicked User', value: message.mentions.members.first(), inline: true},
                { name: 'Reason', value: '** **' + banReason},
                { name: 'Date', value: date}
            )
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
            const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
            channel.send(serverLogEmbed); 

        if (!message.member.roles.cache.has(process.env.MOD_ROLE)) {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")  
        }
        const member = message.mentions.members.first();
        member.kick();
	},
};
var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Bans a member from the Server',
	execute(message, args) {

        var date = new Date()

        var banReason = ''
        for (var i = 1; i < args.length; i++) {
            banReason = banReason + args[i] + ' '
        }

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#333333')
            .setTitle(`**Member banned**`)
            .addFields(
                { name: 'Admin', value: message.member.user.tag, inline: true},
                { name: 'Banned User', value: message.mentions.members.first(), inline: true},
                { name: 'Date', value: date}
            )
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);

        if(args.length > 2) {
            serverLogEmbed.addField (
                { name: 'Reason', value: banReason},
            )
        }
        else {
            serverLogEmbed.addField (
                { name: 'Reason', value: 'No reason given'},
            )
        }
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        if (!message.member.roles.cache.has(process.env.MOD_ROLE)) {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")  
        }
        const user = message.mentions.users.first();
        message.guild.members.ban(user);
	},
};
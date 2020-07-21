var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Send info about the current Hot-Lap-Challenge!',
	execute(message, args) {

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#de0242')
            .setTitle(`**Poll**`)
            .addFields(
                { name: 'Username', value: message.member.user.tag},
                { name: 'Command', value: message.content},
                { name: 'Date', value: date = new Date()}
            )
            .setThumbnail(message.member.user.displayAvatarURL({ format: 'jpg' }))
            .setTimestamp()
            .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        messageContent = message.content;

        try {
            let pollEmbed = new Discord.MessageEmbed()
			    .setTitle('**New Poll**')
			    .setDescription(message.author.username + ' wants to know: ' + messageContent.slice(6))
			    .setColor((Math.random()*0xFFFFFF<<0).toString(16))
			    .setTimestamp()
                .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
            message.channel.send(pollEmbed).then
                (message => message.react('👍')).then(
                (reaction => reaction.message.react('👎')))
        } catch (e) {
            console.log(e)
        }
	},
};
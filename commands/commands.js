var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
	name: 'commands',
	description: 'Sends a list about every available command',
	execute(client, message, args) {

        var date = new Date();

        const commandLogEmbed = new Discord.MessageEmbed()
        .setColor('#73547e')
        .setTitle(`**Commands**`)
        .addFields(
            { name: 'Username', value: message.member.user.tag},
            { name: 'Command', value: message.content},
            { name: 'Date', value: date}
        )
        .setThumbnail(message.member.user.displayAvatarURL({ format: 'jpg' }))
        .setTimestamp()
        .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(commandLogEmbed);

        let commandEmbed = new Discord.MessageEmbed()
            .setTitle('Commands')
            .setColor('RANDOM')
            .addFields(
                { name: '!couples', value: 'Sends a random comic from the couples-series', inline: true},
                { name: '!random', value: 'Sends a random comic', inline: true},
                { name: '!pets', value: 'Send the user a random pet-image', inline: true},
                { name: '\u200b', value: '\u200b'},
                { name: '!level', value: 'Informs the user about his own level', inline: true},
                { name: '!poll', value: 'Let/s the user create a poll', inline: true},
                { name: '\u200b', value: '\u200b'},
                { name: '!addPet', value: 'Let\'s the user submit one image to the pets-database', inline: true},
            )
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        message.channel.send(commandEmbed);
	},
};
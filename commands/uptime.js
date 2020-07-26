const Discord = require('discord.js');
var pjson = require('../package.json');

function sToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs + ':' + mins + ':' + secs;
}

module.exports = {
	name: 'uptime',
	description: 'Displays since when the bot is online',
	execute(message, args) {

        var date = new Date();

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#b2ef00')
            .setTitle(`**Uptime**`)
            .addFields(
                { name: 'Username', value: message.member.user.tag},
                { name: 'Command', value: message.content},
                { name: 'Date', value: date = new Date()}
            )
            .setThumbnail(message.member.user.displayAvatarURL({ format: 'jpg' }))
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        if(message.channel.id != process.env.MRS_BLUE_ID) {
            return message.channel.send(`I\'m sorry but you are not allowed to use this command here. Please head over to <#${process.env.MRS_BLUE_ID}> and try there again`)
        }

        const sentences = [
            'Maybe she should take a break soon',
            'Crazy how time flies when you are having fun',
            'And she isn\'t even breaking a sweat',
            'Let\'s cheer her on',
        ]

        return message.channel.send('MrsBlue worked without a break since ' + sToTime(message.client.uptime)  + ' hours. ' + (sentences[Math.floor(Math.random() * sentences.length)]));

	},
};
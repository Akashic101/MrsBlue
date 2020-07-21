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
        .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
    const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
    channel.send(serverLogEmbed);

        const sentences = [
            'Maybe she should take a break soon',
            'Crazy how time flies when you are having fun',
            'And she isn\'t even breaking a sweat',
            'Let\'s cheer her on',
            ]
    
            return message.channel.send('MrsBlue worked without a break since ' + sToTime(message.client.uptime)  + ' hours. ' + (sentences[Math.floor(Math.random() * sentences.length)]));
	},
};
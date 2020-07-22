const Discord = require('discord.js');
var pjson = require('../package.json');


module.exports = {
	name: 'fakeuser',
	description: 'Displays since when the bot is online',
	execute(message, args) {
        //message.client.emit('guildMemberAdd', message.member);
	},
};
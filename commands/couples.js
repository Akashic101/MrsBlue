const Sequelize = require('sequelize');
const Discord = require('discord.js');
var pjson = require('../package.json');

const couplesSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'couples.sqlite',
});

const couples = couplesSeq.define('couples', {
	id: {
        primaryKey: true,
		type: Sequelize.INTEGER,
        unique: true,
    },
    image: {
        type: Sequelize.STRING,
        unique: true,
    },
    instagram: {
		type: Sequelize.STRING,
        unique: true,
	},
});

module.exports = {
	name: 'couples',
	description: 'Sends a random couple-comic + the corresponding Instagram-Link',
	async execute(message, args) {
        
        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#ccb548')
            .setTitle(`**Comic**`)
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

        try {
            const match = await couples.findOne({ order: Sequelize.literal('random()') })
            if(match) {
                const comicEmbed = new Discord.MessageEmbed()
                    .setTitle('comic')
                    .setColor('#2760ae')
                    .setDescription(match.instagram)
                    .setImage(match.image)
                    .setTimestamp()
                    .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
                return message.channel.send(comicEmbed)
            }
            else {
                return message.channel.send('error');
            }
        } catch (e) {
            message.channel.send("error: " + e);
        }
    }  
};
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
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        if(message.channel.id != process.env.MRS_BLUE_ID) {
            return message.channel.send(`I\'m sorry but you are not allowed to use this command here. Please head over to <#${process.env.MRS_BLUE_ID}> and try there again`)
        }

        try {
            const match = await couples.findOne({ order: Sequelize.literal('random()') })
            if(match) {
                const comicEmbed = new Discord.MessageEmbed()
                    .setTitle('comic')
                    .setColor('#2760ae')
                    .setDescription(match.instagram)
                    .setImage(match.image)
                    .setTimestamp()
                    .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
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
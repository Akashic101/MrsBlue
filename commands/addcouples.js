const Sequelize = require('sequelize');
const Discord = require('discord.js');
var pjson = require('../package.json');
var validUrl = require('valid-url');

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

couples.sync();

module.exports = {
	name: 'addcouples',
	description: 'Adds a couple-comic to the database',
	async execute(client, message, args) {

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#cefa8b')
            .setTitle(`**Comic Added**`)
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
        
        if (!message.member.roles.cache.has(process.env.MOD_ROLE)) {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")  
        }

        else if (args.length != 2 || !(validUrl.isUri(args[0])) || !(validUrl.isUri(args[1]))) {
            return message.channel.send("I'm sorry, it seems like you entered the command wrong. Please check if you entered it correcty and the first link is from Imgur and the second from Instagram. If you believe there is an error, please contact <@320574128568401920>") 
        }

        else {
            try {
                const add = await couples.create({
                    image: args[0],
                    instagram: args[1]
                });
                return message.channel.send(`Comic ${add.image} with link ${add.instagram} added.`);
                
            } catch (e) {
                console.log(e)
                return message.channel.send('Something went wrong with adding the entry. It might already exist in the database');
            }
        }
	},
};
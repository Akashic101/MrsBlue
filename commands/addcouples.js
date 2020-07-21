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

couples.sync();

module.exports = {
	name: 'addcouples',
	description: 'Adds a couple-comic to the database',
	async execute(message, args) {

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
            .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);
        
        if (!message.member.roles.cache.has('734871932192948286')) {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")  
        }
        else if (args.length != 2) {
            message.channel.send("I'm sorry, it seems like you entered the command wrong. Please check if you entered it correcty or use !commands to see how your command should look like. If you believe there is an error, please contact <@320574128568401920>")
            return
        }
        else {
            try {
                const add = await couples.create({
                    image: args[0],
                    instagram: args[1]
                });
                return message.channel.send(`Comic ${add.image} with link ${add.instagram} added.`);
                
            } catch (e) {
                return message.channel.send('Something went wrong with adding the entry. It might already exist in the database');
            }
        }
	},
};
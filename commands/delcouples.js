const Sequelize = require('sequelize');
var pjson = require('../package.json');
const Discord = require('discord.js');

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
	name: 'delcouples',
	description: 'Deletes a comic from the couple-database',
	async execute(client, message, args) {

        const serverLogEmbed = new Discord.MessageEmbed()
            .setColor('#56793c')
            .setTitle(`**Deleted Comic**`)
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
        else {
            try {
                for(var i = 0; i < args.length; i++) {
                    const rowCount = await couples.destroy({ where: { image: args[i] } });
    
                    if (!rowCount) {
                        message.channel.send('That comic did not exist.');
                    }
                    else {
                        message.channel.send('Comic ' + args[i] + ' deleted.');
                    }
                }
            } catch (e) {
                console.log(e)
            }
        }
	},
};
const Sequelize = require('sequelize');
var pjson = require('../package.json');

const comicsSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'comics.sqlite',
});

const comics = comicsSeq.define('comics', {
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
	name: 'delcomic',
	description: 'Deletes a comic from the database',
	async execute(message, args) {

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
            .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(serverLogEmbed);

        if (!message.member.roles.cache.has('734871932192948286')) {
            return message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")
        }
        else {
            try {
                for(var i = 0; i < args.length; i++) {
                    const rowCount = await comics.destroy({ where: { image: args[i] } });
    
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
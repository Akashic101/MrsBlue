const Discord = require('discord.js');
var pjson = require('../package.json');
const Sequelize = require('sequelize');

const levelSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'level.sqlite',
});

const level = levelSeq.define('level', {
	id: {
    primaryKey: true,
		type: Sequelize.INTEGER,
    unique: true,
  },
  user_id: {
    type: Sequelize.STRING,
    unique: true,
  },
  xp: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
  }
});

const levelTable = levelSeq.define('levelTable', {
	id: {
        primaryKey: true,
	    type: Sequelize.INTEGER,
        unique: true,
    },
    level: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    xp_needed: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
    }
});

levelTable.sync()
level.sync()

module.exports = {
	name: 'getlevel',
	description: 'Sends the current level of another user',
	async execute(client, message, args) {

        var date = new Date();
        var username = message.mentions.users.first().username;
        var userID = message.mentions.users.first().id;

        const logEmbed = new Discord.MessageEmbed()
            .setColor('#dab147')
            .setTitle(`**Get Level**`)
            .addFields(
                { name: 'Username', value: message.member.user.tag},
                { name: 'Command', value: message.content},
                { name: 'Date', value: date}
            )
            .setThumbnail(message.member.user.displayAvatarURL({ format: 'jpg' }))
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG);
        channel.send(logEmbed);

        if(message.channel.id != process.env.MRS_BLUE_ID) {
            return message.channel.send(`I\'m sorry but you are not allowed to use this command here. Please head over to <#${process.env.MRS_BLUE_ID}> and try there again`)
        }

        try {
            
            //Find the user by searching through the database with the id
            const match = await level.findOne({where: {user_id: userID}});

            //If a match was found
            if(match) {
                const userLevel = await levelTable.findAll({attributes: ['xp_needed'] });
                const userString = userLevel.map(t => t.xp_needed);
                var index=userString.findIndex(function(number) {
                    return number > match.xp;
                });

                if(userLevel) {
                    const levelEmbed = new Discord.MessageEmbed()
                        .setColor('#e7a09c')
                        .setTitle(`**Level**`)
                        .setDescription(`**${username}** is level ${index} and has ${match.xp} XP`)
                        .setThumbnail(message.mentions.users.first().displayAvatarURL({ format: 'jpg' }))
                        .setTimestamp()
                        .setThumbnail(message.member.user.displayAvatarURL({ format: 'jpg' }))
                    return message.channel.send(levelEmbed)
                }
                else {
                    message.channel.send(`I cannot find that level ${username} for because I am stupid`)
                }
            }
            else {
                message.channel.send("I was unable to find that profile")
            }
        }
        catch (e) {
          console.log(e);
        }   
	},
};
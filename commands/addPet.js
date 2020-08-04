const Discord = require('discord.js');
var pjson = require('../package.json');
const Sequelize = require('sequelize');

const petsSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'pets.sqlite',
});

const pets = petsSeq.define('pets', {
	id: {
        primaryKey: true,
		type: Sequelize.INTEGER,
        unique: true,
    },
    image: {
        type: Sequelize.STRING,
        unique: true,
    }
});

pets.sync()

module.exports = {
	name: 'addpet',
	description: 'Sends a pet to be added to the database',
	async execute(client, message, args) { 

        var date = new Date();
        var link = args[0];
        var authorID = message.author.id;

        const logEmbed = new Discord.MessageEmbed()
        .setColor('#a1e61b')
            .setTitle(`**New pet-pic**`)
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

        const user = client.users.cache.get(authorID);
        user.send(`Your submission with the link ${link} has been sent in to approval. I will notify you as soon as the image has been successfully added`);

        const linkAddedEmbed = new Discord.MessageEmbed()
			.setTitle('**New pet-pic**')
            .setColor("#f78907")
            .addFields(
                {name: 'user', value: message.member.user.tag, inline: true},
                {name: 'link', value: args[0], inline: true}
            )
			.setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
            
        const submissionChannel = message.client.channels.cache.get(process.env.SUBMISSION_ID);
        submissionChannel.send({embed: linkAddedEmbed}).then(embedMessage => {
        embedMessage.react('👍')
            .then(() => embedMessage.react('👎'))
        
            message.delete();

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        embedMessage.awaitReactions(filter, { max: 1})
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '👍') {
                    try {
                        const add = pets.create({
                            image: link
                        });
                        user.send(`Your submission with the link ${link} has been successfully added :)`);
                        return submissionChannel.send(`Image ${link} added.`);
                        
                    } catch (e) {
                        console.log(e)
                        return submissionChannel.send('Something went wrong with adding the entry. It might already exist in the database');
                    }
                } else {
                    submissionChannel.send('The image-addition has been rejected');
                }
            })
            .catch(collected => {
                message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
            });
        });
	},
};
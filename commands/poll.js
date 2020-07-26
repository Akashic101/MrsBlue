var pjson = require('../package.json');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Sends a poll members can vote on',
    async execute(client, message, args) {

        var result = message.content.substr(message.content.indexOf(" ") + 3);

        const author = message.author.username

        var pollEmbed = new MessageEmbed()
            .setTitle('New Poll')
            .setDescription(author + ' wants to know: ' + result)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        message.channel.send(pollEmbed)
        .then(async(message) => {
            await message.react("👍")
            await message.react("👎")
       
            var filter = (reaction, user) => {
                return reaction.emoji.name === "👍" || reaction.emoji.name === "👎" || !user.bot
            };

            var collector = message.createReactionCollector(filter, { time: args[0] * 60000 });

            collector.on('end', collected => {

                var pollResultEmbed = new MessageEmbed()
                    .setTitle('Poll Result')
                    .setDescription(author + ' wanted to know: ' + result)
                    .addFields(
                        {name: '👍', value: collected.get('👍').count - 1, inline: true},
                        {name: '👎', value: collected.get('👎').count - 1, inline: true}
                    )
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
                message.channel.send(pollResultEmbed)
            });
        })
    }
};
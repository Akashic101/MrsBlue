require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
var pjson = require('./package.json');
const { report } = require('process');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const token = process.env.DISCORD_TOKEN;

const prefix = '!';

client.login(token)

client.once('ready', () => {
  console.log('Ready!');
  client.user.setPresence({
    activity: {
        name: '!comic' },
        status: 'idle',
        url: 'https://www.github/Akashic101/MrsBlue'})
    .catch(console.error);

});

client.on('guildMemberAdd', (member) => {

  var date = new Date();

  const memberJoinedEmbed = new Discord.MessageEmbed()
    .setColor('#cf8d1c')
    .setTitle('Member joined')
    .addFields(
        { name: 'Username', value: member.user.tag},
        { name: 'Joined at', value: date},
        { name: 'Account created at', value: member.user.createdAt}
    )
    .setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
    .setTimestamp()
    .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
  client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(memberJoinedEmbed);
});

client.on('guildMemberRemove',(member) => {

  var date = new Date();

  const memberLeftEmbed = new Discord.MessageEmbed()
    .setColor('#f14e43')
    .setTitle('Member left')
    .addFields(
        { name: 'Username', value: member.user.tag},
        { name: 'Left at', value: date}
    )
    .setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
    .setTimestamp()
    .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
  client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(memberLeftEmbed);
});

client.on("messageReactionAdd", (reaction, user) => {
  var d = new Date();
  if(reaction.message.id === '712781048504647791') {
      reaction.message.guild.members.fetch(user)
      .then((member) => {
          member.roles.add('712001337440862269').catch(console.error)
          .then(() => {
              let readyEmbed = new Discord.MessageEmbed()
              .setTitle('**Member agreed to rules**')
              .setDescription(`**${member.user.tag}** agreed to the rules at ` + d + ". He is in the server since " + Math.round((d - member.joinedAt) / 1000) + " seconds")
              .setColor("7F0000")
              .setTimestamp()
              .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');
              client.channels.cache.get(process.env.SERVER_LOG).send(readyEmbed);
              }
          );
      });
  }
});

client.on('message', async message => {

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!message.content.startsWith(prefix) || message.author.bot || message.author.self || !client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  let reportEmbed = new Discord.MessageEmbed()
    .setTitle('**Report**')
    .setColor('#CC0000')
    .setTimestamp()
    .setFooter('MrsBlue V' + pjson.version, 'https://cdn.discordapp.com/app-icons/734868988772745258/010e16406effdab3e64ab46f04b36e83.png');

  switch(reaction.emoji.name) {
    case '1️⃣' :
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '2️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '3️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '4️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '5️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '6️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '7️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '8️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '9️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);

    case '0️⃣':
      reportEmbed.addFields(
        {name: 'User', value: reaction.message.author, inline: true},
        {name: 'Rule', value: reaction.emoji.name, inline: true},
        {name: 'Message', value: reaction.message.content, inline: true},
        {name: 'Link', value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, inline: true}
      )
      return client.channels.cache.get(process.env.SERVER_LOG).send(reportEmbed);
  }
});
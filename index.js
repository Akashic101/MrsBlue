require('dotenv').config();
const Discord = require('discord.js');
const Sequelize = require('sequelize');
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

const levelSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
  storage: 'level.sqlite',
  timestamps: false,
});

//Model that defines the structure of the SweetyImages-database: More info: https://discordjs.guide/sequelize/#beta-creating-the-model
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

const xp = levelSeq.define('xp', {
	id: {
        primaryKey: true,
	    type: Sequelize.INTEGER,
        unique: true,
    },
    level: {
        type: Sequelize.INTEGER,
        unique: true,
    },
    minimum: {
		  type: Sequelize.INTEGER,
		  defaultValue: 0,
		  allowNull: false,
    },
    maximum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
});

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

  timeDifference = Math.abs(date.getTime() - member.user.createdAt.getTime());
  timeDifference = timeDifference / (1000 * 3600 * 24)

  const memberJoinedEmbed = new Discord.MessageEmbed()
    .setColor('#cf8d1c')
    .setTitle('Member joined')
    .addFields(
        { name: 'Username', value: member.user.tag},
        { name: 'Joined at', value: date},
    )
    .setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
    .setTimestamp()
    .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);

    if(timeDifference <= 7) {
      memberJoinedEmbed.setDescription (`The account of ${member.user.tag} is only ${Math.ceil(timeDifference)} days old`)
    }
  client.channels.cache.get(process.env.SERVER_LOG).send(memberJoinedEmbed);
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
    .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
  client.channels.cache.get(process.env.SERVER_LOG).send(memberLeftEmbed);
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
              .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
              client.channels.cache.get(process.env.SERVER_LOG).send(readyEmbed);
              }
          );
      });
  }
});

client.on('message', async message => {

  if (message.author.bot || message.author.self ) return;

  try {
    const match = await level.findOne({where: {user_id: message.author.id}});
    if(match) {
        match.increment('xp', { by: 2 });
    }
    else {
      message.channel.send(`I was unable to find you in the database, so let\'s fix that real quick ;) Please try again in a second`)
      const match = await level.create({
        user_id: message.author.id,
        xp: 0,
        level: 0
    });
    let firstMessageEmbed = new Discord.MessageEmbed()
      .setTitle('**First Message**')
      .setDescription(`**${message.guild.members.cache.get(match.user_id)}** send their first message`)
      .setColor("#45959f")
      .addFields(
        {name: 'Channel', value: message.channel.name, inline: true},
        {name: 'Message', value: message.content, inline: true}
      )
      .setTimestamp()
      .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
    return client.channels.cache.get(process.env.SERVER_LOG).send(firstMessageEmbed);
    }
  }
  catch (e) {
    return console.log(e);
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!message.content.startsWith(prefix) || message.author.bot || message.author.self || !client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(client, message, args);
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
    .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);

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
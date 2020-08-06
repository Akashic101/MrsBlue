# MrsBlue

## Documentation

```
MrsBlue for OkBlueComics
https://github.com/Akashic101/MrsBlue
```

## Table of Content

* [addPet](#addPet)
* [addComic](#addComic)
* [addCouples](#addCouples)
* [Ban](#Ban)
* [changePFP](#changePFP)
* [couples](#couples)
* [delComic](#delComic)
* [delCouples](#delCouples)
* [Kick](#Kick)
* [Level](#Level)
* [Pets](#Pets)
* [Poll](#Poll)
* [Random](#Random)
* [uptime](#uptime)


## addPet Inhaltsverzeichnis

### Description
With this command a user can send in a picture of his pet to the mods who will decide on if
the image should or should not be added to the database. After the user used the command
the original message will get deleted, the user will receive a private message informing him
that his image has been sent in for approval. A post including the username and the link will
be sent to the #submission-channel. If one mod reacts on it with a thumbs-up (👍) it will get
added to the pets-database and the user will get notified via a private message that his
image has been added, if one mod however reacts with a thumbs-down (👎) the entry will
get rejected. The user will not be notified about this

### Uage
_!addPet <imageLink>_

### Limitations

- This command only accepts only one argument. If the user sends in more or less
    arguments, it will result in an error-message
- This command only works in #commands

## addComic

### Description
With this command a moderator can add a comic which is not from the couples-series to the
comic-database. After the moderator has entered the command the entry will be added to
the comic-database

### Usage
_!addComic <imageLink> <instagramLink>_

### Limitations

- This command only accepts two arguments. If the user sends in more or less
    arguments, it will result in an error-message
- This command only works in #commands
- This command is only available to users with the moderator-role


## addCouples

### Description
With this command a moderator can add a comic which is from the couples-series to the
co uples-database. After the moderator has entered the command the entry will be added to
the comic-database

### Usage
_!addComic <imageLink> <instagramLink>_

### Limitations

- This command only accepts two arguments. If the user sends in more or less
    arguments, it will result in an error-message
- This command only works in #commands
- This command is only available to users with the moderator-role

## Ban

### Description
With this command a moderator can ban a user from the Discord-Server.

### Usage
_!ban <@user> <reason>_

### Limitations

- If the command is used without a reason the field will be filled with “No reason given”
- This command is only available to users with the moderator-role

## changePFP

Description
With this command OkBlueComics can change the profile-picture of the MrsBlue-bot

### Usage
_!changePFP <imageLink>_

### Limitations

- This command can only be used every 10 minutes due to limitations by the Discord
    API
- This command only accepts one argument. If OkBlueComics sends in more or less
    arguments, it will result in an error-message
- This command is only available to OkBlueComics


## couples

### Description
With this command a user can receive a random comic from the couples-series

### Usage
_!couples_

### Limitations

- This command can only be used in the MrsBlue-channel

## delComic

### Description
With this command a moderator can delete a comic from the comic-database

### Usage
_!delComic <imageLink>_
Note: It is also possible to add multiple links after each other (example: _!delComic <imageLink><imageLink> <imageLink>_

### Limitations

- This command is only available to users with the moderator-role
- This command only works with image-links, not instagram-links

## delCouples

### Description
With this command a moderator can delete a couples-comic from the couples-database

### Usage
_!delCouples <imageLink>_
Note: It is also possible to add multiple links after each other (example: _!delCouples <imageLink><imageLink> <imageLink>_

### Limitations

- This command is only available to users with the moderator-role
- This command only works with image-links, not instagram-links


## getLevel

### Description
With this command a user can display the level and XP of another user

### Usage
_!getLevel <@user>_

### Limitations

- This command can only be used in the MrsBlue-channel
- This command will only display the level and XP of the first user mentioned.
    Mentioning multiple users will not work

## Kick

### Description
With this command a moderator can kick a user from the Discord-Server.

### Usage
_!kick <@user> <reason>_

### Limitations

- This command is only available to users with the moderator-role
- This command will only kick the first user mentioned. Mentioning multiple users will
    not work

## Level

### Description
With this command a user can display his own level and XP

### Usage
_!level_

### Limitations

- This command can only be used in the MrsBlue-channel


## Pets

### Description
With this command a user can receive a random image from the pets-database

### Usage
_!pets_

### Limitations

- This command can only be used in the MrsBlue-channel

## Poll

### Description
With this command a user create a poll where other users can vote on with a thumbs-up (👍)
or a thumbs-down (👎). After the timer ran out

### Usage
_!poll <minutes> <text>_

### Limitations

- This command can only be used in the MrsBlue-channel
- If the user did not specify how long the poll will run it will result in no results being
    posted

## Random

### Description
With this command a user can receive a random comic which is not from the couples-series

### Usage
_!random_

### Limitations

- This command can only be used in the MrsBlue-channel


## uptime

### Description
With this command a user can see since when the bot is online

### Usage
_!uptime_

### Limitations

- This command can only be used in the MrsBlue-channel



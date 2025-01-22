# discord-logger
This utility provides a clear interface for manipulating messages (e.g., sending, removing) on Discord using the discord.js package.
It can be particularly useful for CI/CD pipelines, cron jobs, or other scenarios where a single script execution is beneficial.

------------------------------------------------------------------------------------------------------------------------------------

To execute available commands, use the following format:

`npm run command` followed by the required arguments `.env file path` `application name` `group id` `command name`

Example:

    `npm run command '/home/username/test/.env' 'app_name' 'someId' 'COMMAND_NAME'`


For better understanding, the mentioned above arguments have the following numeration in node.js code:
    `.env file path` - 2; `application name` - 3; `group id` - 4; `command name` - 5;
    
    the other arguments given per each command will have sequential numeration



To run all commands, you must include the following two variables in the .env file:

    `DISCORD_BOT_TOKEN`: The bot token to authenticate with Discord.

    `DISCORD_CHANNEL_ID`: The ID of the Discord channel where the commands will be executed.

------------------------------------------------------------------------------------------------------------------------------------

Available commands currently include `SEND_MESSAGE` and `REMOVE_MESSAGES`:

`SEND_MESSAGE` - sends a message to a specified channel.

Example:
    `npm run send '/home/user/test/.env' 'app_name' 'someId' 'SEND_MESSAGE' 'your message'`

`REMOVE_MESSAGES` - removes messages from a specified channel.

Example:
    `npm run send '/home/user/test/.env' 'app_name' 'someId' 'REMOVE_MESSAGES' 'true'`


For a detailed understanding of each command's functionality, please refer to the `script.js` and `commands.js` files.
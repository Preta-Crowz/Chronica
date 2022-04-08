import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Intents } from 'discord.js';
import * as Commands from './modules/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
console.info(`Init ${Object.keys(Commands).length} commands..`)
const Register = [];
const CommandList = {};
for (var name of Object.keys(Commands)) {
    var cmd = Commands[name]
    console.debug(`Init Command ${cmd.name}`)
    cmd.init(client);
    Register.push(cmd.info);
    CommandList[cmd.name] = cmd;
}
console.info(`Commands Inited!`)

client.on('ready', async () => {
    console.info(`Client Logged in as ${client.user.tag}!`);
    try {
        console.info("Refreshing slash commands..")
        await rest.put(
            Routes.applicationCommands("961911049219608606"),
            { body: Register }
        );
        console.info("Slash commands refreshed!")
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName in CommandList) {
        return await CommandList[interaction.commandName].callback(interaction);
    }
});

client.login(process.env.TOKEN);
import { Command } from '../core/index.js';

export const HelloWorld = new Command("hello", "Test Bot Command", async (interaction) => {
    await interaction.reply("Hello, world!")
});
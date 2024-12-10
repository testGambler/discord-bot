import { Client, GatewayIntentBits } from "discord.js";
import memes from "random-memes";
import NSFW from "discord-nsfw";
import dotenv from "dotenv";
dotenv.config();


const nsfw = new NSFW();
const possibleFunctions = [
  nsfw.anal,
  nsfw.fourk,
  nsfw.ass,
  nsfw.gonewild,
  nsfw.pgif,
  nsfw.pussy,
  nsfw.boobs,
  nsfw.hentaiass,
  nsfw.hentai,
  nsfw.hmidriff,
  nsfw.erokemo,
  nsfw.lewd,
  nsfw.nekofeet,
  nsfw.nekopussy,
  nsfw.nekotits,
  nsfw.solo,
  nsfw.wallpaper,
];
const colors = [
  {
    value: 0xff0000,
  },
  {
    value: 0x0000ff,
  },
  {
    value: 0xb73561,
  },
  {
    value: 0xd6ffdd,
  },
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.author.username === "edwardelric7434") {
    message.reply(`fuck yo mama`);
    setTimeout(() => {
      message.reply(`just kidding`);
    }, 2000);
    setTimeout(() => {
      message.reply(`or am i? bitch`);
    }, 4000);
  } else {
    message.reply(`hello ${message.author.username}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "help") {
    await interaction.reply({
        embeds: [
          {
            title: "Here are the available commands...",
            description:`/meme - Get a random meme\n/ifeelkinky - Get a random kinky image `,
            image: { url: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjZ3b2tzbTlxanc4cHlzazJoaDY4dDN5MWh0NmhhdXl4OWE3YW9kaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wnGLn1pft1v4xYRR4k/giphy.gif' },
            color: colors[Math.floor(Math.random() * colors.length)].value,
          },
        ],
      });
  }
  if (interaction.commandName === "meme") {
    try {
      const meme = await memes.reddit({ locale: "en" });

      // Reply with an embed containing the meme
      await interaction.reply({
        embeds: [
          {
            title: meme.caption || "Here’s a meme for you!",
            image: { url: meme.image },
            color: colors[Math.floor(Math.random() * colors.length)].value,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      await interaction.reply("Sorry, I couldn’t fetch a meme at this time.");
    }
  }
  if (interaction.commandName === "ifeelkinky") {
    try {
        const randomFunction = possibleFunctions[Math.floor(Math.random() * possibleFunctions.length)];
        const image = await randomFunction();
        await interaction.reply({
          embeds: [
            {
              title: "Here ya go, you kinky bastard",
              image: { url: image },
              color: colors[Math.floor(Math.random() * colors.length)].value,
            },
          ],
        });
      } catch (error) {
        console.error(error);
        await interaction.reply("Sorry, something went wrong while fetching your NSFW content.");
      }
  }
});

client.login(process.env.TOKEN);

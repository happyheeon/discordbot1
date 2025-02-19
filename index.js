require("dotenv").config();
const { Client, Events, GatewayIntentBits } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);

// 커맨드 컬렉션 생성
client.commands = new Collection();

// 슬래시 커맨드 파일 불러오기
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", file));
  client.commands.set(command.data.name, command);
}

// 프리픽스 커맨드 파일 불러오기
const prefixCommandFiles = fs
  .readdirSync(path.join(__dirname, "prefixCommands"))
  .filter((file) => file.endsWith(".js"));
for (const file of prefixCommandFiles) {
  const command = require(path.join(__dirname, "prefixCommands", file));
  client.commands.set(command.name, command);
}

// 슬래시 커맨드 등록 (글로벌)
const CLIENT_ID = process.env.CLIENT_ID; // 자신의 클라이언트 ID로 변경
const commands = commandFiles.map((file) =>
  require(path.join(__dirname, "commands", file)).data.toJSON()
);

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

// 커맨드 상호작용 수신 (슬래시 커맨드)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "명령어 실행 중 오류가 발생했습니다.",
      ephemeral: true,
    });
  }
});

// 프리픽스 커맨드 수신
client.on(Events.MessageCreate, async (message) => {
  if (!message.content.startsWith("!") || message.author.bot) return; // 프리픽스 확인 및 봇 메시지 무시

  const args = message.content.slice(1).trim().split(/ +/); // 프리픽스 제거 및 인자 분리
  const commandName = args.shift().toLowerCase(); // 커맨드 이름 추출

  const command = client.commands.get(commandName); // 커맨드 찾기
  if (!command) return; // 커맨드가 없으면 종료

  try {
    await command.execute(message, args); // 커맨드 실행
  } catch (error) {
    console.error(error);
    await message.reply("명령어 실행 중 오류가 발생했습니다."); // 오류 메시지 전송
  }
});

const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw-filter")
    .setDescription("NSFW 링크 감지 기능을 켜거나 끕니다.")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("on 또는 off를 선택하세요.")
        .setRequired(true)
        .addChoices({ name: "ON", value: "on" }, { name: "OFF", value: "off" })
    ),

  async execute(interaction) {
    const mode = interaction.options.getString("mode");

    if (mode === "on") {
      process.env.NSFW_FILTER = "true";
      await interaction.reply("✅ NSFW 필터가 활성화되었습니다!");
    } else {
      process.env.NSFW_FILTER = "false";
      await interaction.reply("❌ NSFW 필터가 비활성화되었습니다!");
    }

    // .env 파일 업데이트 (환경 변수 유지)
    const newEnvContent = `TOKEN=${process.env.TOKEN}\nNSFW_FILTER=${process.env.NSFW_FILTER}`;
    fs.writeFileSync(".env", newEnvContent);
  },

  getFilterStatus() {
    return process.env.NSFW_FILTER === "true";
  },
};

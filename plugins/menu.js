import { performance } from 'perf_hooks';

const handler = async (message, { conn, usedPrefix = '.' }) => {

    const userId = message.sender;
    const uptimeMs = process.uptime() * 1000;
    const uptimeStr = clockString(uptimeMs);
    const totalUsers = Object.keys(global.db?.data?.users || {}).length;

const menuBody = `
『 *𝟒𝟎𝟒 • 𝐍𝐎𝐓 𝐅𝐎𝐔𝐍𝐃* 』

[x] ${usedPrefix}*ping*
[x] ${usedPrefix}*sistema*
[x] ${usedPrefix}*repo*
[x] ${usedPrefix}*staff*

• *Vᴇʀsɪᴏɴᴇ:* ${global.versione}
• *Uᴛᴇɴᴛɪ:* ${totalUsers}
• *Uᴘᴛɪᴍᴇ:* ${uptimeStr}
• *Dᴇᴠ:* Mors & Gab
`.trim()

const buttons = [
  { buttonId: `${usedPrefix}utente`, buttonText: { displayText: '𝟦𝟢𝟦 // UTENTE' }, type: 1 },
  { buttonId: `${usedPrefix}admin`, buttonText: { displayText: '𝟦𝟢𝟦 // ADMIN' }, type: 1 },
  { buttonId: `${usedPrefix}mod`, buttonText: { displayText: '𝟦𝟢𝟦 // MOD' }, type: 1 },
  { buttonId: `${usedPrefix}owner`, buttonText: { displayText: '𝟦𝟢𝟦 // OWNER' }, type: 1 },
  { buttonId: `${usedPrefix}funzioni`, buttonText: { displayText: '𝟦𝟢𝟦 // FUNZIONI' }, type: 1 },
  { buttonId: `${usedPrefix}strumenti`, buttonText: { displayText: '𝟦𝟢𝟦 // STRUMENTI' }, type: 1 }
]

    await conn.sendMessage(message.chat, {
        image: { url: './media/main-menu.jpeg' },
        caption: menuBody,
        footer: 'sᴛᴀᴛᴜs_ᴄᴏᴅᴇ: 𝟺𝟶𝟺',
        buttons: buttons,
        headerType: 4,
        mentions: [userId]
    }, { quoted: message });
};

function clockString(ms) {
    const d = Math.floor(ms / 86400000);
    const h = Math.floor(ms / 3600000) % 24;
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
}

handler.help = ['menu', 'comandi'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

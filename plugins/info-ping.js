import { performance } from 'perf_hooks'

const toMath = text => {
  const map = {
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒',
    '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗',
    '.': '.'
  }
  return String(text).split('').map(v => map[v] || v).join('')
}

const clockString = ms => {
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)

  return `${toMath(String(d).padStart(2, '0'))}d ${toMath(String(h).padStart(2, '0'))}h ${toMath(String(m).padStart(2, '0'))}m`
}

const handler = async (m, { conn, usedPrefix }) => {
  const start = performance.now()

  const percent = Math.floor(Math.random() * 21) + 80 
  const filled = Math.floor(percent / 10)
  const bar = '▰'.repeat(filled) + '▱'.repeat(10 - filled)

  const latency = (performance.now() - start).toFixed(4)
  const uptime = clockString(process.uptime() * 1000)

  const info = `
╭━━〔 🚨 𝟒𝟎𝟒 〕━━╮

${bar} ${toMath(percent)}%

⚡ ${toMath(latency)}𝐦𝐬
⏱ ${uptime}

『 𝚵𝐑𝐑𝐎𝐑 𝚩𝚯𝐓 𝐎𝐍𝐋𝐈𝐍𝐄 』
╰━━━━━━━━━━╯
`.trim()

  await conn.sendMessage(
    m.chat,
    {
      text: info,
      buttons: [
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: { displayText: '📋 Menu' },
          type: 1
        }
      ],
      headerType: 1
    },
    { quoted: m }
  )
}

handler.help = ['ping']
handler.tags = ['info']
handler.command = /^(ping|p)$/i

export default handler
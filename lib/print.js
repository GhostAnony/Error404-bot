import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

export default async function (m, conn = { user: {} }) {
  if (!m || m.key?.fromMe) return

  try {
    const senderJid = conn.decodeJid(m.sender)
    const chatJid = conn.decodeJid(m.chat || '')
    const botJid = conn.decodeJid(conn.user?.jid)

    if (!chatJid) return

    const newsletterJid = m.key?.newsletterJid
    const isNewsletter = Boolean(newsletterJid)

    const senderName = await conn.getName(senderJid) || ''
    const chatName = await conn.getName(chatJid) || 'Chat'

    const sender = formatPhoneNumber(senderJid, senderName)
    const isGroup = chatJid.endsWith('@g.us')
    const isOwner = Array.isArray(global.owner)
      ? global.owner.map(([number]) => number).includes(senderJid.split('@')[0])
      : global.owner === senderJid.split('@')[0]

    const ts = formatTimestamp(m.messageTimestamp)
    const tipo = (m.mtype || 'unknown').replace(/Message/gi, '').toUpperCase()

    const errorRed = chalk.hex('#FF003C')    
    const matrixGreen = chalk.hex('#00FF66') 
    const warningYellow = chalk.hex('#FFCC00') 
    const textGray = chalk.hex('#B0B0B0')    
    const white = chalk.white.bold

    console.log(
      errorRed('╭─────────────────────────────────────────────⊷') + '\n' +
      errorRed('│') + errorRed.inverse.bold(' ⚠️ ERROR-404 SYSTEM — INCOMING TRAFFIC ') + '\n' +
      errorRed('├┬───────────────') + '\n' +
      errorRed('│') + textGray(' 🕒 timestamp: ') + white(ts) + '\n' +
      errorRed('│') + textGray(' 👤 source:    ') + white(sender) + ' ' + getUserStatus(isOwner) + '\n' +
      errorRed('│') + textGray(' 📍 node/chat: ') + white(chatName) +
        (isGroup
          ? matrixGreen(' [GROUP]')
          : isNewsletter
            ? warningYellow(' [CHANNEL]')
            : textGray(' [PRIVATE]')
        ) + '\n' +
      (isNewsletter
        ? errorRed('│') + textGray(' 📢 channel_id: ') + warningYellow(newsletterJid) + '\n'
        : ''
      ) +
      errorRed('│') + textGray(' 📂 data_type: ') + matrixGreen(tipo) + '\n' +
      errorRed('╰─────────────────────────────────────────────⊷')
    )

    const text = await formatText(m)
    if (text?.trim()) console.log(errorRed(' ❯ ') + text + '\n')

  } catch (e) {
    console.error(chalk.bgRed.white.bold(' CRITICAL ERROR print.js: '), e.message)
  }
}

function getUserStatus(isOwner) {
  if (isOwner) return chalk.hex('#FF003C').bold('[ROOT@OWNER]')
  return chalk.hex('#00FF66')('[GUEST@USER]')
}

function formatPhoneNumber(jid, name) {
  if (!jid) return 'Sconosciuto'
  let clean = jid.split('@')[0].split(':')[0]
  try {
    const number = PhoneNumber('+' + clean).getNumber('international')
    return number + (name ? ` ~${name}` : '')
  } catch {
    return clean + (name ? ` ~${name}` : '')
  }
}

function formatTimestamp(timestamp) {
  const date = timestamp ? new Date(timestamp * 1000) : new Date()
  return date.toLocaleTimeString('it-IT')
}

async function formatText(m) {
  if (!m.text && !m.caption) return ''
  let text = (m.text || m.caption || '').replace(/\u200e+/g, '')

  text = text.replace(urlRegex, url => chalk.hex('#FFCC00').underline(url))
  text = text.replace(/#[\w]+/g, tag => chalk.hex('#FF003C')(tag))

  if (m.isCommand) return chalk.bgHex('#FF003C').black.bold(` $ ${text} `)
  return chalk.hex('#E0E0E0')(text)
}

watchFile(__filename, () => {
  console.log(chalk.bgHex('#FF003C').white.bold(" ⚠️ [SYSTEM] File 'lib/print.js' Ricaricato a causa di una modifica. "))
})

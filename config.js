import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'
import chalk from 'chalk'
import fs from 'fs'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import NodeCache from 'node-cache'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
const moduleCache = new NodeCache({ stdTTL: 300 });

global.owner = [
  ['393508909956', 'allucinogeno', true],
  ['393888929583', 'gab', true]
  ['212784392820', 'deadly', true]
]
global.mods = ['xxxxxxxxxx', 'xxxxxxxxxx']
global.prems = ['xxxxxxxxxx', 'xxxxxxxxxx']

global.nomebot   = '𝚵𝐑𝐑𝐎𝐑 𝚩𝚯𝐓'
global.nomepack  = '𝚵𝐑𝐑𝐎𝐑 𝚩𝚯𝐓'
global.wm        = '𝚵𝐑𝐑𝐎𝐑 𝚩𝚯𝐓'
global.autore    = '𝚵𝐑𝐑𝐎𝐑'
global.dev       = '𝚩𝚯𝐓'
global.versione  = pkg.version
global.testobot  = `ERROR-CORE-V${pkg.version}`
global.errore    = '⚠️ *[SYSTEM ERROR]* Usa `.segnala` per inviare il log allo staff.'

global.repobot   = 'https://github.com/GhostAnony/Error404-bot'
global.canale    = 'error'

global.cheerio   = cheerio
global.fs        = fs
global.fetch     = fetch
global.axios     = axios
global.moment    = moment

global.APIKeys = {
    spotifyclientid: 'error',
    spotifysecret:   'error',
    browserless:     'error',
    screenshotone:   'error',
    tmdb:            'error',
    gemini:          'error',
    ocrspace:        'error',
    assemblyai:      'error',
    google:          'error',
    googlex:         'error',
    googleCX:        'error',
    genius:          'error',
    unsplash:        'error',
    removebg:        'FEx4CYmYN1QRQWD1mbZp87jV',
    openrouter:      'error',
    lastfm:          '36f859a1fc4121e7f0e931806507d5f9',
    sightengine_user: '1244671441',
    sightengine_secret: 'uvqy7fWkiqLbrs4YbdDTnn3a3ZvuEhjM',
}

let filePath = fileURLToPath(import.meta.url)
let fileUrl = pathToFileURL(filePath).href

const reloadConfig = async () => {
  const cached = moduleCache.get(fileUrl);
  if (cached) return cached;
  
  unwatchFile(filePath)
  console.log(chalk.bgCyan.black(" SYSTEM ") + chalk.cyan(` File 'config.js' aggiornato con successo.`))
  
  const module = await import(`${fileUrl}?update=${Date.now()}`)
  moduleCache.set(fileUrl, module, { ttl: 300 });
  return module;
}

watchFile(filePath, reloadConfig)

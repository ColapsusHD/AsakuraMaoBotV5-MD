import fetch from 'node-fetch'

const handler = async (m, { conn, command, args, usedPrefix }) => {
try {
if (!db.data.chats[m.chat].nsfw && m.isGroup)
return m.reply(`ꕥ El contenido *NSFW* está desactivado en este grupo.\n\nUn *administrador* puede activarlo con:\n» *${usedPrefix}nsfw on*`)

if (!args[0])
return conn.reply(m.chat, `❀ Ingresa un tag para buscar.`, m)

await m.react('🕒')

// Tag ignorado porque no se usa API, pero lo respetamos para mantener consistencia
const tag = args[0].replace(/\s+/g, '_')

// Lista global
let mediaList = global.futanari
if (!Array.isArray(mediaList) || mediaList.length === 0)
return conn.reply(m.chat, `ꕥ No hay imágenes disponibles actualmente.`, m)

// Aleatorio
const media = mediaList[Math.floor(Math.random() * mediaList.length)]

// Caption
const caption = `*_ACA TIENES UNA RICA FUTANARI SOLA 🔥_*`

// Enviar según tipo
if (media.endsWith('.mp4')) {
await conn.sendMessage(m.chat, { video: { url: media }, caption, mentions: [m.sender] })
} else {
await conn.sendMessage(m.chat, { image: { url: media }, caption, mentions: [m.sender] })
}

await m.react('✔️')

} catch (err) {
await m.react('✖️')
return conn.reply(
m.chat,
`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${err.message}`,
m
)
}
}

handler.command = ['futasolo', 'futanarisolo']
handler.help = ['futanari']
handler.tags = ['nsfw']
handler.group = true
handler.premium = true

export default handler

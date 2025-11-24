import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
try {

if (!db.data.chats[m.chat].nsfw && m.isGroup)
    return m.reply(`ꕥ El contenido *NSFW* está desactivado en este grupo.\n\nUn *administrador* puede activarlo con:\n» *nsfw on*`)

await m.react('🕒')

// Tag fijo
const tag = "futanarisolo"

// API oficial de rule34 para buscar posts
const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tag)}`

// Petición
let res = await fetch(url, {
    headers: { 
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json' 
    }
})

if (!res.ok) throw new Error("Error al conectar con Rule34")

let json = await res.json()

// Asegurar que json sea un array
const data = Array.isArray(json) ? json : json?.post || []

// Obtener enlaces válidos
let mediaList = data
    .map(i => i?.file_url || i?.large_file_url || i?.image)
    .filter(u => typeof u === "string" && /\.(jpe?g|png|gif|mp4)$/i.test(u))

if (!mediaList.length)
    return conn.reply(m.chat, `ꕥ No se encontraron resultados para *${tag}*`, m)

// Selección aleatoria
let media = mediaList[Math.floor(Math.random() * mediaList.length)]

let caption = `❀ Resultados aleatorios para » *${tag}*`

// Enviar según tipo
if (media.endsWith(".mp4")) {
    await conn.sendMessage(m.chat, { video: { url: media }, caption, mentions: [m.sender] })
} else {
    await conn.sendMessage(m.chat, { image: { url: media }, caption, mentions: [m.sender] })
}

await m.react('✔️')

} catch (e) {
console.error(e)
await m.react('✖️')
conn.reply(m.chat, `⚠︎ Ocurrió un problema.\n${e.message}`, m)
}
}

handler.help = ['futanarisolo']
handler.tags = ['nsfw']
handler.command = ['futanarisolo', 'futasolo']
handler.group = true

export default

/* Desarrollado y Creado por: https://github.com/BrunoSobrino */

const handler = async (m, {conn, usedPrefix, command}) => {
 const datas = global

 if (!m.quoted) throw;
 const q = m.quoted || m;
 const mime = (q.msg || q).mimetype || '';
 if (!/(mp4)/.test(mime)) throw `*${mime}`;
 m.reply(global.wait);
 const media = await q.download();
 conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption:}, {quoted: m});
};

handler.help = ['togifaud'];
handler.tags = ['converter'];
handler.command = ['togifaud'];

export default handler;

const help = (p, date, user, wame) => {
	return `
╭━━━━━━━━━━━━━━━━━━━╮
┃☄️✨𝑩𝑹⃟𝑰𝒁𝑨𝑺 𝑶⃟𝑹𝑰𝑶𝑵✨☄️
┃  
┃ 🕐 𝐃𝐚𝐭𝐚 𝐞 𝐡𝐨𝐫𝐚: ${date}
┃ 🙂 𝐔𝐬𝐮𝐚́𝐫𝐢𝐨: ${user}
┃ 🌎 𝐖𝐚𝐦𝐞: 
┃ ${wame}                                       
┃
┣━━ 🤩 𝑹𝑬𝑫𝑬𝑺 𝑺𝑶𝑪𝑰𝑨𝑰𝑺 🤩 ━╮
┃
┃ 📷 𝐈𝐧𝐬𝐭𝐚𝐠𝐫𝐚𝐦: @brizasbot01
┃
┃ 🤖𝐆𝐢𝐭𝐡𝐮𝐛:
┃ 🌐https://suaurl.com/f31687
┃
┃ 🪀𝐆𝐫𝐮𝐩𝐨:
┃ 🌐https://suaurl.com/feb29e
┃
┃ 📹𝐘𝐨𝐮𝐭𝐮𝐛𝐞:
┃ 🌐https://suaurl.com/c12fe7
┃
┃ 🤑𝐁𝐫𝐢𝐳𝐚𝐬-𝐚𝐩𝐢:
┃ 🌐https://suaurl.com/e55630
┃
┣━━━⚡ 𝙋𝙍𝙄𝙉𝘾𝙄𝙋𝘼𝙄𝙎 ⚡━━━╮
┃ ${p}help
┃ ${p}info
┃ ${p}menu
┣━━━━━😈 𝙋𝙊𝙍𝙉𝙊 😈━━━━╮
┃ ${p}loli
┃ ${p}nsfwloli
┣━━━━✨ 𝙎𝙏𝙄𝘾𝙆𝙀𝙍 ✨━━━━╮
┃ ${p}stiker (leg, resp img)
┃ ${p}sticker (leg, resp img)
┃ ${p}nstiker (pack) (author)
┃ ${p}nsticker (pack) (author)
┃ ${p}toimg
┣━━━━━🎵 𝘼𝙐𝘿𝙄𝙊 🎵━━━╮
┃ ${p}gtts (la) (txt)
┣━━━━😝 𝘿𝙄𝙑𝙀𝙍𝙎𝘼̃𝙊 😝━━━╮
┃ ${p}meme
┣━━━━😎 𝘾𝙍𝙄𝘼𝘿𝙊𝙍 😎━━━━╮
┃ ${p}clearall
┃ ${p}bc
┣━━━━👥 𝙂𝙍𝙐𝙋𝙊𝙎 👥━━━╮
┃ ${p}tagall
┃ ${p}tagall2
┃ ${p}tagall3
┃ ${p}promote
┃ ${p}demote
┃ ${p}add
┃ ${p}kick
┃ ${p}linkgroup
┃ ${p}leave
┃ ${p}clone (dial)
┃ ${p}listadmins
┃ ${p}simih (1 or 0)
┃ ${p}welcome (1 or 0)
┃ ${p}dontback (1 or 0)
┃ ${p}dbackadd (num)
┃ ${p}dbackrm (num)
┃ ${p}dbacklist
┣━━━━━❌ 𝘼𝙉𝙏𝙄 ❌━━━━━╮
┃ ${p}antifake (1 or 0)
┃ ${p}antispam (1 or 0)
┣━━━━━💫 𝙇𝙀𝙑𝙀𝙇 💫━━━━━╮
┃ ${p}deletelevel
┃ ${p}level (n/a, num)
┃ ${p}registerlevel
┣━━━━━📷 𝙁𝙊𝙏𝙊𝙎 📷━━━━╮
┃ ${p}toimg
┃ ${p}wait (leg, resp img)
┣━━━━🎨 𝙀𝙁𝙀𝙄𝙏𝙊𝙎 🎨━━━━╮
┃ obs: coloque "me"
┃ ou marque alguém
┃
┃ ${p}triggerfig
┃ ${p}triggered 
┃ ${p}lisa (txt)
┃ ${p}sepie 
┃ ${p}invert
┃ ${p}greyscale 
┃ ${p}lgbt 
┃ ${p}blur
┣━━━━━━🌈 𝙏𝙏𝙋 🌈━━━━━╮
┃ ${p}attp (txt)
┃ ${p}attp2 (txt)
┃ ${p}attp3 (txt)
┃ ${p}attp4 (txt)
┃ ${p}attp5 (txt)
┃ ${p}attp6 (txt)
┃ ${p}ttp (txt)
┃ ${p}ttp2 (txt)
┃ ${p}ttp3 (txt)
┃ ${p}ttp4 (txt)
┃ ${p}ttp5 (txt)
┃ ${p}ttp6 (txt)
┣━━━🖌️ 𝙈𝙊𝙉𝙏𝘼𝙂𝙀𝙉𝙎 🖌️━━╮
┃ obs: coloque "me"
┃ ou marque alguém
┃
┃ ${p}trash 
┃ ${p}thomas 
┃ ${p}tatto 
┃ ${p}stonks 
┃ ${p}spank 
┃ ${p}rip 
┃ ${p}notstonks 
┃ ${p}mms
┃ ${p}karaba
┃ ${p}jail 
┃ ${p}hitler
┃ ${p}facepalm
┃ ${p}bluediscord
┃ ${p}blackdiscord
┃ ${p}delete
┃ ${p}confusedstonks
┃ ${p}dobross
┃ ${p}beatiful
┃ ${p}affect
┃ ${p}ad
┣━━━━🔍 𝙋𝙀𝙎𝙌𝙐𝙄𝙎𝘼 🔎━━━╮
┃ ${p}pensador (autor)
┃ ${p}xvideos (name)
┃ ${p}thumbzilla (name)
┃ ${p}xanimu (name)
┃ ${p}xnxx (name)
┃ ${p}fapster (name)
┃ ${p}pornhub (name)
┣━━━━━😈 𝙋𝙊𝙍𝙉𝙊 😈━━━━╮
┃ ${p}nsfw (1 or 0)
┃ ${p}nsfwtrap
┃ ${p}nsfwfeet
┃ ${p}girlmasturbate
┃ ${p}lesbian
┃ ${p}eroneko
┃ ${p}eroyuri
┃ ${p}erokitsune
┃ ${p}spank
┃ ${p}girlmasturbategif
┃ ${p}nsfwfeetgif
┃ ${p}randomhug
┃ ${p}nsfwblowjob
┃ ${p}randomkiss
┃ ${p}yuri
┃ ${p}kemonomimi
┃ ${p}cum
┃ ${p}futanari
┃ ${p}slap
┃ ${p}hentainekogif
┃ ${p}nekoanime
┃ ${p}randomanime
╰━━━━━━━━━━━━━━━━━━━╯`
}

exports.help = help

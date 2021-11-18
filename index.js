
/*BEM VINDO AOS BRIZAS ORION EDITION FREE
LEIA ESSES TERMOS E CONDIÇÕES IMPORTANTES 
CASO QUEIRA KIBAR

Ao utilizar o código desse bot, você estará 
assinando um contrato com o criador desse bot, 
o criador tem o direito de receber um reconhecimento 
com as obras que o código foi usado independentemente se for 
modificado, o reconhecimento pode ser dado de várias formas 
como link do perfil no README do github, link do canal do 
yt no vídeo, link do site brizas api entre outras. 
Caso não seja dado o devido reconhecimento,
o contrato será quebrado e estará ferindo
os direitos autorais, o criador tem o direito de tomar medidas
judiciais caso o contrato for quebrado.
Segue o link abaixo para saber mais sobre a Licença MIT:
https://pt.wikipedia.org/wiki/Licença_MIT

CANAL DO YT: https://www.youtube.com/channel/UCK_e0brrGXeXk-zg2NFbJTg
GITHUB: https://github.com/ianmsfvenom
BRIZAS-API: http://brizas-api.herokuapp.com
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson, fetchText } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { uploadimg } = require('./lib/uploadimg')
const FormData = require('form-data')
const lolis = require('lolis.life')
const {apikey} = require('./config')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/json/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/json/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/json/simi.json'))
const antifake = JSON.parse(fs.readFileSync('./src/json/antifake.json'))
const dontback = JSON.parse(fs.readFileSync('./src/json/dontback.json'))
const _level = JSON.parse(fs.readFileSync('./src/json/level.json'));
prefix = '!'
blocked = []
const cr = '☄️✨𝑩𝑹⃟𝑰𝒁𝑨𝑺 𝑶⃟𝑹𝑰𝑶𝑵✨☄️\n'

//anti spam by: os gringo indonésio
const usedCommandRecently = new Set()
const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => usedCommandRecently.delete(from), 3 * 1000)
}

//sistema de level by: (tanto bot usa essa prr que nem sei o criador oficial)
const getLevelingXp = (userid) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === userid) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].xp
    }
}
const getLevelingPosition = (userid) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === userid) {
            position = i
        }
    })
    if (position !== false) {
        return position
    }
}
const getLevelingLevel = (userid) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === userid) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].level
    }
}

const getLevelingId = (userid) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === userid) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].id
    }
}

const addLevelingId = (userid) => {
    const obj = {id: userid, xp: 1, level: 1}
    _level.push(obj)
    fs.writeFileSync('./src/json/level.json', JSON.stringify(_level, null, 2) + '\n')
}

const addLevelingLevel = (userid, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].id === userid) {
            position = i
        }
    })
    if (position !== false) {
        _level[position].level += amount
        fs.writeFileSync('./src/json/level.json', JSON.stringify(_level, null, 2) + '\n')
    }
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./src/json/level.json', JSON.stringify(_level, null, 2) + '\n')
	}
}


function kyun(seconds){
	function pad(s){
	  return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60*60));
	var minutes = Math.floor(seconds % (60*60) / 60);
	var seconds = Math.floor(seconds % 60);
  
  
	return `${pad(hours)} Horas ${pad(minutes)} Minutos ${pad(seconds)} Segundos`
  }

async function starts() {
	const client = new WAConnection()
	client.version = [2,2142,12]
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Escaneie o qr code, mas vc precisa de um celular novo ou wpp web'))
	})

	fs.existsSync('./BrizasBot.json') && client.loadAuthInfo('./BrizasBot.json')
	client.on('connecting', () => {
		start('2', 'Pera la to conectando...')
	})
	client.on('open', () => {
		success('2', 'Pronto, conectei :)')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BrizasBot.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		const mdata = await client.groupMetadata(anu.jid)
		// checagem do dont't back by: brizaloka
		const dontback = JSON.parse(fs.readFileSync('./src/json/dontback.json'))
		const dbackid = []
		for(i=0;i<dontback.length;++i) dbackid.push(dontback[i].groupId)
		if(dbackid.indexOf(anu.jid) >= 0) {
			if (anu.action == 'add'){ 
				num = anu.participants[0]
				var ind = dbackid.indexOf(anu.jid)
				if(dontback[ind].actived && dontback[ind].number.indexOf(num.split('@')[0]) >= 0) {
					await client.sendMessage(mdata.id, '*Olha quem deu as cara por aqui, sente o poder do ban cabaço*', MessageType.text)
					client.groupRemove(mdata.id, [num])
				}
			}
		}
		if(antifake.includes(anu.jid)) {
			if (anu.action == 'add'){
				num = anu.participants[0]
				if(!num.split('@')[0].startsWith(55)) {
					await client.sendMessage(mdata.id, 'Corra numero fake safado seu ban esta próximo', MessageType.text)
					client.groupRemove(mdata.id, [num])
				}
			}
		}
		if (!welkom.includes(anu.jid)) return
		try {
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				try {
					ppgp = await client.getProfilePicture(mdata.id)
				} catch {
					ppgp = 'https://image.flaticon.com/icons/png/512/124/124034.png'
				}
				teks = welcome(num.split('@')[0], mdata.subject)
				let buff = await getBuffer(ppimg)
				let buffgp = await getBuffer(ppgp)
				ran = getRandom('.jpg')
				rano = getRandom('.jpg')
				fs.writeFileSync(ran, buff)
				fs.writeFileSync(rano, buffgp)
				const uploadpp = await uploadimg(ran, rano)
				const uploadgp = await uploadimg(rano, rano)
				fs.unlinkSync(rano)
				fs.unlinkSync(ran)
				const groupMetadata = await client.groupMetadata(mdata.id)
				const groupMembers = groupMetadata.participants
				const groupName = groupMetadata.subject
				imgbuff = await getBuffer(`http://brizas-api.herokuapp.com/photomod/welcome?apikey=brizaloka&desc=2021&background=${backgroundwelcomeimg}&profileimg=${uploadpp.resultado.link}&groupimg=${uploadgp.resultado.link}&number=${groupMembers.length}&groupname=${groupName}&name=${num.split('@')[0]}`)
				client.sendMessage(mdata.id, imgbuff, MessageType.image, {caption: teks})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = bye(num.split('@')[0])
				let buff = await getBuffer(ppimg)
				ran = getRandom('.jpg')
				fs.writeFileSync(ran, buff)
				const upload = await uploadimg(ran, ran)
				imgbuff = await getBuffer(`http://brizas-api.herokuapp.com/photomod/v2/menu?apikey=brizaloka&description=${'Ate mais '+num.split('@')[0]}&profileimg=${upload.resultado.link}&background=${backgroundbyeimg}`)
				client.sendMessage(mdata.id, imgbuff, MessageType.image, {caption: teks})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked

			const antispamcmd = JSON.parse(fs.readFileSync('./src/json/antispamcmd.json'))
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			let mess = {
				wait: '⌛ Aguarde um pouco... ⌛',
				success: '✔️ Sucesso! ✔️',
				error: {
					stick: '❌ Falha, ocorreu um erro ao converter a imagem em um adesivo ❌',
					Iv: '❌ Link inválido ❌'
				},
				only: {
					group: '❌ Este comando só pode ser usado em grupos! ❌',
					ownerG: '❌ Este comando só pode ser usado pelo grupo proprietário! ❌',
					ownerB: '❌ Este comando só pode ser usado pelo número proprietário! ❌',
					admin: '❌ SILÊNCIO MEMBRO COMUM VC N TEM MORAL PRA USAR ESSE COMANDO ❌',
					Badmin: '❌ Este comando só pode ser usado quando o bot se torna administrador! ❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = [`557187645787@s.whatsapp.net`] // Coloque seu número aqui
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isAntiFake = isGroup ? antifake.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isAntiSpamcmd = antispamcmd.includes('Ativado')
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const levelup = (pushname, sender, getLevelingXp,  getLevel, getLevelingLevel) => {
				return`*「 Subiu de nível 」*
*Nome* : ${pushname}
*Wa.me* : wa.me/${sender.split("@")[0]}
*Xp* : ${getLevelingXp(sender)}
*Level* : ${getLevel} ⊱ ${getLevelingLevel(sender)}`}

			if (isCmd && isFiltered(from) && !isGroup) {
				console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mSPAM\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Spam', 'de', color(sender.split('@')[0]), 'palavras :', color(args.length)+']')
				if(isAntiSpamcmd) {
					return reply(`「 ❗ 」Spam detectado. Espere 3 segundos`)
				}
			}
			if (isCmd && isFiltered(from) && isGroup) {
				console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mSPAM\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Spam', 'de', color(sender.split('@')[0]), 'grupo: ', color(groupName), 'palavras :', color(args.length)+']')
				if(isAntiSpamcmd) {
					return reply(`「 ❗ 」Spam detectado. Espere 3 segundos`)
				}
			}
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			const pushname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined	
			if (isCmd && !isOwner) addFilter(from)	
			
			function addMetadata(packname, author) {	
				if (!packname) packname = 'WABot'; if (!author) author = 'Bot';	
				author = author.replace(/[^a-zA-Z0-9]/g, '');	
				let name = `${author}_${packname}`
				if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
				const json = {	
					"sticker-pack-name": packname,
					"sticker-pack-publisher": author,
				}
				const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])	
				const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]	

				let len = JSON.stringify(json).length	
				let last	

				if (len > 256) {	
					len = len - 256	
					bytes.unshift(0x01)	
				} else {	
					bytes.unshift(0x00)	
				}	

				if (len < 16) {	
					last = len.toString(16)	
					last = "0" + len	
				} else {	
					last = len.toString(16)	
				}	

				const buf2 = Buffer.from(last, "hex")	
				const buf3 = Buffer.from(bytes)	
				const buf4 = Buffer.from(JSON.stringify(json))	

				const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])	

				fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {	
					return `./src/stickers/${name}.exif`	
				})	

			}

			const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel != undefined && checkId != undefined) {
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						await reply(levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel))
					}
				}
            } catch (err) {
                console.error(err)
            }

			const dbids = []
			for(i=0;i<dontback.length;++i) {
				dbids.push(dontback[i].groupId)
			}
			const isDontBack = (isGroup && dbids.indexOf(from) >= 0) ? true : false
			switch(command) {
				case 'antispamcmd':
					try {
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiSpamcmd) return reply('Ja esta ativo')
						antispamcmd.push('Ativado')
						fs.writeFileSync('./src/json/antispamcmd.json', JSON.stringify(antispamcmd))
						reply('Ativou com sucesso o recurso de anti spam de comando no bot✔️')
					} else if (Number(args[0]) === 0) {
						fs.writeFileSync('./src/json/antispamcmd.json', JSON.stringify([]))
						reply('Desativou com sucesso o recurso de anti spam de comando no bot✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('Deu erro :/')
					}
                break
				case 'dontback':
					if (!isGroup) return reply(mess.only.admin)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						var ind = dbids.indexOf(from)
						if(isDontBack) {
							dontback[ind].actived = true
						} else {
							dontback.push({
								groupId: from,
								actived: true,
								number: []
							})
						}
						fs.writeFileSync('./src/json/dontback.json', JSON.stringify(dontback, null, 2) + '\n')
						reply(`Ativou com sucesso o recurso de don't back neste grupo✔️`)
					} else if (Number(args[0]) === 0) {
						var ind = dbids.indexOf(from)						
						if(isDontBack) {
							dontback[ind].actived = false
						} else {
							dontback.push({
								groupId: from,
								actived: false,
								number: []
							})
						}
						fs.writeFileSync('./src/json/dontback.json', JSON.stringify(dontback, null, 2) + '\n')
						reply(`Desativou com sucesso o recurso de don't back neste grupo✔️`)
					} else {
						reply('1 para ativar, 0 para desativar')
					}
				break
				case 'dbackadd':
					if (!isGroup) return reply(mess.only.admin)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Diga o numero sem espaço, + ou traço')
					if (isNaN(args[0])) return reply('Diga o numero sem espaço, + ou traço')
					var ind = dbids.indexOf(from)
					if(isDontBack) {
						var numind = dontback[ind].number.indexOf(args[0])
						if(numind >= 0) return reply('*Esse Número ja esta incluso*')
						dontback[ind].number.push(args[0])
					} else {
						dontback.push({
							groupId: from,
							actived: false,
							number: [args[0]]
						})
					}
					fs.writeFileSync('./src/json/dontback.json', JSON.stringify(dontback, null, 2) + '\n')
					reply(`*Número adicionado a lista de don't back*`)

				break
				case 'dbackrm':
					if (!isGroup) return reply(mess.only.admin)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Diga o numero sem espaço, + ou traço')
					if (isNaN(args[0])) return reply('Diga o numero sem espaço, + ou traço')
					var ind = dbids.indexOf(from)
					if(!isDontBack) return reply('*Nenhum Número não foi adicionado*')
					var numind = dontback[ind].number.indexOf(args[0])
					if(numind < 0) return reply('*Esse número não está incluso*')
					dontback[ind].number.splice(numind, 1)
					fs.writeFileSync('./src/json/dontback.json', JSON.stringify(dontback, null, 2) + '\n')
					reply(`*Número removido a lista de don't back*`)
				break
				case 'dbacklist':
					if (!isGroup) return reply(mess.only.admin)
					if (!isGroupAdmins) return reply(mess.only.admin)
					var ind = dbids.indexOf(from)
					if(!isDontBack) return reply('*Nenhum Número não foi adicionado*')
					teks = '*Números que vou moer na porrada se voltar 😡:*\n'
					for(i=0;i<dontback[ind].number.length;++i) {
						teks += `➤ *${dontback[ind].number[i]}*\n`
					}
					teks += '*Esses ai vou descer meu martelo do ban 🥵*'
					reply(teks)
				break
				case 'deletelevel':
					if(getLevelingId(sender) === undefined) return reply('*Você nem sequer se registrou*')
					const pos = getLevelingPosition(sender)
					_level.splice(pos, 1)
					fs.writeFileSync('./src/json/level.json', JSON.stringify(_level, null, 2) + '\n')
					reply('*Removido do sistema de níveis com sucesso!!!*')
				break 
				case 'level':
					if(args.length < 1) {
						const userLevel = getLevelingLevel(sender)
						const userXp = getLevelingXp(sender)
						if (userLevel === undefined && userXp === undefined) return reply(`*Você não esta registrado, para se registrar digite ${prefix}registerlevel*`)
						const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
						resul = `╭━━👾 𝙇𝙀𝙑𝙀𝙇 𝙎𝙏𝘼𝙏𝙐𝙎 👾━━╮\n┣⊱ *Nome* : ${pushname}\n┣⊱ *Wa.me:* wa.me/${sender.split('@')[0]}\n┣⊱ *XP atual/requirido:* ${userXp}/${requiredXp}\n┣⊱ *Level:* ${userLevel}\n╰━━━━━━━━━━━━━━━━━━━╯`
						try {
							ppimg = await client.getProfilePicture(sender)
						} catch {
							ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
						}
						ppbuff = await getBuffer(ppimg)
						ran = getRandom('.jpg')
						fs.writeFileSync(ran, ppbuff)
						const upload = await uploadimg(ran, ran)
						buf = await getBuffer(`http://brizas-api.herokuapp.com/photomod/rank?apikey=${apikey}&name=${sender.split('@')[0]}&atualxp=${userXp}&maxxp=${requiredXp}&desc=2021&colorbar=0061FF&colortext=FF2E00&background=https://i.imgur.com/tVKFNFk.png&profileimg=${upload.resultado.link}&rank=${getLevelingPosition(sender)}&level=${getLevelingLevel(sender)}`)
						fs.unlinkSync(ran)
						client.sendMessage(from, buf, image, {quoted: mek, caption: resul})
					} else if(!isNaN(args[0])) {
						const num = args[0]+'@s.whatsapp.net'
						const userLevel = getLevelingLevel(num)
						const userXp = getLevelingXp(num)
						if (userLevel === undefined && userXp === undefined) return reply(`*Você não esta registrado, para se registrar digite ${prefix}registerlevel*`)
						const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
						const pushname = client.contacts[num] != undefined ? client.contacts[num].vname || client.contacts[num].notify : undefined
						resul = `╭━━👾 𝙇𝙀𝙑𝙀𝙇 𝙎𝙏𝘼𝙏𝙐𝙎 👾━━╮\n┣⊱ *Nome* : ${pushname}\n┣⊱ *Wa.me:* wa.me/${num.split('@')[0]}\n┣⊱ *XP atual/requirido:* ${userXp}/${requiredXp}\n┣⊱ *Level:* ${userLevel}\n╰━━━━━━━━━━━━━━━━━━━╯`
						try {
							ppimg = await client.getProfilePicture(sender)
						} catch {
							ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
						}
						ppbuff = await getBuffer(ppimg)
						ran = getRandom('.jpg')
						fs.writeFileSync(ran, ppbuff)
						const upload = await uploadimg(ran, ran)
						buf = await getBuffer(`http://brizas-api.herokuapp.com/photomod/rank?apikey=${apikey}&name=${sender.split('@')[0]}&atualxp=${userXp}&maxxp=${requiredXp}&desc=2021&colorbar=0061FF&colortext=FF2E00&background=https://i.imgur.com/tVKFNFk.png&profileimg=${upload.resultado.link}&rank=${getLevelingPosition(sender)}&level=${getLevelingLevel(sender)}`)
						fs.unlinkSync(ran)
						client.sendMessage(from, buf, image, {quoted: mek, caption: resul})
					} else return reply('*Diga o número sem +, - ou espaço*')
				break 
				case 'registerlevel':
					addLevelingId(sender)
					reply('*Agora você esta registrado no sistema de levels*')
					if(isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mREGISTRO\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Usuário:', color(sender.split('@')[0]), 'grupo: ', color(groupName)+']')
					if(!isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mREGISTRO\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Usuário:', color(sender.split('@')[0])+']')
				break
				case 'nsfw':
					try {
						if (!isGroup) return reply('❌So usa isso pra ativar porno no grupo, no pv é liberado❌')
						if (!isGroupAdmins) return reply(mess.only.admin)
						if (args.length < 1) return reply('E pra ativar ou n klr?')
						if (Number(args[0]) === 1) {
							if(isNsfw) return reply('Ja esta ativo')
							nsfw.push(from)
							fs.writeFileSync('./src/json/nsfw.json', JSON.stringify(nsfw))
							reply('Prontinho porno liberado guys :)')
						}
						else if (Number(args[0]) === 0) {
							nsfw.splice(from, 1)
							fs.writeFileSync('./src/json/nsfw.json', JSON.stringify(nsfw))
							reply('O corno do adm desativou o porno 😡')
						}
						else {
							reply('1 pra ativar e 0 pra desativar')
						}
					} catch {
						reply(msgerr)
					}
				break
				case 'nsfwtrap':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/trap?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/trap?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					break
				case 'nsfwfeet':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/feet?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/feet?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'girlmasturbate':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/girlsolo?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/girlsolo?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'lesbian':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/lesbian?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/lesbian?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'eroneko':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/eroneko?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/eroneko?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'eroyuri':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/eroyuri?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/eroyuri?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'erokitsune':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/erokitsune?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/erokitsune?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'spank':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/spank?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/erokitsune?apikey='+apikey+'')
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'girlmasturbategif':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/girlsologif?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/girlsologif?apikey='+apikey)
								client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'nsfwfeetgif':
					try {
						if (isNsfw) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/feetgif?apikey='+apikey)
								client.sendMessage(from, buffer, video, {mimetype: Mimetype.gif, quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else if(!isGroup) {
							try{
								buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/feetgif?apikey='+apikey)
								client.sendMessage(from, buffer, video, {mimetype: Mimetype.gif, quoted: mek, caption: 'Hentai de traveco kkkkkk'})
							}
							catch{
								reply('deu erro :/')
							}
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')

					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'randomhug':
					try{
						buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hug?apikey='+apikey)
						ran = getRandom('.gif')
						rano = getRandom('.mp4')
						try {
							fs.writeFileSync(ran, buffer)
							exec(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
								client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif, caption:'Nada que um abraço não resolva 😔'})
								setTimeout(async function () {
									fs.unlinkSync(ran)
									fs.unlinkSync(rano)
								}, 3000)
							})
						}
						catch (e) {
							reply('deu erro :/')
						}
					}
					catch{
						reply('deu erro :/')
					}
				break
				case 'nsfwblowjob':
				try {
				if (isNsfw)
				{
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/bj?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						fs.writeFileSync(ran, buffer)
						execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function() {
							client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif, caption: 'Nada melhor que hentai animado :)'})
							setTimeout(async function () {
								fs.unlinkSync(ran)
								fs.unlinkSync(rano)
							}, 3000)
						})
					}
					catch (e) {
						reply('deu erro :/')
					}
				}
				else if(!isGroup) {
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/bj?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						fs.writeFileSync(ran, buffer)
						execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function() {
							client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif, caption: 'Nada melhor que hentai animado :)'})
						})
					}
					catch (e) {
						reply('deu erro :/')
					}
				}
				else return reply('❌Somente PV e com o nsfw ativado❌')
				} catch {
					reply('deu erro :/')
				}
			break
				case 'randomkiss':
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/kiss?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						fs.writeFileSync(ran, buffer)
						execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
							client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif, caption:'Pena que meu criador não ta ai 😔'})
							setTimeout(async function () {
								fs.unlinkSync(ran)
								fs.unlinkSync(rano)
							}, 3000)
						})
					}
					catch (e) {
						reply('deu erro :/')
					}

				break
				case 'futanari':
					if (isNsfw)
					{
						buff = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/futanari?apikey='+apikey)
						client.sendMessage(from, buff, image, {quoted: mek})
					}
					else if (!isGroup)
					{
						buff = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/futanari?apikey='+apikey)
						client.sendMessage(from, buff, image, {quoted: mek})
					}
					else return reply('❌Somente PV e com o nsfw ativado❌')
					break
				case 'yuri':
					try {
						if (isNsfw)
						{
							buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/yuri?apikey='+apikey)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tu é mano? 🤔'})
						}
						else if (!isGroup)
						{
							buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/yuri?apikey='+apikey)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Tu é mano? 🤔'})
						}
						else return reply('❌Somente PV e com o nsfw ativado❌')
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					break
				case 'kemonomimi':
					buff = await getBuffer('http://brizas-api.herokuapp.com/random/kemonomimi?apikey='+apikey)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'cum':
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/cumarts?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						if(isNsfw) {
							fs.writeFileSync(ran, buffer)
							execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
								client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif})
								setTimeout(async function () {
									fs.unlinkSync(ran)
									fs.unlinkSync(rano)
								}, 3000)
							})
						} else if(!isGroup) {
							fs.writeFileSync(ran, buffer)
							execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
								client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif})
								setTimeout(async function () {
									fs.unlinkSync(ran)
									fs.unlinkSync(rano)
								}, 3000)
							})
						} else return reply('❌Somente PV e com o nsfw ativado❌')
					}
					catch (e) {
						reply('deu erro :/')
					}
					break
				case 'slap':
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/slap?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						fs.writeFileSync(ran, buffer)
						execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
							client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif})
							setTimeout(async function () {
								fs.unlinkSync(ran)
								fs.unlinkSync(rano)
							}, 3000)
						})
					}
					catch (e) {
						reply('deu erro :/')
					}
					break
				case 'hentainekogif':
					buffer = await getBuffer('http://brizas-api.herokuapp.com/random/hentai/nsfwnekogif?apikey='+apikey)
					ran = getRandom('.gif')
					rano = getRandom('.mp4')
					try {
						if(isNsfw) {
							fs.writeFileSync(ran, buffer)
							execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
								client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif})
								setTimeout(async function () {
									fs.unlinkSync(ran)
									fs.unlinkSync(rano)
								}, 3000)
							})
						} else if(!isGroup) {
							fs.writeFileSync(ran, buffer)
							execute(`ffmpeg -i ${ran} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${rano}`, async function () {
								client.sendMessage(from, fs.readFileSync(rano), video, {quoted: mek, mimetype: Mimetype.gif})
								setTimeout(async function () {
									fs.unlinkSync(ran)
									fs.unlinkSync(rano)
								}, 3000)
							})
						} else return reply('❌Somente PV e com o nsfw ativado❌')
					}
					catch (e) {
						reply('deu erro :/')
					}
					break
				case 'nekoanime':
					try {
						buffer = await getBuffer('http://brizas-api.herokuapp.com/random/neko?apikey='+apikey)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Hmmm nekos são lolis tbm amigo :)'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
				break
				case 'randomanime':
				    try {
						buffer = await getBuffer('http://brizas-api.herokuapp.com/random/waifu?apikey='+apikey)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Um anime aleatorio pra vc'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					break
				case 'pensador':
					if(args.length < 1) return reply('*Preciso do nome do pensador*')
					anu = await fetchJson(`http://brizas-api.herokuapp.com/search/pensador?apikey=${apikey}&query=${body.slice(10)}`)
					ran = Math.floor(Math.random() * anu.frases.length + 0)
					buff = await getBuffer(anu.frases[ran].img)
					dated = `Autor: ${anu.autor}\n\nFrase: ${anu.frases[ran].frase}`
					client.sendMessage(from, buff, image, {quoted: mek, caption: dated})
					break
				case 'fancy':
					try {
						if (args.length < 1) return reply(`e o texto prr`)
						anu = await fetchJson(`http://brizas-api.herokuapp.com/gerador/fancytext?apikey=${apikey}&text=${body.slice(7)}`)
						dated = `✅Fancy text gerada✅\n\n*Random 1:* ${anu.random_1}\n\n*Random 2:* ${anu.random_2}\n\n*Random 3:* ${anu.random_3}\n\n*Random 4:* ${anu.random_4}\n\n*Random 5:* ${anu.random_5}\n\n*Flip:* ${anu.flip}\n\n*Mirror:* ${anu.mirror}
\n*Bent:* ${anu.bent}\n\n*Squares: ${anu.squares}*\n\n*Squares invert:* ${anu.inverted_squares}\n\n*Italic:* ${anu.italic}\n\n*Bold:* ${anu.bold}\n\n*Bold italic:* ${anu.bold_italic}\n\n*Subscript:* ${anu.subscript}\n\n*Superscript:* ${anu.superscript}\n\n*Tiny:* ${anu.tiny}\n\n*Medieval:* ${anu.medieval}\n\n*Double Stucks:* ${anu.double_struck}
\n*Cursive:* ${anu.cursive}\n\n*Old English:* ${anu.old_english}\n\n*Future alien:* ${anu.future_alien}\n\n*Asian:* ${anu.asian_1}\n\n*Asian 2:* ${anu.asian_1}\n\n*Squiggle:* ${anu.squiggle}\n\n*Squiggle 2:* ${anu.squiggle_2}\n\n*Squiggle 3:* ${anu.squiggle_3}\n\n*Squiggle 4:* ${anu.squiggle_4}\n\n*Neon:* ${anu.neon}\n\n*Bubbles:* ${anu.bubbles}`
						reply(dated)
					} catch {
						reply('deu erro :/')
					}
					break
				case 'ttp':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
		    			attp2 = await getBuffer(`http://brizas-api.herokuapp.com/ttp/ttp1?apikey=${apikey}&text=${body.slice(5)}&color=00ffff`)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'ttp2':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/ttp2?apikey=${apikey}&text=${body.slice(6)}&color=00ffff`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'ttp3':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/ttp3?apikey=${apikey}&text=${body.slice(6)}&color=00ffff`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'ttp4':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/ttp4?apikey=${apikey}&text=${body.slice(6)}&color=00ffff`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'ttp5':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/ttp5?apikey=${apikey}&text=${body.slice(6)}&color=00ffff`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'ttp6':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/ttp6?apikey=${apikey}&text=${body.slice(6)}&color=00ffff`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp2':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp1?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp3':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp2?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp4':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp3?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp5':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp4?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp6':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp5?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'attp7':
					try{                 
			     	if (args.length < 1) return reply(`e o texto prr`)
                    	url = encodeURI(`http://brizas-api.herokuapp.com/ttp/attp6?apikey=${apikey}&text=${body.slice(7)}`)
		    			attp2 = await getBuffer(url)
			    		client.sendMessage(from, attp2, sticker, {quoted: mek})
					} catch {
						reply('deu erro :/')
					}
			    break
				case 'xvideos':
					teks = body.slice(9)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/xvideos?apikey=${apikey}&query=${teks}`)
					buff = await getBuffer(anu.thumb)
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${anu.titulo}*\n*Link: ${anu.link}*\n*Views: ${anu.view}*\n*Duração: ${anu.duration}*\n*Likes: ${anu.likes}*\n*Deslikes: ${anu.dislikes}*\n*Canal: ${anu.canal}*`
					client.sendMessage(from, buff, image, {quoted: mek, caption: dated})
					break
				case 'thumbzilla':
					teks = body.slice(12)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/thumbzilla?apikey=${apikey}&query=${teks}`)
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${anu.titulo}*\n*Link: ${anu.link}*\n*Views: ${anu.views}*\n*Duração: ${anu.duration}*\n*Avaliação média: ${anu.likes_porcent}*\n*Likes: ${anu.likes}*\n*Deslikes: ${anu.dislikes}*\n*HD: ${anu.is_hd}*`
					reply(dated)
					break
				case 'xanimu':
					teks = body.slice(8)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/xanimu?apikey=${apikey}&query=${teks}`)
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${anu.titulo}*\n*Views: ${anu.views}*\n*Duração: ${anu.duration}*\n*Avaliação média: ${anu.rating}*\n*Download_video: ${anu.video_download}*`
					buff = await getBuffer(anu.thumb_video)
					client.sendMessage(from, buff, video, {quoted: mek, caption: dated})
					break
				case 'fapster':
					teks = body.slice(8)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/fapster?apikey=${apikey}&query=${teks}`)
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${anu.titulo}*\n*Link: ${anu.link}*\n*Views: ${anu.views}*\n*Duração: ${anu.duration}*\n*Avaliação média: ${anu.likes_porcent}*\n*Envio: ${anu.uploaded}*`
					buff = await getBuffer(anu.thumb)
					client.sendMessage(from, buff, image, {quoted: mek, caption: dated})
					break
				case 'xnxx':
					teks = body.slice(6)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/xnxx?apikey=${apikey}&query=${teks}`)
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${anu.titulo}*\n*Views: ${anu.views}*\n*Duração: ${anu.duration}*\n*Avaliação média: ${anu.rating}*\n*Likes: ${anu.likes}*\n*Deslikes: ${anu.deslikes}*\n*Qualidade: ${anu.qualidade}*`
					buff = await getBuffer(anu.video_thumb)
					client.sendMessage(from, buff, video, {quoted: mek, caption: dated})
					break
				case 'pornhub':
					teks = body.slice(9)
					anu = await fetchJson(`http://brizas-api.herokuapp.com/porn/pornhub?apikey=${apikey}&query=${teks}`)
					results = anu.resultado[0]
					dated = `*😈🔥 Pesquisa realizada 🔥😈*\n*Titulo: ${results.title}*\n*Link: ${results.link}*\n*Views: ${results.views}*\n*HD: ${results.hd}*\n*Premium: ${results.premium}*`
					reply(dated)
					break
				case 'lisa':
					teks = body.slice(6)
					buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/lisapresentation?apikey=${apikey}&text=${teks}`)
					client.sendMessage(from, buff, image, {quoted: mek})
				break
				case 'triggerfig':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							reply(mess.wait)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							rano = getRandom('.mp4')
							rane = getRandom('.gif')
							fs.writeFileSync(rano, buff)
							execute(`ffmpeg -i ${rano} -y -vcodec libwebp -filter_complex "[0:v] scale=512:512,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${rane}`, async function(err, res){
								if(err) return reply(mess.error.stick)
								await client.sendMessage(from, fs.readFileSync(rane), sticker, {quoted: mek})
								fs.unlinkSync(rano)	
								fs.unlinkSync(rane)
								fs.unlinkSync(media)
							})
						} else if(args[0] == 'me') {
							reply(mess.wait)
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							rano = getRandom('.mp4')
							rane = getRandom('.gif')
							fs.writeFileSync(rano, buff)
							execute(`ffmpeg -i ${rano} -y -vcodec libwebp -filter_complex "[0:v] scale=512:512,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${rane}`, async function(err, res){
								if(err) return reply(mess.error.stick)
								await client.sendMessage(from, fs.readFileSync(rane), sticker, {quoted: mek})
								fs.unlinkSync(rano)	
								fs.unlinkSync(rane)
								fs.unlinkSync(ran)
							})
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							reply(mess.wait)
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							rano = getRandom('.mp4')
							rane = getRandom('.gif')
							fs.writeFileSync(rano, buff)
							execute(`ffmpeg -i ${rano} -y -vcodec libwebp -filter_complex "[0:v] scale=512:512,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${rane}`, async function(err, res){
								if(err) return reply(mess.error.stick)
								await client.sendMessage(from, fs.readFileSync(rane), sticker, {quoted: mek})
								fs.unlinkSync(rano)	
								fs.unlinkSync(rane)
								fs.unlinkSync(ran)
							})
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'triggered':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							reply(mess.wait)
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, video, {quoted: mek, mimetype: Mimetype.gif})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							reply(mess.wait)
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, video, {quoted: mek, mimetype: Mimetype.gif})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							reply(mess.wait)
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/gifeffect/triggered?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, video, {quoted: mek, mimetype: Mimetype.gif})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'sepie':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							reply(mess.wait)
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/sepie?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							reply(mess.wait)
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/sepie?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							reply(mess.wait)
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/sepie?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'invert':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/invert?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/invert?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/invert?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'greyscale':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/greyscale?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/greyscale?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/greyscale?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'lgbt':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/gay?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/gay?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/gay?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'blur':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/blur?apikey=${apikey}&level=5&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/blur?apikey=${apikey}&level=5&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/imgeffect/blur?apikey=${apikey}&level=5&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'trash':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/trash?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/trash?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/trash?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'thomas':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/thomas?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/thomas?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/thomas?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'tatto':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/tatto?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/tatto?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/tatto?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'stonks':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/stonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/stonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/stonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'spank':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/spank?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/spank?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/spank?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'rip':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/rip?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/rip?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/rip?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'notstonks':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/notstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/notstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/notstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'mms':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/mms?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/mms?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/mms?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'karaba':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/karaba?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/karaba?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/karaba?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'jail':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/jail?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/jail?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/jail?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'hitler':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/hitler?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/hitler?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/hitler?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'facepalm':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/facepalm?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/facepalm?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/facepalm?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'bluediscord':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/bluediscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/bluediscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/bluediscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'blackdiscord':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/blackdiscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/blackdiscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/blackdiscord?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'delete':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/delete?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/delete?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/delete?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'confusedstonks':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/confusedstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/confusedstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/confusedstonks?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'dobross':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/dobross?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/dobross?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/dobross?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'beatiful':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/beatiful?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/beatiful?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/beatiful?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'affect':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/affect?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/affect?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/affect?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'ad':
					try{
						if (isMedia && !mek.message.videoMessage || isQuotedImage) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.'+media.split('.')[1])
							const upload = await uploadimg(media, ran)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/ad?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(media)
						} else if(args[0] == 'me') {
							try {
								ppimg = await client.getProfilePicture(sender)
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/ad?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else if(mek.message.extendedTextMessage.contextInfo.mentionedJid) {
							mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
							try {
								ppimg = await client.getProfilePicture(mentioned[0])
							} catch {
								ppimg = 'https://i.imgur.com/hRDp5D2.png'
							}
							ran = getRandom('.jpg')
							rano = getRandom('.jpg')
							buff = await getBuffer(ppimg)
							fs.writeFileSync(ran, buff)
							const upload = await uploadimg(ran, rano)
							buff = await getBuffer(`http://brizas-api.herokuapp.com/montage/ad?apikey=${apikey}&img=${upload.resultado.link}`)
							client.sendMessage(from, buff, image, {quoted: mek})
							fs.unlinkSync(ran)
						} else return reply('*Apenas fotos*')
					} catch {
						reply('deu erro :/')
					}
				break
				case 'antifake':
					try {
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiFake) return reply('Ja esta ativo')
						antifake.push(from)
						fs.writeFileSync('./src/json/antifake.json', JSON.stringify(antifake))
						reply('Ativou com sucesso o recurso de antifake neste grupo✔️')
					} else if (Number(args[0]) === 0) {
						antifake.splice(from, 1)
						fs.writeFileSync('./src/json/antifake.json', JSON.stringify(antifake))
						reply('Desativou com sucesso o recurso de antifake neste grupo✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('ian')
					}
                break
				case 'menu':
					function sendmenu () {
						client.sendMessage(from, help(prefix, time, pushname, `Wa.me/${sender.split('@')[0]}`), text, {quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": cr, 'jpegThumbnail': fs.readFileSync('./img/logobot.png')}}}})
					}
					try{
						audiobuff = await getBuffer('https://b.top4top.io/m_19923zx481.mp3')
						try {
							ppimg = await client.getProfilePicture(sender)
						} catch {
							ppimg = 'https://i.imgur.com/hRDp5D2.png'
						}
						ti = 'BEM-VINDO'
						menuwel = 'Seja bem-vindo ao grupo'+groupName
						ppbuff = await getBuffer(ppimg)
						ran = getRandom('.jpg')
						await fs.writeFileSync(ran, ppbuff)
						var form = new FormData()
						await form.append('apikey', apikey)
						await form.append('image', fs.readFileSync(ran), ran)
						fetch('http://brizas-api.herokuapp.com/upload/image', {
							method: 'POST',
							body: form
						}).then(async res =>{
							var result = await res.json()
							buff = await getBuffer(`http://brizas-api.herokuapp.com/photomod/v1/menu?apikey=${apikey}&profileimg=${result.resultado.link}&background=https://i.imgur.com/tVKFNFk.png&description=${menuwel}&title=${ti}&username=${sender.split('@')[0]}`)
							await client.sendMessage(from, audiobuff, audio, {mimetype: Mimetype.mp4Audio, ptt: true})
							fs.writeFileSync('ian.jpg', buff)
							await client.sendMessage(from, buff, image, {quoted: mek, caption: help(prefix, time, pushname, 'wa.me/'+sender.split('@')[0]), quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg","caption": cr, 'jpegThumbnail': fs.readFileSync('./img/logobot.png')}}}})
							fs.unlinkSync(ran)
						})
					} catch (e) {
						console.log(e)
						sendmenu()
					}
				break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*The bot is active on* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'blocklist':
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja mas')
					}
					break
				case 'nstiker':
				case 'nsticker':
					if(args.length < 1) return reply('*Diga o nome do autor*')
					if(args.length < 2) return reply('*Diga o nome do pacote*')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage && args.length < 3)){
						try {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							npack = args[0]
							nauthor = args[1]
							ran = getRandom('.webp')
							exec(`ffmpeg -i ${media} -vf scale=512:512 ${ran}`, async function(err, result) {
								if(err) console.log(err)
								buff = await addMetadata(npack, nauthor)
								try{
									exec(`webpmux -set exif ${buff} ${ran} -o ${ran}`, async (error) => {							
										if (error) return reply(`*Houve uma falha, se tentar de novo pode funcionar :3*`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
										fs.unlinkSync(media)	
										fs.unlinkSync(ran)
										fs.unlinkSync(buff)
									})
								} catch {
									exec(`webpmux -set exif ${buff} ${ran} -o ${ran}`, async (error) => {							
										if (error) return reply(`*Houve uma falha, se tentar de novo pode funcionar :3*`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
										fs.unlinkSync(media)	
										fs.unlinkSync(ran)
										fs.unlinkSync(buff)										
									})
								}
							})
						}catch {
							reply(mess.error.stick)
						}
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length < 3) {
						try {
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.webp')
							exec(`ffmpeg -i ${media} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${ran}`, async function(err, res){
								if (err) return console.log(err)
								npack = args[0]
								nauthor = args[1]
								buff = addMetadata(npack, nauthor)
								try {
									exec(`webpmux -set exif ${buff} ${ran} -o ${ran}`, async (error) => {
										if(error) return reply(`*Houve uma falha, se tentar de novo pode funcionar :3*`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
										fs.unlinkSync(media)	
										fs.unlinkSync(ran)
										fs.unlinkSync(buff)
									})
								} catch {
									exec(`webpmux -set exif ${buff} ${ran} -o ${ran}`, async (error) => {
										if(error) return reply(`*Houve uma falha, se tentar de novo pode funcionar :3*`)
										await client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
										fs.unlinkSync(media)	
										fs.unlinkSync(ran)
										fs.unlinkSync(buff)
									})
								}
							})
						} catch {
							reply(mess.error.stick)
						}
					} else {
						return reply(`Marque a imagem com o comando ${prefix}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração, caso queira coloque apenas o numero de fps`)
					}
				break
				case 'stiker':
				case 'sticker':
					try{
						if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
							const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							ran = getRandom('.webp')
							exec(`ffmpeg -i ${media} -vf scale=512:512 ${ran}`, async function(err, result) {
								if(err) return reply(mess.error.stick)
								sti = fs.readFileSync(ran)
								await client.sendMessage(from, sti, sticker, {quoted: mek})
								await fs.unlinkSync(media)
								await fs.unlinkSync(ran)
							})
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
							const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
							const media = await client.downloadAndSaveMediaMessage(encmedia)
							if(args.length < 1) framerate = 12
							else framerate = args[0]
							ran = getRandom('.webp')
							reply(mess.wait)
							exec(`ffmpeg -i ${media} -y -vcodec libwebp -fs 0.99M -filter_complex "[0:v] scale=512:512,fps=${framerate},pad=512:512:-1:-1:color=white@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse" -f webp ${ran}`, async function(err, res){
								if(err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								reply('*Se estiver cortado ou parado, digite o n° de fps apos escrever o comando*')
								fs.unlinkSync(media)	
								fs.unlinkSync(ran)
							})
						} else return reply(`Marque a imagem com o comando ${prefix}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração, caso queira coloque apenas o numero de fps`)
					} catch (e) {
						console.log(e)
						reply(mess.error.stick)
					}
				break
				case 'gtts':
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break
				case 'meme':
					meme = await fetchJson('https://kagchi-api.glitch.me/meme/memes', { method: 'get' })
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'loli':
					loli.getSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Citai Lolimu'})
					})
					break
				case 'nsfwloli':
					if (isNsfw) {
						loli.getNSFWLoli(async (err, res) => {
							if (err) return reply('❌ *ERROR* ❌')
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Lolicon safrado'})
						})
					} else if (!isGroup) {
						loli.getNSFWLoli(async (err, res) => {
							if (err) return reply('❌ *ERROR* ❌')
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Punheteiro da porra'})
						})
					} else return reply('❌ *Somente com nsfw ativado no grupo* ❌')
					break
			
				case 'tagall':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
				break
            	case 'tagall2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
				break
                case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
				break
				case 'clearall':
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Sukses delete all chat :)')
					break
				case 'bc':
					if (!isOwner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
                case 'promote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Promote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Promote @${mentioned[0].split('@')[0]} Sebagai Admin Group!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Demote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Demote @${mentioned[0].split('@')[0]} Menjadi Member Group!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
				case 'kick':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Banindo : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmins':
					if (!isGroup) return reply(mess.only.group)
					teks = `Ademiros do grupo *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                case 'linkgroup':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/'+linkgc)
                    break
                case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                    	client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break
				case 'toimg':
					if (!isQuotedSticker) return reply('❌ Responda a imagem ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter em imagem ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
				case 'simi':
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks)
					reply(anu)
					break
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Ativado modo simsimi com sucesso ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Desativado modo simsimi com sucesso ✔️')
					} else {
						reply('1 para ativar 0 para desativar')
					}
					break
				case 'welcome':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Udah aktif um')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Ativado modo boas vindas com sucesso ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desativado modo boas vindas com sucesso ✔️')
					} else {
						reply('1 para ativar 0 para desativar')
					}
                break
				case 'clone':
					if (!isOwner) return reply(mess.only.ownerB)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Perfil clonado de @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Deu erro :/')
					}
					break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Responda a foto')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						return console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()

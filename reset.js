const {WAConnection} = require('@adiwajshing/baileys')
const fs = require('fs')
const readline = require('readline')

var leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
async function ResetAuth() {
    leitor.question('\x1b[1;33mVoce tem certeza que deseja excluir o seu usuário atual? S/N \n\n\x1b[1;37m> \x1b[1;32m', async (res) => {
        if(res.toLowerCase() == 's') {
            if(!fs.existsSync('./BrizasBot.json')) {
                console.log('\x1b[1;31mVocê nem sequer logou ainda, escreva node index.js para logar\x1b[0;37m')
                leitor.close()
                return
            }
            const client = new WAConnection()
            client.clearAuthInfo()
            fs.unlinkSync('./BrizasBot.json')
            console.log('\x1b[1;32mUsuário do whatsapp web resetado, uescreva node index.js para registrar um novo usuário\x1b[0;37m')
        } else if (res.toLowerCase() == 'n') console.log('\x1b[1;31mFormatação de usuário cancelada\x1b[0;37m')
        else console.log('\x1b[1;31mEscreva S para sim e N para não\x1b[0;37m')
        leitor.close()
    })
}

ResetAuth()


